import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import StartInput from '../components/StartInput';
import StartCheckBox from '../components/StartCheckBox';
import StartSubmit from '../components/StartSubmit';
import Game from './Game';
import Final from './Final';
import colors from '../components/Colors';

/* 
 * Function: StartScreen
 * Purpose: render the start screen
 * Parameters: none
 * Return: the start screen
 */
export default function StartScreen() {
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
  const [userName, setUserName] = useState("");
  const [guessNumber, setGuessNumber] = useState("");
  const [theNumber, setTheNumber] = useState(0); 
  const [errorName, setErrorName] = useState("");
  const [errorNumber, setErrorNumber] = useState("");
  const [count, setCount] = useState(3);
  const [gameModal, setGameModal] = useState(false);
  const [finalModal, setFinalModal] = useState(false);
  const [gameResult, setGameResult] = useState("");

  const handleCheckBoxChange = () => {
    console.log("handleCheckBoxChange called")
    setIsCheckBoxChecked(!isCheckBoxChecked);
    console.log(isCheckBoxChecked)
  }

  function getUserName (name) {
    setUserName(name);
  }

  function getGuessNumber (number) {
    setGuessNumber(number);
  }

  /*
   * Function: getRandomNumber 
   * Purpose: get a random number between 1020 and 1029
   * Parameters: none
   * Return: a random number between 1020 and 1029
   */
  function getRandomNumber () {
    console.log("getRandomNumber called")
    const min = 1020;
    const max = 1029;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  /* 
   * Function: handleConfirmButtonPress
   * Purpose: handle the 'Confirm' button press
   * Parameters: none
   * Return: none
   */
  function handleConfirmButtonPress () {
    let isValid = true;
    setErrorName("");
    setErrorNumber("");

    if (userName.length <= 1 || !/^[a-zA-Z]+$/.test(userName)) {
      setErrorName("Please enter a valid name");
      setUserName("");
      isValid = false;
    }

    const parsedNumber = parseInt(guessNumber, 10);
    if (parsedNumber === "" || isNaN(parsedNumber) || parsedNumber < 1020 || parsedNumber > 1029) {
      setErrorNumber("Please enter a valid number between 1020 and 1029");
      setGuessNumber("");
      isValid = false;
    }
    
    if (isValid) {
      console.log("setGuessNumber: " + parsedNumber.toString());
      if (count === 0 || count === 3) {
        // Start a new game
        const randomNumber = getRandomNumber();
        setTheNumber(randomNumber);
        setCount(2);  // Set to 2 because this attempt will count as the first one
        console.log(`New game started. The random number is ${randomNumber}`);
      } else {
        setCount(count - 1);  // Deduct one attempt every time the user clicks the 'Confirm' button
      }
      setIsCheckBoxChecked(false);
      setGameModal(true);
    }
  }

  function handleResetButtonPress () {
    setUserName("");
    setGuessNumber("");
    setErrorName("");
    setErrorNumber("");
  }

  function resetGame() {
    console.log("resetGame called");
    setUserName("");
    setGuessNumber("");
    setTheNumber(0);
    setErrorName("");
    setErrorNumber("");
    setCount(3);
    setIsCheckBoxChecked(false);
  }

  function handleGameEnd(result) {
    console.log("handleGameEnd called");
    setGameResult(result);
    setGameModal(false);
    setFinalModal(true); 
  }

  function handleStartAgain() {
    console.log("handleStartAgain called");
    setFinalModal(false); 
    resetGame();         
  }

  return (
    <LinearGradient style={styles.container} 
      colors={['#D8BFD8', '#A670C0']}
      start={[0.5, 0]}
      end={[0.5, 1]}>
      <Text style={styles.title}>Guess My Number</Text>
      <View style={styles.card}>
        <StartInput textInput={"Name"} errorMessage={errorName} getInput={getUserName} value={userName}/>
        <StartInput textInput={"Guess a Number"} errorMessage={errorNumber} getInput={getGuessNumber} value={guessNumber}/>
        <StartCheckBox isCheckBoxChecked={isCheckBoxChecked} handleCheckBox={handleCheckBoxChange} />
        <StartSubmit isCheckBoxChecked={isCheckBoxChecked} resetButtonPress={handleResetButtonPress} confirmButtonPress={handleConfirmButtonPress}/>
        <Modal visible={gameModal}>
          <Game 
            userName={userName} 
            guessNumber={guessNumber} 
            setGuessNumber={setGuessNumber}
            theNumber={theNumber} 
            count={count}
            setCount={setCount}
            closeModal={() => setGameModal(false)}
            onGameEnd={handleGameEnd}/>
        </Modal>
        <Modal visible={finalModal}>
          <Final 
            gameResult={gameResult} 
            guessNumber={guessNumber} 
            startAgain={handleStartAgain}/>
        </Modal>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 60,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.card,
    width: '70%',
    height: '200',
    padding: 20,
    borderRadius: 10,
    shadowColor: colors.shadow,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 10,
    margin: 20,
    alignItems: 'center', 
  },
})