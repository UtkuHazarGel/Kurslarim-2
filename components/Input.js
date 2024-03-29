import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function Input({ label, textInputConfig, style,inValid}) {
  const inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if(inValid){
    inputStyles.push(styles.inValidInput)
  }
  return (
    <View style={[styles.inputContainer,style]}>
      <Text style={[styles.label,inValid&& styles.inValidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    // flex:1,
    marginHorizontal: 4,
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    color: "blue",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "pink",
    padding: 6,
    borderRadius: 15,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  inValidLabel:{
    color:"red"
  },
  inValidInput:{
    backgroundColor:"red"
  }
});
