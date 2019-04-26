import React, { Component } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';
// import EventBase from '../../utils/events';
export default class MarkupViewer extends Component {
  panRef = React.createRef();
  rotationRef = React.createRef();
  pinchRef = React.createRef();
  constructor(props) {
    super(props);
    // this.eventBase = new EventBase();

    /* Pinching */
    this._baseScale = new Animated.Value(1);
    this._pinchScale = new Animated.Value(1);
    this._scale = Animated.multiply(this._baseScale, this._pinchScale);
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
    this._lastRotate = 0;
    this._onRotateGestureEvent = Animated.event(
      [{ nativeEvent: { rotation: this._rotate } }],
      { useNativeDriver: true }
    );

    /* TranslateY */
    this._translateY = new Animated.Value(0);
    this._translateYStr = this._translateY;
    this._lastTranslateY = 0;
    /* TranslateX */
    this._translateX = new Animated.Value(0);
    this._translateXStr = this._translateX;
    this._lastTranslateX = 0;

    this._onTranslateGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: this._translateY, translationX: this._translateX } }],
      { useNativeDriver: true }
    );
  }

  _onRotateHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastRotate += event.nativeEvent.rotation;
      this._rotate.setOffset(this._lastRotate);
      this._rotate.setValue(0);
    }
  };
  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale;
      this._baseScale.setValue(this._lastScale);
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
  render() {
    return (
      <PanGestureHandler
        ref={this.panRef}
        onGestureEvent={this._onTranslateGestureEvent}
        onHandlerStateChange={this._onTranslateGestureStateChange}
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
                <Animated.View style={[styles.container, {
                        transform: [
                          { perspective: 200 },
                          { scale: this._scale },
                          { translateY: this._translateYStr },
                          { translateX: this._translateXStr },
                        ],
                      }]} collapsable={false}>
                  <Image
                    style={styles.pinchableImage}
                    source={require('../../assets/images/kiwis_lizard_sanctuary.png')}
                  />
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
  },
  wrapper: {
    flex: 1,
  },
});
