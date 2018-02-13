import { rotate } from './tetromino-helpers';

describe('TetrominoHelper', () => {

  const initial = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ];
  const rotated = [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
  ];
  const rotatedTwice = [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ];

  it('should rotate correctly', () => {
    expect(rotate(initial)).toEqual(rotated);
  });

  it('should rotate correctly with parameter', () => {
    expect(rotate(initial, 1)).toEqual(rotated);
    expect(rotate(initial, 2)).toEqual(rotatedTwice);
  });

});
