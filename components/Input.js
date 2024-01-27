import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from './Colors';

/**
 * Render the StartInput component.
 * 
 * @param {object} props - The component's props.
 * @param {string} props.textInput - The input text.
 * @param {string} props.errorMessage - The error message text.
 * @param {function} props.getInput - Callback function to handle the input value.
 * @param {string} props.value - The input value.
 * @returns {JSX.Element} - The StartInput component.
 */
export default function StartInput({ textInput, errorMessage, getInput, value }) {
    
    // Render the StartInput component
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{textInput}</Text>
                <TextInput 
                    style={styles.inputLine} 
                    value={value}
                    onChangeText={getInput}
                />
            <Text style={styles.errorAlert}>{errorMessage}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        width: '100%',
        color: colors.text,
        marginBottom: 10,
    },
    inputLine: {
        borderBottomWidth: 2,
        borderBottomColor: colors.text,
        width: '100%',
        color: colors.text,
        fontWeight: 'bold',
        paddingBottom: 10,
        textAlign: 'center',
    },
    errorAlert: {
        color: colors.default,
        width: '100%',
    },
})