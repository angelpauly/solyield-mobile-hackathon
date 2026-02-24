import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { getDistanceInMeters } from "../utils/geoUtils"; // Move your math function here
import { colors } from "../theme/colors";

export default function CheckInScreen({ route, navigation }: any) {
  const { site } = route.params;
  const [loading, setLoading] = useState(false);

  const performCheckIn = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Location access is required for check-in.");
      setLoading(false);
      return;
    }

    const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    const distance = getDistanceInMeters(
      loc.coords.latitude,
      loc.coords.longitude,
      site.location.lat,
      site.location.lng
    );

    setLoading(false);

    if (distance <= 500) {
      Alert.alert("Success", "You are within 500m. Checked in!");
      // Once checked in, go to Map for navigation or directly to Report
      navigation.navigate("Map", { site }); 
    } else {
      Alert.alert("Too Far Away", `You are ${Math.round(distance)}m away. You must be within 500m to check in.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arrived at {site.name}?</Text>
      <Text style={styles.subtitle}>Geofencing will verify your location.</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={performCheckIn}>
          <Text style={styles.buttonText}>Verify & Check In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary },
  subtitle: { textAlign: 'center', marginVertical: 10, color: colors.textSecondary },
  button: { backgroundColor: colors.success, padding: 15, borderRadius: 10, width: '100%' },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});