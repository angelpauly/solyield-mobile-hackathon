import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { getDistanceInMeters } from "../utils/geoUtils";
import { colors } from "../theme/colors";

export default function CheckInScreen({ route, navigation }: any) {
  const { site } = route.params;
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Location is required to check in.");
      setLoading(false);
      return;
    }

    const userLoc = await Location.getCurrentPositionAsync({});
    const distance = getDistanceInMeters(
      userLoc.coords.latitude,
      userLoc.coords.longitude,
      site.location.lat,
      site.location.lng
    );

    setLoading(false);

    // Requirement 1.2: Verify technician is within 500m
    if (distance <= 500) {
      Alert.alert("Success", "You have arrived at the site!", [
        { text: "Open Map", onPress: () => navigation.navigate("Map", { site }) }
      ]);
    } else {
      Alert.alert("Too Far", `You are ${Math.round(distance)}m away. You must be within 500m.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arrived at {site.name}?</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleCheckIn}>
          <Text style={styles.buttonText}>Verify Location & Check-In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: colors.primary, padding: 15, borderRadius: 10, width: '100%' },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});