import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "CheckIn">;

export default function CheckInScreen({ route, navigation }: Props) {
  const { site } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checked in at {site.name}</Text>

      <Button
        title="Open Map"
        onPress={() => navigation.navigate("Map", { site })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
});