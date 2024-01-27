import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from './Colors';

/**
 * Render the Button component.
 * 
 * @param {object} props - The component's props.
 * @param {string} props.text - The button text.
 * @param {function} props.onPress - Callback function to handle the button press.
 * @param {string} [props.color="black"] - The button color (optional).
 * @returns {JSX.Element} - The Button component.
 */
export default function Button({ text, onPress, color }) {
    const textColor = {color: colors[color] || colors.black};

    // Render the Button component
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[textColor, styles.margin]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    margin: {
        marginBottom: 10,
        marginTop: 10,
        fontSize: 18,
    },
})