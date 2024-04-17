import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { Title } from "../components/ui/Title";
import { NumberContainer } from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Card } from "../components/ui/Card";
import { InstructionText } from "../components/ui/InstructionText";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Colors } from "../util/colors";
import { GuessLogItem } from "../components/game/GuessLogItem";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum == exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

export const GameScreen = ({ userNum, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNum);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    currentGuess === userNum ? onGameOver(guessRounds.length) : undefined;
  }, [currentGuess, userNum, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNum) ||
      (direction === "greater" && currentGuess > userNum)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    console.log(minBoundary, maxBoundary);
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setGuessRounds((prev) => [newRndNumber, ...prev]);
    setCurrentGuess(newRndNumber);
  };

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      {/* <Title children={"Opponent's Guess"} /> */}
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.InstructionText}>
          Higher Or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <FontAwesome name="minus" size={30} color={Colors.accent500} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <FontAwesome name="plus" size={30} color={Colors.accent500} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map((item, index) => {
          return (
            <View key={index}>
              <Text>{item}</Text>
            </View>
          );
        })} map대신에 밑의 FlatList를 사용해서 컴포넌트를 반복해여 생성한다. 스크롤도 디폴트로 가능하다. 길이가 넘어가는 경우에 한해서 */}

        <FlatList
          data={guessRounds}
          renderItem={(item) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - item.index}
              guess={item.item}
            />
          )}
          keyExtractor={(i) => i}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  InstructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
