import React, { Component } from 'react';
import { View, StyleSheet, Animated, Image, Text } from 'react-native';
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';
import { Svg } from 'expo';

const {Path} = Svg;
// import EventBase from '../../utils/events';
export default class MarkupViewer extends Component {
  panRef = React.createRef();
  rotationRef = React.createRef();
  pinchRef = React.createRef();
  constructor(props) {
    super(props);
    // this.eventBase = new EventBase();
    this.state = {
      drawing: true,
      freehands: [[]],
    };

    /* Pinching */
    this._baseScale = new Animated.Value(1);
    this._pinchScale = new Animated.Value(1);
    this._scale = Animated.multiply(this._baseScale, this._pinchScale);
    this._fooscale = 1;
    this._lastScale = 1;
    this._onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: this._pinchScale } }],
      { useNativeDriver: true }
    );

    /* Rotation */
    this._rotate = new Animated.Value(0);
    this._rotateStr = this._rotate.interpolate({
      inputRange: [-100, 100],
      outputRange: ['-100rad', '100rad'],
    });

    /* TranslateY */
    this._translateY = new Animated.Value(0);
    this._translateYStr = this._translateY;
    this._ty = 0;
    this._lastTranslateY = 0;
    /* TranslateX */
    this._translateX = new Animated.Value(0);
    this._translateXStr = this._translateX;
    this._tx = 0;
    this._lastTranslateX = 0;

    // Drawing
    this.drawingCoordinates = [];

    /* DrawingX */
    this._drawingX = new Animated.Value(0);
    this._drawingXStr = this._drawingX;
    this._lastDrawingX = 0;

    /* DrawingY */
    this._drawingY = new Animated.Value(0);
    this._drawingYStr = this._drawingY;
    this._lastDrawingY = 0;


    this._onTranslateGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: this.state.drawing ? () => {} : this._translateY, translationX: this.state.drawing ? () => {} : this._translateX } }],
      { useNativeDriver: true }
    );
  }

  _onDrawingGestureStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastDrawingY += event.nativeEvent.translationY;
      this._drawingY.setOffset(this._lastDrawingY);
      this._drawingY.setValue(0);
      this._lastDrawingX += event.nativeEvent.translationX;
      this._drawingX.setOffset(this._lastDrawingX);
      this._drawingX.setValue(0);
      this.drawingCoordinates = ([...this.drawingCoordinates, [this._lastDrawingX, this._lastDrawingY]]);
    }
  };

  _getDrawingCoordinates = () => this.drawingCoordinates;

  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale;
      this._baseScale.setValue(this._lastScale);
      this._fooscale *= event.nativeEvent.scale;
      this._pinchScale.setValue(1);
    }
  };

  _onTranslateGestureStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastTranslateY += event.nativeEvent.translationY;
      this._translateY.setOffset(this._lastTranslateY);
      this._translateY.setValue(0);
      this._lastTranslateX += event.nativeEvent.translationX;
      this._translateX.setOffset(this._lastTranslateX);
      this._translateX.setValue(0);
    }
  };

  _onTouchStart = event => {
    if(event.nativeEvent.touches.length > 1) return;
    this.setState({ freehands: [...this.state.freehands, []] });
  };

  _onTouchMove = event => {
    if(event.nativeEvent.touches.length > 1) return;
    const currentFreehand = this.state.freehands[this.state.freehands.length - 1];
    const updatedCurrentFreehand = [...currentFreehand, [event.nativeEvent.pageX, event.nativeEvent.pageY]];
    this.setState({ freehands: [...this.state.freehands.slice(0, -1), updatedCurrentFreehand] });
  };

  _onTouchEnd = event => {

  };

  getFreehands = () => {
    return this.state.freehands.map((coordinateArray, idx) => {
      return(
        <Path
          key={idx}
          d={this.getCoordinateString(coordinateArray)}
          stroke="red"
          fill="none"
        >
        </Path>
      );
    });
  }

  getCoordinateString = (coordinateArray) => {
    const string = "M " + coordinateArray.map((tuple) => tuple.join(" ")).join(", ");
    return(string);
  }

  render() {
    return (
      <PanGestureHandler
        ref={this.panRef}
        onGestureEvent={this._onTranslateGestureEvent}
        onHandlerStateChange={this.state.drawing ? this._onDrawingGestureStateChange : this._onTranslateGestureStateChange}
        minDist={10}
        minPointers={2}
        maxPointers={2}
        avgTouches>
        <Animated.View style={styles.wrapper}>
              <PinchGestureHandler
                ref={this.pinchRef}
                simultaneousHandlers={this.rotationRef}
                onGestureEvent={this._onPinchGestureEvent}
                onHandlerStateChange={this._onPinchHandlerStateChange}>
                <Animated.View
                    style={[styles.container, {
                        transform: [
                          { perspective: 200 },
                          { scale: this._scale },
                          { translateY: this._translateYStr },
                          { translateX: this._translateXStr },
                        ],
                      }]} collapsable={false}>
                  <Animated.Image
                    style={styles.pinchableImage}
                    source={require('../../assets/images/kiwis_lizard_sanctuary.png')}
                    x="0"
                    y="0"
                  />
                  <Svg
                    onTouchStart={this._onTouchStart}
                    onTouchMove={this._onTouchMove}
                    onTouchEnd={this._onTouchEnd}
                    x="0"
                    y="0"
                    height="100%"
                    width="100%"
                    viewbox="0 0 100 100"
                    style={
                      [
                        styles.path,
                        {
                          transform: [
                            { perspective: 200 },
                            { translateY: this._ty },
                            { translateX: this._tx },
                          ]
                        }
                      ]
                    }
                  >
                    {this.getFreehands()}
                  </Svg>
                </Animated.View>
              </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    );
  }

  // render() {
  //   return (
  //     <View
  //       onTouchStart={(e) => {
  //         this.currentTouch = new TouchHandler(e);
  //       }}
  //       onTouchMove={(e) => {
  //         if (!this.currentTouch) this.currentTouch = new TouchHandler(e);
  //         this.currentTouch.move(e);
  //       }}
  //       onTouchEnd={(e) => {
  //         this.setState({ touching: 'end' });
  //         this.currentTouch = null;
  //       }}
  //     >
  //       {/* <Page></Page> */}
  //       {/* <RenderLayer pageWidth="500" pageHeight="800" eventBase={this.eventBase}></RenderLayer> */}
  //       {this.render.props.children}
  //     </View>
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    translateX: 0,
    translateY: 0,
  },
  pinchableImage: {
    width: 1275,
    height: 1650,
    left: 0,
    top: 0,
  },
  path: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  wrapper: {
    flex: 1,
  },
});
