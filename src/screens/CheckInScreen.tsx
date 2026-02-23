import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { sites } from "../data/sites";
import { getDistanceInMeters } from "../utils/distance";
import { Site } from "../types/site";

type Props = NativeStackScreenProps<RootStackParamList, "CheckIn">;

export default function CheckInScreen({ navigation, route }: Props) {
  const { siteId } = route.params;

  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [statusText, setStatusText] = useState("Not Checked In");
  const [loading, setLoading] = useState(false);

  // Pre-select site from Agenda
  useEffect(() => {
    const site = sites.find((s) => s.id === siteId);
    if (site) {
      setSelectedSite(site);
    }
  }, [siteId]);

  const handleCheckIn = async () => {
    if (!selectedSite) {
      Alert.alert("Site not found.");
      return;
    }

    try {
      setLoading(true);

      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert("Location permission denied");
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const distance = getDistanceInMeters(
        latitude,
        longitude,
        selectedSite.location.lat,
        selectedSite.location.lng
      );

      if (distance <= 500) {
        setStatusText(
          `Check-In Successful at ${selectedSite.name} ✅`
        );

        setTimeout(() => {
          navigation.navigate("Map", { site: selectedSite });
        }, 1000);
      } else {
        setStatusText(
          `Too far from site ❌ (${Math.round(distance)} meters away)`
        );
      }
    } catch (error) {
      Alert.alert("Something went wrong while checking location.");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedSite) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Check-In</Text>

      <View style={styles.card}>
        <Text style={styles.siteName}>{selectedSite.name}</Text>
        <Text style={styles.coordinates}>
          Lat: {selectedSite.location.lat} | Lng: {selectedSite.location.lng}
        </Text>
      </View>

      <Text style={styles.status}>Status: {statusText}</Text>

      <Button
        title={loading ? "Checking..." : "Check In"}
        onPress={handleCheckIn}
        disabled={loading}
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
    borderRadius: 10,
    marginBottom: 20,
  },
  siteName: {
    fontSize: 18,
    fontWeight: "600",
  },
  coordinates: {
    marginTop: 6,
    color: "#555",
  },
  status: {
    marginBottom: 15,
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});