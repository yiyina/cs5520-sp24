import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import colors from '../components/Colors';

export default function Game({ userName, guessNumber, theNumber, count, setCount, closeModal, onGameEnd }) {
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

    function handleGameOver() {
        console.log("Game handleGameOver called");
        onGameEnd(win);
    }

    /* 
     * Function: compareNumbers
     * Purpose: compare the user's guess number with the random number
     * Parameters: none
     * Return: none
     */
    function compareNumbers () {
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

    /*
     * Function: handleTryAgain
     * Purpose: handle the 'Let Me Guess Again' button press 
     * Parameters: none
     * Return: none
     */
    function handleTryAgain() {
        closeModal();
    }

    return (
        <LinearGradient 
            style={styles.container}
            colors={['#D8BFD8', '#A670C0']}
            start={[0.5, 0]}
            end={[0.5, 1]}>
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
                        <Button text="Let Me Guess Again" onPress={handleTryAgain} color={'confirm'} />
                    :
                        <Text style={{color: colors.disableConfirm}}>Let Me Guess Again</Text>}
                    
                </>
                }
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 60,
        width: '100%',
        alignItems: 'center',
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