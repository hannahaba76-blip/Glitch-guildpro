import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default function LoadingScreen() {
  const scanLine = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, {
          toValue: height,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLine, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.scanLine, { transform: [{ translateY: scanLine }] }]} />
      <Text style={styles.text}>GLITCH GUILD</Text>
      <Text style={styles.subText}>Initializing...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#00FF9D',
    opacity: 0.5,
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00FF9D',
    letterSpacing: 4,
  },
  subText: {
    marginTop: 20,
    color: '#CCCCCC',
    fontSize: 14,
  },
});