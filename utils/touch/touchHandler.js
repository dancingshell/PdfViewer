import { distanceBetweenPoints, slope, identityMatrix, pointOnLine } from "../vectorMath/geometry";

export default class TouchHandler {
  constructor (initialTouch) {
    this.initialValues = [...initialTouch.nativeEvent.touches];
    this.endValues = [];
  }

  move(touchEvent) {
    this.endValues = [...touchEvent.nativeEvent.touches];
  }

  distance() {
    return this.endValues.map((event, idx) => {
      if (!this.initialValues[idx]) {
        return {
          x: 0,
          y: 0,
        };
      }
      const { pageX: xInit, pageY: yInit } = event;
      const { pageX: xEnd, pageY: yEnd } = this.initialValues[idx]
      return {
        x: xEnd - xInit, y: yEnd - yInit
      };
    })
  }

  isPinch() {
    return this.initialValues.length === 2 &&
    this.endValues.length === 2;
  }

  pinchMatrix() {
    if (!this.isPinch()) return {
      a:1, b: 0, c: 0, d: 1, x: 0, y: 0
    };
    const initDist = distanceBetweenPoints(
      [this.initialValues[0].pageX, this.initialValues[0].pageY],
      [this.initialValues[1].pageX, this.initialValues[1].pageY],
    );
    const endDist = distanceBetweenPoints(
      [this.endValues[0].pageX, this.endValues[0].pageY],
      [this.endValues[1].pageX, this.endValues[1].pageY],
    )
    // TODO:
    //   Calc midpoint between points
    //   Get xDiff and yDiff between init midpoints and end midpoints
    //   Return xDiff as translateX and yDiff as translateY
    // const initSlope = slope(
    //   [this.initialValues[0].pageX, this.initialValues[0].pageY],
    //   [this.initialValues[1].pageX, this.initialValues[1].pageY],
    // );
    // const endSlope = slope(
    //   [this.endValues[0].pageX, this.endValues[0].pageY],
    //   [this.endValues[1].pageX, this.endValues[1].pageY],
    // );
    // const initMidPoint = pointOnLine(initDist / 2, initSlope, [this.initialValues[0].pageX, this.initialValues[0].pageY]);
    // const endMidPoint = pointOnLine(endDist / 2, endSlope, [this.endValues[0].pageX, this.endValues[0].pageY]);
    // const translateX = endMidPoint[0] - initMidPoint[0];
    // const translateY = endMidPoint[1] - initMidPoint[1];
    // console.log({
    //   initMidPoint,
    //   initSlope
    // });
    
    const scale = endDist / initDist;
    return {
      ...identityMatrix,
      // x: translateX,
      // y: translateY,
      a: scale,
      b: scale,
      scale,
    };
    
  }
}
