import { StyleSheet, View } from "react-native";
import { Colors } from "../../util/colors";

export const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary600,
    borderRadius: 8,
    elevation: 20,
    shadowColor: "black",
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
});
