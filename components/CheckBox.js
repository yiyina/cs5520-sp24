import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import CheckBox from 'expo-checkbox';
import colors from './Colors';

/**
 * Render the StartCheckBox component.
 * 
 * @param {object} props - The component's props.
 * @param {boolean} props.isCheckBoxChecked - The checkbox state.
 * @param {function} props.handleCheckBox - Callback function to handle the checkbox state.
 * @returns {JSX.Element} - The StartCheckBox component.
 */
export default function StartCheckBox({ isCheckBoxChecked, handleCheckBox }) {

  // Render the StartCheckBox component
  return (
    <View style={styles.checkboxContainer}>
      <CheckBox 
        style={styles.checkbox}
        value={isCheckBoxChecked}
        onValueChange={handleCheckBox}/>
      <Text style={styles.text}>I am not a robot</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  text: {
    color: colors.text,
  },
})