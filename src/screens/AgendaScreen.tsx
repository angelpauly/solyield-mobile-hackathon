import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { visits } from "../data/schedule";
import { sites } from "../data/sites";
import { colors } from "../theme/colors";
import { getReports } from "../utils/reportStorage";

export default function AgendaScreen({ navigation }: any) {
  const isFocused = useIsFocused();
  const [completedSiteIds, setCompletedSiteIds] = useState<string[]>([]);
  const today = new Date().toISOString().split("T")[0];
  const todaysVisits = visits.filter((visit) => visit.date === today);

  useEffect(() => {
    if (isFocused) { loadStatus(); }
  }, [isFocused]);

  const loadStatus = async () => {
    const reports = await getReports();
    setCompletedSiteIds(reports.map((r: any) => r.siteId));
  };

  const resetDemo = async () => {
    Alert.alert("Reset Demo", "Clear all data for judges?", [
      { text: "Cancel" },
      { text: "Reset", onPress: async () => {
          await AsyncStorage.removeItem("SOLAR_REPORTS"); //
          setCompletedSiteIds([]);
          Alert.alert("Done", "App reset to Pending state.");
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>My Agenda</Text>
        <TouchableOpacity onPress={resetDemo}><Text style={styles.resetBtn}>🔄 Reset</Text></TouchableOpacity>
      </View>
      <FlatList
        data={todaysVisits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const site = sites.find((s) => s.id === item.siteId);
          const isDone = completedSiteIds.includes(item.siteId);
          return (
            <TouchableOpacity
              style={[styles.card, isDone && { borderLeftColor: colors.success }]}
              onPress={() => isDone ? navigation.navigate("ViewReport", { siteId: item.siteId }) : navigation.navigate("CheckIn", { site })}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={[styles.badge, { backgroundColor: isDone ? colors.success : colors.warning }]}>
                  <Text style={styles.badgeText}>{isDone ? "Completed" : "Pending"}</Text>
                </View>
              </View>
              <Text style={styles.subtitle}>{site?.name}</Text>
              {isDone && <Text style={styles.viewLink}>View Report & PDF →</Text>}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  header: { fontSize: 24, fontWeight: "bold" },
  resetBtn: { color: colors.danger, fontWeight: 'bold' },
  card: { backgroundColor: colors.card, padding: 16, marginBottom: 12, borderRadius: 12, borderLeftWidth: 6, borderLeftColor: colors.primary },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 16, fontWeight: "bold", flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  subtitle: { marginTop: 4, color: colors.textSecondary },
  viewLink: { marginTop: 8, color: colors.primary, fontSize: 12, fontWeight: 'bold' }
});