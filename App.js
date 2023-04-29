import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Card from "./components/Card";

// Array de cartas
const cards = ["👻", "🎃", "🕷", "🧟‍♂️", "🧛‍♂️", "🧙‍♀️"];

const App = () => {
  // Estados de la app
  const [board, setBoard] = useState(() => shuffle([...cards, ...cards]));
  const [selectedCard, setSelectedCard] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);

  // Funcion que se ejecuta cuando se seleccionan 2 cartas
  React.useEffect(() => {
    if (selectedCard.length < 2) return;
    if (board[selectedCard[0]] === board[selectedCard[1]]) {
      setMatched([...matched, ...selectedCard]);
      setSelectedCard([]);
    } else {
      setTimeout(() => setSelectedCard([]), 1000);
    }
  }, [selectedCard]);

  // Funcion que se ejecuta cuando se selecciona una carta
  const handleTapCard = (index) => {
    if (selectedCard.length >= 2 || selectedCard.includes(index)) return;
    setSelectedCard([...selectedCard, index]);
    setScore(score + 1);
  };

  // Funcion que se ejecuta cuando se gana el juego
  const didPlayerWin = () => matched.length === board.length;

  // Funcion que se ejecuta cuando se reinicia el juego
  const resetGame = () => {
    setMatched([]);
    setSelectedCard([]);
    setScore(0);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/img-background.png")}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <Text style={styles.title}>
          {didPlayerWin() ? "🏆🏆 Ganaste 🏆🏆" : "🎃 Memolloween 🎃"}
        </Text>
        {score > 0 ? <Text style={styles.title}> Puntos: {score}</Text> : null}
        <View style={styles.board}>
          {board?.map((items, index) => {
            const isTurnedOver =
              selectedCard.includes(index) || matched.includes(index);
            return (
              <Card
                onPress={() => handleTapCard(index)}
                isTurnedOver={isTurnedOver}
                key={index}
              >
                {items}
              </Card>
            );
          })}
        </View>
        {didPlayerWin() && (
          <TouchableOpacity onPress={resetGame} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Reiniciar juego</Text>
          </TouchableOpacity>
        )}
        <StatusBar style="light" />
      </ImageBackground>
    </View>
  );
};

// Funcion que se ejecuta cuando se inicia el juego y se mezclan las cartas
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
    elevation: 5, // Añade sombra en Android
    shadowColor: "#000", // Añade sombra en iOS
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    width: "50%",
    alignSelf: "center",
    backgroundColor: "orange",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 5, // Añade sombra en Android
    shadowColor: "#000", // Añade sombra en iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default App;
