import { View, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../util/colors";

function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: "grey" }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: { borderRadius: 30, margin: 4, overflow: "hidden" },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,

    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 10,
    color: "white",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default PrimaryButton;
