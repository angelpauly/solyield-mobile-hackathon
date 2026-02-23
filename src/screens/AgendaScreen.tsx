import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { visits } from "../data/schedule";
import { sites } from "../data/sites";

type Props = NativeStackScreenProps<RootStackParamList, "Agenda">;

export default function AgendaScreen({ navigation }: Props) {
  const today = new Date().toISOString().split("T")[0];

  const todaysVisits = visits.filter((visit) => visit.date === today);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Visits</Text>

      <FlatList
        data={todaysVisits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const site = sites.find((s) => s.id === item.siteId);

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("CheckIn", { siteId: item.siteId })
              }
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{site?.name}</Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>No visits scheduled for today.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    padding: 16,
    backgroundColor: "#E3F2FD",
    marginBottom: 12,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    marginTop: 4,
    color: "#555",
  },
  empty: {
    marginTop: 50,
    textAlign: "center",
    color: "#888",
  },
});