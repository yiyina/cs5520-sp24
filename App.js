import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Start from './screens/Start';
import Game from './screens/Game';
import Final from './screens/Final';

/* 
 * Function: App
 * Purpose: render the app
 * Parameters: none
 * Return: the app
 */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState("start");
  const [userName, setUserName] = useState("");
  const [guessNumber, setGuessNumber] = useState("");
  const [randomNumber, setRandomNumber] = useState(0); 
  const [count, setCount] = useState(3);
  const [gameResult, setGameResult] = useState("");
  const [isGameModalVisible, setIsGameModalVisible] = useState(false);

  useEffect(() => {
  
  }, [currentScreen]);

  /*
   * Function: getRandomNumber 
   * Purpose: get a random number between 1020 and 1029
   * Parameters: none
   * Return: a random number between 1020 and 1029
   */
  const getRandomNumber = () => {
    console.log("getRandomNumber called")
    const min = 1020;
    const max = 1029;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  /*
   * Function: startNewGame
   * Purpose: start a new game
   * Parameters: none
   * Return: none
   */
  const startNewGame = () => {
    const randomNum = getRandomNumber();
    setRandomNumber(randomNum);
    setCount(2); 
    console.log(`New game started. The random number is ${randomNum}`);
  };

  /*
   * Function: handleStartGame
   * Purpose: handle the 'Start Game' button press
   * Parameters: none
   * Return: none
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

  /*
   * Function: handleTryAgain
   * Purpose: handle the 'Try Again' button press
   * Parameters: none
   * Return: none
   */
  const handleTryAgain = () => {
    setIsGameModalVisible(false);
    setCurrentScreen("start");
  }

  /*
   * Function: handleGameEnd
   * Purpose: handle the end of the game
   * Parameters: none
   * Return: none
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

  return (
    <LinearGradient style={styles.container} colors={['#D8BFD8', '#A670C0']} start={[0.5, 0]} end={[0.5, 1]}>
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