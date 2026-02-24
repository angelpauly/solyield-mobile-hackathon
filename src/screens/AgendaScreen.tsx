import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { visits } from "../data/schedule";
import { sites } from "../data/sites";
import { colors } from "../theme/colors";

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
              onPress={() => {
  const site = sites.find((s) => s.id === item.siteId);
  if (site) {
    navigation.navigate("CheckIn", { site });
  }
}}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Pending</Text>
                </View>
              </View>

              <Text style={styles.subtitle}>{site?.name}</Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No visits scheduled for today.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.textPrimary,
  },
  card: {
    backgroundColor: colors.card,
    padding: 16,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: 6,
    color: colors.textSecondary,
  },
  statusBadge: {
    backgroundColor: colors.warning,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  empty: {
    marginTop: 50,
    textAlign: "center",
    color: colors.textSecondary,
  },
});