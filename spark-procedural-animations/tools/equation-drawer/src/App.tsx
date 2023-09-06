/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState} from 'react';
import EquationInput from './EquationInput';
import CanvasComponent from './CanvasComponent';
import {DEFAULT_EQUATION} from './constants';
import 'bootstrap/dist/css/bootstrap.css';

const App: React.FC = () => {
  const [equation, setEquation] = useState<string>(DEFAULT_EQUATION);

  const handleEquationSubmit = (newEquation: string) => {
    setEquation(newEquation);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px'}}>
      <div style={{textAlign: 'center'}}>
        <h5>Spark Procedural Animations</h5>
        <EquationInput onSubmit={handleEquationSubmit} />
        <CanvasComponent equation={equation} />
      </div>
    </div>
  );
};

export default App;
