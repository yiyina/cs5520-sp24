import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import StartInput from '../components/Input';
import StartCheckBox from '../components/CheckBox';
import StartSubmit from '../components/StartSubmit';
import colors from '../components/Colors';

/**
 * Render the Start screen component.
 *
 * @param {object} props - The component's props.
 * @param {function} props.handleStartGame - Callback function to start the game.
 * @param {string} [props.initialUserName=""] - Initial user name (optional).
 * @param {string} [props.initialGuessNumber=""] - Initial guess number (optional).
 * @returns {JSX.Element} - The Start screen component.
 */
export default function Start({ handleStartGame, initialUserName, initialGuessNumber }) {
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
  const [userName, setUserName] = useState(initialUserName || "");
  const [guessNumber, setGuessNumber] = useState(initialGuessNumber || "");
  const [errorName, setErrorName] = useState("");
  const [errorNumber, setErrorNumber] = useState("");

  /**
   * Handle the change of the checkbox state.
   * 
   * @param {none} none
   * @returns {none}
   */
  const handleCheckBoxChange = () => {
    console.log("handleCheckBoxChange called")
    setIsCheckBoxChecked(!isCheckBoxChecked);
    console.log(isCheckBoxChecked)
  }

  /**
   * Update the user name state based on input value.
   *
   * @param {string} name - The user name input value.
   * @returns {none}
   */
  const getUserName = (name) => {
    setUserName(name);
  }

  /**
   * Update the guess number state based on input value.
   *
   * @param {string} number - The guess number input value.
   * @returns {none}
   */
  const getGuessNumber = (number) => {
    setGuessNumber(number);
  }

  /**
   * Handle the 'Confirm' button press.
   * Validates user input and starts the game if input is valid.
   * 
   * @param {none} none
   * @returns {none}
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

  /**
   * Handle the 'Reset' button press to clear user input and errors.
   * 
   * @param {none} none
   * @returns {none}
   */
  const handleResetButtonPress = () => {
    setUserName("");
    setGuessNumber("");
    setErrorName("");
    setErrorNumber("");
  }

  // Render the start screen component
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
    height: 350,
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