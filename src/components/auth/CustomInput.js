import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  // console.log(value);
  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={setValue}
        style={styles.input}
        placeholder={placeholder}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    padding: 13,
    marginVertical: 7,
  },
  input: {},
});
