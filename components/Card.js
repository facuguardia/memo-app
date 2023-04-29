import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const Card = ({ onPress, isTurnedOver, children }) => {
  return (
    <Pressable
      onPress={onPress}
      style={isTurnedOver ? styles.cardUp : styles.cardDown}
    >
      {isTurnedOver ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        <Text style={styles.textCard}>💀</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardUp: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: "#1e293b",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 50,
    color: "#334155",
  },
  textCard: {
    fontSize: 50,
    color: "#334155",
    opacity: 0.2,
  },
  cardDown: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: "#1e293b",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
    borderColor: "#334155",
  },
});

export default Card;