/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Time from 'Time';
import {createGlobalDatabase} from '../src/global_yjs_database.js';

afterEach(async () => {
  Time.mockReset();
});

test('When first time called, database should contain 6 basic functions', async () => {
  const db = await createGlobalDatabase('db');
  expect(db).toBeDefined();
  expect(db).toHaveProperty('get');
  expect(db).toHaveProperty('set');
  expect(db).toHaveProperty('keys');
  expect(db).toHaveProperty('getJSON');
  expect(db).toHaveProperty('transact');
  expect(db).toHaveProperty('subscribe');
});

test('Set different paths', async () => {
  const db = await createGlobalDatabase('db');

  db.set('a/b/c/d/e/f', 1);
  expect(db.get('a/b/c/d/e/f')).toBe(1);

  expect(() => {
    db.set('a/b/c/d/e/g', []);
  }).toThrow('`value` should be a number, string, or a vanilla object.');

  expect(db.get('a/b/c')).toStrictEqual({d: {e: {f: 1}}});
  db.set('a/b/c', 2);
  expect(db.get('a/b/c')).toBe(2);

  db.set('b', 'a');
  expect(db.get('b')).toBe('a');
  expect(db.getJSON()).toStrictEqual({
    a: {
      b: {
        c: 2,
      },
    },
    b: 'a',
  });

  db.set(123, 'c');
  expect(db.get(123)).toBe('c');
  expect(db.keys()).toStrictEqual(['a', 'b', '123']);

  const obj = {a: 1, b: 2, f: 3};
  db.set('a/b/c/d', obj);
  expect(db.get('a/b/c/d')).toStrictEqual({
    a: 1,
    b: 2,
    f: 3,
  });
  db.set('a/b/c', {});
  expect(db.get('a/b/c')).toStrictEqual({});
  db.set('a/b/c/d', 1);
  expect(db.get('a/b/c')).toStrictEqual({d: 1});
});

test('Callback with all possible parameters', async () => {
  const db = await createGlobalDatabase('db');
  const callback = jest.fn();
  const callback2 = jest.fn();

  db.set('a', 1);
  expect(() => {
    db.subscribe(callback, 'a', true);
  }).toThrow('The path is wrong. Path should point to Map!');

  db.subscribe(callback, null, true);
  expect(callback).toHaveBeenCalledWith({
    newValue: {a: 1},
  });

  db.set('a', 2);
  expect(callback).toHaveBeenCalledWith({
    newValue: {a: 2},
    oldValue: {a: 1},
  });

  db.set('a/b/c/d', 1);
  db.subscribe(callback2, 'a/b', true);
  expect(callback2).toHaveBeenCalledWith({
    newValue: {
      c: {
        d: 1,
      },
    },
  });
  expect(callback).toHaveBeenCalledWith({
    oldValue: {
      a: 2,
    },
    newValue: {
      a: {
        b: {
          c: {
            d: 1,
          },
        },
      },
    },
  });
  db.set('a/b/c/d', 2);
  expect(callback2).toHaveBeenCalledWith({
    oldValue: {
      c: {
        d: 1,
      },
    },
    newValue: {
      c: {
        d: 2,
      },
    },
  });
});

test('Transact', async () => {
  const db = await createGlobalDatabase('db');
  const callback = jest.fn();

  db.set('companyA/personA', 100);
  db.set('companyB/personB', 0);

  db.subscribe(callback);
  db.transact(() => {
    db.set('companyA/personA', 50);
    db.set('companyB/personB', 50);
  });
  expect(db.getJSON()).toStrictEqual({
    companyA: {
      personA: 50,
    },
    companyB: {
      personB: 50,
    },
  });
  expect(callback).toHaveBeenCalledWith({
    oldValue: {
      companyA: {
        personA: 100,
      },
    },
    newValue: {
      companyA: {
        personA: 50,
      },
    },
  });
  expect(callback).toHaveBeenCalledWith({
    oldValue: {
      companyB: {
        personB: 0,
      },
    },
    newValue: {
      companyB: {
        personB: 50,
      },
    },
  });
});

test('Subscribed to the child and change is made directly there', async () => {
  const db = await createGlobalDatabase('score');
  const teamA = {John: 2, Josh: 5, David: 3, Michael: 8};
  const teamB = {Jake: 1, Trevor: 7, Ben: 4};

  db.set('teamA', teamA);
  db.set('teamB', teamB);

  const callback = jest.fn();
  db.subscribe(callback, 'teamA');
  db.set('teamA/David', 4);
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith({
    newValue: {
      David: 4,
    },
    oldValue: {
      David: 3,
    },
  });
  db.set('teamC', {Calob: 1});
  expect(callback).toHaveBeenCalledTimes(1);
});
