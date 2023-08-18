/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState} from 'react';
import {DEFAULT_EQUATION} from './constants';
import './style.css';

interface EquationInputProps {
  onSubmit: (equation: string) => void;
}

const EquationInput: React.FC<EquationInputProps> = ({onSubmit}) => {
  const [equation, setEquation] = useState<string>(DEFAULT_EQUATION);

  const handleRunClick = () => {
    onSubmit(equation);
  };

  return (
    <div className="input-group mb-3">
      <span className="input-group-text monospace-font" id="basic-addon1">
        f(x)=
      </span>
      <input
        type="text"
        className="form-control monospace-font"
        value={equation}
        onChange={e => {
          setEquation(e.target.value);
          onSubmit(e.target.value);
        }}
      />
      <button className="btn btn-primary btn-sm" onClick={handleRunClick}>
        Run
      </button>
    </div>
  );
};

export default EquationInput;
