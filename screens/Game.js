import { StyleSheet, Text, View, Modal } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import Button from '../components/Button';
import colors from '../components/Colors';

export default function Game({ modalVisible, userName, guessNumber, theNumber, count, setCount, onTryAgain, onGameEnd }) {
    const [win, setWin] = useState(false);
    const [message, setMessage] = useState("");

    /*
     * useEffect hook is called after the component is rendered
     */
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

    /* 
     * Function: compareNumbers
     * Purpose: compare the user's guess number with the random number
     * Parameters: none
     * Return: none
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