/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useRef, useEffect, useState} from 'react';
import {evaluateFunction} from './FunctionLibrary';

interface CanvasComponentProps {
  equation: string;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({equation}) => {
  const minZoom = 0.5;
  const maxZoom = 2;
  const zoomStep = 0.1;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentZoom, setCurrentZoom] = useState(1);

  const zoomIn = () => {
    const newZoom = Math.min(currentZoom + zoomStep, maxZoom);
    setCurrentZoom(newZoom);
  };

  const zoomOut = () => {
    const newZoom = Math.max(currentZoom - zoomStep, minZoom);
    setCurrentZoom(newZoom);
  };

  // axis ranges
  const xRange = 8; // [-4, 4]
  const yRange = 4; // [-2, 2]

  const canvasWidth = 1280;
  const canvasHeight = (canvasWidth * yRange) / xRange;
  const xAxisLabelOffset = 14;
  const yAxisLabelOffset = 8;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // draw axes
    const xAxisStart = {x: 0, y: canvasHeight / 2};
    const xAxisEnd = {x: canvasWidth, y: canvasHeight / 2};
    const yAxisStart = {x: canvasWidth / 2, y: 0};
    const yAxisEnd = {x: canvasWidth / 2, y: canvasHeight};
    drawLine(ctx, xAxisStart, xAxisEnd, '#444'); // X-axis
    drawLine(ctx, yAxisStart, yAxisEnd, '#444'); // Y-axis

    // draw equation
    const scale = (canvasWidth / xRange) * currentZoom;
    const stepSize = canvasWidth / xRange;

    // X-axis scale and labels
    for (let x = 0; x <= canvasWidth / 2; x += stepSize) {
      if (Math.abs(x) < 0.0001) continue;
      drawLine(
        ctx,
        {x: x + canvasWidth / 2, y: 0},
        {x: x + canvasWidth / 2, y: canvasWidth},
        'rgba(50, 50, 50, 0.5)',
        1,
      );
      ctx.font = '14px Consolas';
      ctx.fillStyle = '#777';
      ctx.textAlign = 'center';
      ctx.fillText(
        (x / scale).toFixed(1),
        x + canvasWidth / 2 - xAxisLabelOffset,
        canvasHeight / 2 + xAxisLabelOffset,
      );
    }

    for (let x = 0; x >= -canvasWidth / 2; x -= stepSize) {
      if (Math.abs(x) < 0.0001) continue;
      drawLine(
        ctx,
        {x: x + canvasWidth / 2, y: 0},
        {x: x + canvasWidth / 2, y: canvasWidth},
        'rgba(50, 50, 50, 0.5)',
        1,
      );
      ctx.font = '14px Consolas';
      ctx.fillStyle = '#777';
      ctx.textAlign = 'center';
      ctx.fillText(
        (x / scale).toFixed(1),
        x + canvasWidth / 2 - xAxisLabelOffset,
        canvasHeight / 2 + xAxisLabelOffset,
      );
    }

    // Y-axis scale and labels
    for (let y = 0; y <= canvasHeight / 2; y += stepSize) {
      drawLine(
        ctx,
        {x: 0, y: y + canvasHeight / 2},
        {x: canvasWidth, y: y + canvasHeight / 2},
        'rgba(50, 50, 50, 0.5)',
        1,
      );
      ctx.font = '14px Consolas';
      ctx.fillStyle = '#777';
      ctx.textAlign = 'right';
      ctx.fillText(
        (-y / scale).toFixed(1),
        canvasWidth / 2 - yAxisLabelOffset,
        y + canvasHeight / 2 + yAxisLabelOffset * 2,
      );
    }

    for (let y = 0; y >= -canvasHeight / 2; y -= stepSize) {
      drawLine(
        ctx,
        {x: 0, y: y + canvasHeight / 2},
        {x: canvasWidth, y: y + canvasHeight / 2},
        'rgba(50, 50, 50, 0.5)',
        1,
      );
      ctx.font = '14px Consolas';
      ctx.fillStyle = '#777';
      ctx.textAlign = 'right';
      ctx.fillText(
        (-y / scale).toFixed(1),
        canvasWidth / 2 - yAxisLabelOffset,
        y + canvasHeight / 2 + yAxisLabelOffset * 2,
      );
    }

    try {
      setError(null); // reset the error state

      tryDrawBezier(ctx, equation, canvasWidth, canvasHeight, scale);

      ctx.beginPath();
      for (let x = -canvasWidth / 2; x <= canvasWidth / 2; x++) {
        const y = -evaluateFunction(equation, x / scale) * scale;
        ctx.lineTo(x + canvasWidth / 2, y + canvasHeight / 2);
      }
      ctx.strokeStyle = '#f00';
      ctx.lineWidth = 2;
      ctx.stroke();
    } catch (error: any) {
      setError(error.message.toString());
      console.error(`Invalid equation: "${equation}" `, error);
    }
  }, [equation, currentZoom]);

  // draw a line between two points
  const drawLine = (
    ctx: CanvasRenderingContext2D,
    start: {x: number; y: number},
    end: {x: number; y: number},
    color: string,
    width: number = 2,
  ) => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  };

  const drawCircle = (
    ctx: CanvasRenderingContext2D,
    center: {x: number; y: number},
    color: string,
    radius: number = 2,
  ) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.fill();
  };

  const tryDrawBezier = (
    ctx: CanvasRenderingContext2D,
    equation: string,
    canvasWidth: number,
    canvasHeight: number,
    scale: number,
  ): void => {
    equation = equation.replaceAll(/\s/g, '');
    const isBezier01 = equation.startsWith('bezier01(');
    const isBezier2Parts = equation.startsWith('bezier2parts(');
    const isBezier = equation.startsWith('bezier(');
    if (!isBezier01 && !isBezier2Parts && !isBezier) return;
    if (isBezier01) equation = equation.split('bezier01(').join('');
    else if (isBezier2Parts) equation = equation.split('bezier2parts(').join('');
    else if (isBezier) equation = equation.split('bezier(').join('');
    equation = equation.split('x,').join('');
    const parts = equation.split(')');
    if (parts.length >= 2 && parts[1] !== '') return;
    const arr = parts[0].split(',').map(parseFloat);

    let ax1 = NaN;
    let ay1 = NaN;
    let bx1 = NaN;
    let by1 = NaN;
    let cx1 = NaN;
    let cy1 = NaN;
    let ax2 = NaN;
    let ay2 = NaN;
    let bx2 = NaN;
    let by2 = NaN;
    let cx2 = NaN;
    let cy2 = NaN;
    let dx2 = NaN;
    let dy2 = NaN;

    const getX = (n: number): number => n * scale + canvasWidth / 2;
    const getY = (n: number): number => -n * scale + canvasHeight / 2;

    if (isBezier01 && arr.length === 4) {
      ax1 = getX(0);
      ay1 = getY(0);
      bx1 = getX(arr[0]);
      by1 = getY(arr[1]);
      cx1 = getX(arr[2]);
      cy1 = getY(arr[3]);
      ax2 = getX(1);
      ay2 = getY(1);
    } else if ((isBezier || isBezier2Parts) && (arr.length === 8 || arr.length === 14)) {
      ax1 = getX(arr[0]);
      ay1 = getY(arr[1]);
      bx1 = getX(arr[2]);
      by1 = getY(arr[3]);
      cx1 = getX(arr[4]);
      cy1 = getY(arr[5]);
      ax2 = getX(arr[6]);
      ay2 = getY(arr[7]);
      if (isBezier2Parts && arr.length === 14) {
        bx2 = getX(arr[8]);
        by2 = getY(arr[9]);
        cx2 = getX(arr[10]);
        cy2 = getY(arr[11]);
        dx2 = getX(arr[12]);
        dy2 = getY(arr[13]);
      }
    }

    if (!isNaN(ax1)) {
      drawLine(ctx, {x: ax1, y: ay1}, {x: bx1, y: by1}, '#a98', 2);
      drawCircle(ctx, {x: bx1, y: by1}, '#a98', 4);
      drawLine(ctx, {x: cx1, y: cy1}, {x: ax2, y: ay2}, '#a98', 2);
      drawCircle(ctx, {x: cx1, y: cy1}, '#a98', 4);
    }
    if (!isNaN(dy2)) {
      drawLine(ctx, {x: ax2, y: ay2}, {x: bx2, y: by2}, '#89a', 2);
      drawCircle(ctx, {x: bx2, y: by2}, '#89a', 4);
      drawLine(ctx, {x: cx2, y: cy2}, {x: dx2, y: dy2}, '#89a', 2);
      drawCircle(ctx, {x: cx2, y: cy2}, '#89a', 4);
    }
  };

  return (
    <div
      className="d-flex justify-content-end align-items-start flex-column"
      style={{position: 'relative'}}
    >
      <div
        className="btn-group position-absolute top-0 end-0"
        role="group"
        aria-label="Basic outlined example"
      >
        <button type="button" className="btn btn-outline-secondary" onClick={zoomIn}>
          +
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={zoomOut}>
          -
        </button>
      </div>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      {error && (
        <div className="alert alert-warning" role="alert">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default CanvasComponent;
