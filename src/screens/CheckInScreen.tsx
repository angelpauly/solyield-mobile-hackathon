import React, { useState } from "react";
import { View, Text, Button, Alert, FlatList, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { sites } from "../data/sites";
import { getDistanceInMeters } from "../utils/distance";

export default function CheckInScreen() {
  const [selectedSite, setSelectedSite] = useState<typeof sites[0] | null>(null);
  const [status, setStatus] = useState("Not Checked In");

  const handleCheckIn = async () => {
    if (!selectedSite) {
      Alert.alert("Please select a site first");
      return;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Location permission denied");
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
      setStatus(`Check-In Successful at ${selectedSite.name} ✅`);
    } else {
      setStatus("Too far from selected site ❌");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Select Site:
      </Text>

      <FlatList
        data={sites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 12,
              marginBottom: 8,
              backgroundColor:
                selectedSite?.id === item.id ? "#4CAF50" : "#E0E0E0",
              borderRadius: 8,
            }}
            onPress={() => setSelectedSite(item)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={{ marginVertical: 10 }}>Status: {status}</Text>

      <Button title="Check In" onPress={handleCheckIn} />
    </View>
  );
}