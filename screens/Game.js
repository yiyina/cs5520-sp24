import { StyleSheet, Text, View, Modal } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import Button from '../components/Button';
import colors from '../components/Colors';

/**
 * Render the Game screen component.
 *
 * Game component: Displays the game screen with modal
 * @param {object} props - The component's props.
 * @param {boolean} props.modalVisible - The modal visibility.
 * @param {string} props.userName - The user name.
 * @param {string} props.guessNumber - The user's guess number.
 * @param {number} props.theNumber - The random number.
 * @param {number} props.count - The number of attempts left.
 * @param {function} props.setCount - Callback function to set the number of attempts left.
 * @param {function} props.onTryAgain - Callback function to try again.
 * @param {function} props.onGameEnd - Callback function to end the game.
 * @returns JSX.Element - The Game screen component
 */
export default function Game({ modalVisible, userName, guessNumber, theNumber, count, setCount, onTryAgain, onGameEnd }) {
    const [win, setWin] = useState(false);
    const [message, setMessage] = useState("");

    // Compare the user's guess with the actual number each time guessNumber, theNumber or count changes.
    useEffect(() => {
        // if guessNumber and userName are not empty, compare the numbers
        if (guessNumber && userName) { 
            compareNumbers();
        }
    }, [guessNumber, theNumber, count]);

    const handleGameOver = () => {
        console.log("Game handleGameOver called");
        onGameEnd(win);
    }

    /**
     * Function to compare user's guess with the actual number
     */
    const compareNumbers = () => {
        console.log("Game compareNumbers called");
        console.log("User name: " + userName + ", Guess number: " + guessNumber + " The number is: " + theNumber + " Count: " + count);
        if (parseInt(guessNumber) === theNumber) {
            setWin(true);
            setMessage("Congrats " + userName + "! You Won!");
            setCount(0);
        } else if (count === 0) {
            setMessage("Hello " + userName + "\nYou have chosen " + guessNumber + "\nThat's not my number!\nYou have no attempts left!");
        } else {
            let hint = guessNumber < theNumber ? "Guess higher!" : "Guess lower!";
            setMessage("Hello " + userName + "\nYou have chosen " + guessNumber + "\nThat's not my number!\n" + hint + "\nYou have " + count + " attempts left!");
        }
    }

    // Render the modal with the game results
    return (
        <Modal  visible={modalVisible} transparent={true}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.resultsText}>
                        {message}
                    </Text>
                    {win ? 
                        <Button text={'Thank you!'} onPress={handleGameOver} color={'confirm'}/>
                    : 
                    <>
                        <Button text="I am done" onPress={handleGameOver} color={'alert'} /> 
                        { count > 0 ? 
                            <Button text="Let Me Guess Again" onPress={onTryAgain} color={'confirm'} />
                        :
                            <Text style={{color: colors.disableConfirm}}>Let Me Guess Again</Text>}
                        
                    </>
                    }
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    card: {
        width: '80%',
        backgroundColor: colors.card,
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.5,
        elevation: 10,
        marginTop: '50%', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    resultsText: {
        color: colors.text,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    done: {
        color: colors.alert,
        marginBottom: 10,
        textAlign: 'center',
    },
    playAgain: {
        color: colors.confirm,
        textAlign: 'center',
        marginTop: 10,
    },
    thanks: {
        color: colors.confirm,
    }
})