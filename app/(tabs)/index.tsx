import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Pressable,
} from "react-native";

const quotes = [
  {
    latin: "Difficultates mentem firmant",
    translation: "Difficulties strengthen the mind.",
    author: "Seneca",
  },
  {
    latin: "Amor Fati",
    translation: "Love your fate.",
    author: "Nietzsche",
  },
  {
    latin: "Per aspera ad astra",
    translation: "Through hardships to the stars.",
    author: "Seneca",
  },
  // Add more curated quotes here
];

const USER_NAME = "Marcus"; // This can be made configurable in settings

export default function HomeScreen() {
  const [index, setIndex] = useState(0);
  const [showAuthor, setShowAuthor] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const nextQuote = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
      setShowAuthor(false);
    });
  };

  const handleQuotePress = () => setShowAuthor((prev) => !prev);

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>For {USER_NAME}</Text>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center" }}
        activeOpacity={1}
        onPress={nextQuote}
        onLongPress={() => {
          /* custom quote logic here */
        }}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Pressable onPress={handleQuotePress}>
            <Text style={styles.latin} selectable={false}>
              {quotes[index].latin}
            </Text>
            <Text style={styles.translation} selectable={false}>
              {quotes[index].translation}
            </Text>
            {showAuthor && (
              <Text style={styles.author}>{quotes[index].author}</Text>
            )}
          </Pressable>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  userName: {
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 12,
    color: "grey",
    fontFamily: "Inter-Light",
  },
  latin: {
    fontSize: 28,
    fontFamily: "EBGaramond-Bold",
    textAlign: "center",
    fontWeight: "bold",
    color: "#111",
    marginTop: 40,
  },
  translation: {
    fontSize: 16,
    fontFamily: "Inter-Light",
    color: "grey",
    textAlign: "center",
    marginTop: 10,
  },
  author: {
    fontSize: 14,
    color: "grey",
    textAlign: "center",
    marginTop: 5,
    fontFamily: "Inter-Light",
  },
});
