import { StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Start from './screens/Start';
import Game from './screens/Game';
import Final from './screens/Final';
import colors from './components/Colors';

/**
 * Render the app.
 * 
 * @param {none} none
 * @returns {JSX.Element} - The app component.
 */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState("start");
  const [userName, setUserName] = useState("");
  const [guessNumber, setGuessNumber] = useState("");
  const [randomNumber, setRandomNumber] = useState(0); 
  const [count, setCount] = useState(3);
  const [gameResult, setGameResult] = useState("");
  const [isGameModalVisible, setIsGameModalVisible] = useState(false);

  /**
   * Generate a random number between 1020 and 1029
   * 
   * @param {none} none
   * @returns {number} - The random number
   */
  const getRandomNumber = () => {
    console.log("getRandomNumber called")
    const min = 1020;
    const max = 1029;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  /**
   * Start a new game
   * 
   * @param {none} none
   * @returns {none}
   */
  const startNewGame = () => {
    const randomNum = getRandomNumber();
    setRandomNumber(randomNum);
    setCount(2); 
    console.log(`New game started. The random number is ${randomNum}`);
  };

  /**
   * Handle the 'Start Game' button press
   * 
   * @param {string} name - The user name
   * @param {string} number - The guess number
   * @returns {none}
   */
  const handleStartGame = (name, number) => {
    setUserName(name);
    setGuessNumber(number);
    if (count === 0 || count === 3) {
      startNewGame();
    } else {
      setCount(count - 1); 
    }

    setCurrentScreen("game");
    setIsGameModalVisible(true);
  };

  /**
   * Handle the 'Try Again' button press
   * 
   * @param {none} none
   * @returns {none}
   */
  const handleTryAgain = () => {
    setIsGameModalVisible(false);
    setCurrentScreen("start");
  }

  /**
   * Handle the game end
   * 
   * @param {string} result - The game result
   * @returns {none}
   */
  const handleGameEnd = (result) => {
    console.log("handleGameEnd called")
    setGameResult(result);
    setCurrentScreen("final");
    console.log("Game result: " + result + ", Current screen: " + currentScreen);
  };

  /*
   * Function: handleStartAgain
   * Purpose: handle the 'Start Again' button press
   * Parameters: none
   * Return: none
   */
  const handleStartAgain = () => {
    setUserName("");
    setGuessNumber("");
    setRandomNumber(0);
    setCount(3);
    setGameResult("");
    setCurrentScreen("start");
  };

  // Render the app
  return (
    <LinearGradient style={styles.container} colors={[colors.lightPurple, colors.darkPurple]} start={[0.5, 0]} end={[0.5, 1]}>
      {currentScreen === "start" && (
        <Start
          handleStartGame={handleStartGame}
          initialUserName={userName}
          initialGuessNumber={guessNumber}
        />
      )}
      {currentScreen === "game" && (
        <Game
          userName={userName}
          guessNumber={guessNumber}
          theNumber={randomNumber}
          count={count}
          setCount={setCount}
          modalVisible={isGameModalVisible}
          closeModal={() => setIsGameModalVisible(false)}
          onTryAgain={handleTryAgain}
          onGameEnd={handleGameEnd}
        />
      )}
      {currentScreen === "final" && (
        <Final
          gameResult={gameResult}
          guessNumber={guessNumber}
          startAgain={handleStartAgain}
        />
      )}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    width: '100%',
    alignItems: 'center',
  },
})