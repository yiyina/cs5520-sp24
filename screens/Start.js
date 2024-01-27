import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import StartInput from '../components/StartInput';
import StartCheckBox from '../components/StartCheckBox';
import StartSubmit from '../components/StartSubmit';
import colors from '../components/Colors';

/* 
 * Function: StartScreen
 * Purpose: render the start screen
 * Parameters: none
 * Return: the start screen
 */
export default function Start({ handleStartGame, initialUserName, initialGuessNumber }) {
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
  const [userName, setUserName] = useState(initialUserName || "");
  const [guessNumber, setGuessNumber] = useState(initialGuessNumber || "");
  const [errorName, setErrorName] = useState("");
  const [errorNumber, setErrorNumber] = useState("");

  const handleCheckBoxChange = () => {
    console.log("handleCheckBoxChange called")
    setIsCheckBoxChecked(!isCheckBoxChecked);
    console.log(isCheckBoxChecked)
  }

  const getUserName = (name) => {
    setUserName(name);
  }

  const getGuessNumber = (number) => {
    setGuessNumber(number);
  }

  /* 
   * Function: handleConfirmButtonPress
   * Purpose: handle the 'Confirm' button press
   * Parameters: none
   * Return: none
   */
  const handleConfirmButtonPress = () => {
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
      console.log("setGuessNumber: " + guessNumber.toString());
      handleStartGame(userName, guessNumber);
    }
  }

  const handleResetButtonPress = () => {
    setUserName("");
    setGuessNumber("");
    setErrorName("");
    setErrorNumber("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess My Number</Text>
      <View style={styles.card}>
        <StartInput textInput={"Name"} errorMessage={errorName} getInput={getUserName} value={userName}/>
        <StartInput textInput={"Guess a Number"} errorMessage={errorNumber} getInput={getGuessNumber} value={guessNumber}/>
        <StartCheckBox isCheckBoxChecked={isCheckBoxChecked} handleCheckBox={handleCheckBoxChange} />
        <StartSubmit isCheckBoxChecked={isCheckBoxChecked} resetButtonPress={handleResetButtonPress} confirmButtonPress={handleConfirmButtonPress}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    width: '100%',
    alignItems: 'center',
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
  title: {
    color: colors.text,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },

})