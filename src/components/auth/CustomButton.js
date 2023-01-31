import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

const CustomButton = ({ onPress, text, type = 'PRIMARY', bgColor, txColor }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor, width: 175, padding: 15, marginLeft: 5 } : {},
      ]}>
      <Text style={([styles.text, `text_${type}`], txColor ? { color: txColor } : {})}>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 7,
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: '#3B71B3',
  },
  container_TERTIARY: {
    borderRadius: '20px',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text_TERTIARY: {
    color: 'gray',
  },
});
