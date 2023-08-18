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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  // axis ranges
  const xRange = 16; // [-8, 8]
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
    const scale = canvasWidth / xRange;
    const stepSize = canvasWidth / xRange;

    // X-axis scale and labels
    for (let x = -canvasWidth / 2; x <= canvasWidth / 2; x += stepSize) {
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
        (x / scale).toString(),
        x + canvasWidth / 2 - xAxisLabelOffset,
        canvasHeight / 2 + xAxisLabelOffset,
      );
    }

    // Y-axis scale and labels
    for (let y = -canvasHeight / 2; y <= canvasHeight / 2; y += stepSize) {
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
        (-y / scale).toString(),
        canvasWidth / 2 - yAxisLabelOffset,
        y + canvasHeight / 2 + yAxisLabelOffset * 2,
      );
    }

    try {
      setError(null); // reset the error state

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
      console.error('Invalid equation:', error);
    }
  }, [equation]);

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

  return (
    <div>
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
