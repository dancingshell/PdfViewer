/**
 * @typedef Matrix
 * @type {object}
 * @property {number} a
 * @property {number} b
 * @property {number} c
 * @property {number} d
 * @property {number} tx
 * @property {number} ty
 */

/**
 * Calculate the slope between two points
 * @param {Array.<number>} point1 - [x, y]
 * @param {Array.<number>} point2 - [x, y]
 * @returns {number} Slope as float
 */
export const slope = ([x1, y1], [x2, y2]) => {
  const yDiff = (y2 - y1);
  const xDiff = (x2 - x1);
  if (xDiff === 0) return Infinity * yDiff;
  return yDiff / xDiff;
};

/**
 * Creates a vector representation from two points
 * @param {Array.<number>} point1 - [x, y]
 * @param {Array.<number>} point2 - [x, y]
 * @returns {Array.<number>} Vector => [x, y]
 */
export const vector = ([x1, y1], [x2, y2]) => [x2 - x1, y2 - y1];

/**
 * Calculates dot-product between two vectors
 * @param {Array.<number>} vector1 - [x, y]
 * @param {Array.<number>} vector2 - [x, y]
 * @returns {number} dot-product
 */
export const dotProduct = ([x1, y1], [x2, y2]) => x1 * x2 + y1 * y2;

/**
 * Calculates cross-product between two vectors
 * @param {Array.<number>} vector1 - [x, y]
 * @param {Array.<number>} vector2 - [x, y]
 * @returns {number} cross-product
 */
export const crossProduct = ([x1, y1], [x2, y2]) => x1 * y2 - y1 * x2;

/**
 * Calculates the angle (radians and degrees) from three points
 * @param {Array.<number>} point1 - [x, y]
 * @param {Array.<number>} point2 - [x, y]
 * @param {Array.<number>} point3 - [x, y]
 * @returns {{rad: number, deg: number}}
 */
export const angle = ([x1, y1], [x2, y2], [x3, y3]) => {
  const vectorAB = vector([x1, y1], [x2, y2]);
  const vectorCB = vector([x3, y3], [x2, y2]);
  const dot = dotProduct(vectorAB, vectorCB);
  const cross = crossProduct(vectorAB, vectorCB);
  const angleRad = Math.atan2(cross, dot);
  const angleDeg = (angleRad * 180) / Math.PI;
  return { rad: angleRad, deg: angleDeg };
};

/**
 * Calculates the angle (radians) from a slope
 * @param {number} m slope
 * @returns {number} Angle (radians)
 */
export const angleFromSlope = m => -Math.atan(m);

/**
 * Calculates the distance between two points
 * @param {Array.<number>} point1 - [x, y]
 * @param {Array.<number>} point2 - [x, y]
 * @returns {number} distance
 */
export const distanceBetweenPoints = ([x1, y1], [x2, y2]) => Math.sqrt(
  ((x2 - x1) ** 2) + ((y2 - y1) ** 2)
);

/**
 * Calculates the coordinates of a point on a line at the
 * specified distance from the the startPoint
 * @param {number} distanceToPoint Distance from startPoint
 * @param {number} m slope
 * @param {Array.<number>} startPoint [x, y]
 */
export const pointOnLine = (distanceToPoint, m, [x1, y1]) => {
  const d = distanceToPoint;
  if (m === Infinity) return [x1, y1 + d];
  if (m === -Infinity) return [x1, y1 - d];
  const x = d * Math.sqrt(1 / (1 + (m ** 2)));
  const y = m * d * Math.sqrt(1 / (1 + (m ** 2)));
  return [x + x1, y + y1];
};

/**
 * Calclulates the point at which two lines intersect, given
 * the slope and one point for each line
 * @param {number} m1 Slope of the first line
 * @param {Array.<number>} point1 A point on the first line [x, y]
 * @param {number} m2 Slope of the second line
 * @param {Array.<number>} point2 A point on the second line [x, y]
 * @returns {Array.<number>} Intersecting point [x, y]
 */
export const intersection = (m1, point1, m2, point2) => {
  const [x1, y1] = point1;
  const [x2, y2] = point2;
  if (m1 === Infinity && m2 === 0) {
    return [x1, y2];
  }
  if (m1 === -Infinity && m2 === 0) {
    return [x1, y2];
  }
  const x = ((m1 * x1) - (m2 * x2) + y2 - y1) / (m1 - m2) || x2;
  let y = m1 * (x - x1) + y1;
  if (y === Infinity) y = y1;
  return [x, y];
};

/**
 * Applys a transformation matrix to a point
 * @param {Array.<number>} point [x, y]
 * @param {Matrix} mtx The matrix to apply to the point
 * @returns {Array.<number>} Transformed point [x, y]
 */
export const transform = ([x, y, z = 1], {
  a, b, c, d, tx, ty
}) => {
  const transformedX = x * a + y * c + z * tx;
  const transformedY = x * b + y * d + z * ty;
  return [transformedX, transformedY];
};

export const identityMatrix = {
  a: 1,
  b: 0,
  c: 0,
  d: 1,
  tx: 0,
  ty: 0,
};

/**
 * Creates a rotation matrix from a base matrix and a given angle
 * @param {Matrix} mtx The base matrix to which the rotation
 * will be applied
 * @param {number} r Angle (radians)
 * @param {number} cx X value to rotate around
 * @param {number} cy Y value to rotate around
 * @returns {Matrix} rotated matrix
 */
export const rotate = (mtx, r, cx = 0, cy = 0) => {
  const cos = Math.cos(r);
  const sin = Math.sin(r);

  const {
    a, b, c, d, tx, ty
  } = mtx;

  const nextMtx = {};

  nextMtx.a = a * cos - b * sin;
  nextMtx.b = b * cos + a * sin;
  nextMtx.c = c * cos - d * sin;
  nextMtx.d = d * cos + c * sin;
  nextMtx.tx = tx * cos - ty * sin + cy * sin - cx * cos + cx;
  nextMtx.ty = ty * cos + tx * sin - cx * sin - cy * cos + cy;

  return nextMtx;
};
