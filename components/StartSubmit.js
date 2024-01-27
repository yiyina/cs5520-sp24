import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from './Button'
import colors from './Colors';

/**
 * Render the StartSubmit component.
 * 
 * @param {object} props - The component's props.
 * @param {boolean} props.isCheckBoxChecked - The checkbox state.
 * @param {function} props.resetButtonPress - Callback function to handle the 'Reset' button press.
 * @param {function} props.confirmButtonPress - Callback function to handle the 'Confirm' button press.
 * @returns {JSX.Element} - The StartSubmit component.
 */
export default function StartSubmit({ isCheckBoxChecked, resetButtonPress, confirmButtonPress }) {
    
    // Render the StartSubmit component
    return (
        <View style={styles.submitContainer}>
            <Button text={'Reset'} onPress={resetButtonPress} color={'alert'}/>
            {isCheckBoxChecked ? 
                <Button text={'Confirm'} onPress={confirmButtonPress} color={'confirm'}/>
            :
                <Text style={styles.disableConfirmButton}>Confirm</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    submitContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '70%',
    },
    disableConfirmButton: {
        color: colors.disableConfirm,
        marginTop: 10,
        fontSize: 18,
    }
})