/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import S from 'Scene';
import R from 'Reactive';
import {loadObjWraps, playFor, apply, halfCircle01} from 'spark-procedural-animations';

(async function () {
  const [cube] = await loadObjWraps('cube');

  cube.actuator.move.to(v => v.obj.iniPos.addRt(0.1));

  playFor(1, x => apply(x, cube))
    .thenInitAndPlayFor(
      1,
      () => cube.a.move.to(v => v.obj.iniPos.addLt(0.1)).relCurveControl1(v => v.up.by(0.1)),
      x => apply(x, cube),
    )
    .thenInitAndPlayFor(
      1,
      () => cube.a.move.toIni().rotate.to(v => v.lookAt(v.up, v.bk)),
      x => apply(x, cube),
    )
    .thenInitAndCycles(
      1,
      () => cube.a.move.to(v => v.o.iniPos.addUp(0.1)).noRotation,
      x => apply(halfCircle01(x), cube),
    );
})();
