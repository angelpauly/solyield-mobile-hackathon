import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { colors } from "../theme/colors";

export default function MapScreen({ route, navigation }: any) {
  const { site } = route.params;

  const openGoogleMaps = () => {
    // Standard URL scheme for Level 1 Navigation
    const url = `google.navigation:q=${site.location.lat},${site.location.lng}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Google Maps app not found. Opening in browser.");
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${site.location.lat},${site.location.lng}`);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView 
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: site.location.lat,
          longitude: site.location.lng,
          latitudeDelta: 0.01, // Zoomed in closer to see the site clearly
          longitudeDelta: 0.01,
        }}
      >
        <Marker 
          coordinate={{ latitude: site.location.lat, longitude: site.location.lng }}
          title={site.name} // Native Site Name
          description={`Coords: ${site.location.lat}, ${site.location.lng}`} // Native Coords
          pinColor={colors.primary}
        >
          {/* Custom Callout Box */}
          <Callout onPress={openGoogleMaps}>
            <View style={styles.calloutBox}>
              <Text style={styles.calloutTitle}>{site.name}</Text>
              <Text style={styles.calloutText}>Lat: {site.location.lat}</Text>
              <Text style={styles.calloutText}>Lng: {site.location.lng}</Text>
              <Text style={styles.navAction}>🚀 TAP TO NAVIGATE</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      {/* Persistent Bottom Card for the Inspection Flow */}
      <View style={styles.bottomContainer}>
        <Text style={styles.siteHeader}>{site.name}</Text>
        <Text style={styles.siteSub}>Location Verified via GPS</Text>
        
        <TouchableOpacity 
          style={styles.reportButton} 
          onPress={() => navigation.navigate("Report", { site })}
        >
          <Text style={styles.reportButtonText}>📋 START INSPECTION REPORT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calloutBox: {
    padding: 12,
    width: 200,
    backgroundColor: '#ffffff',
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.primary,
    marginBottom: 4,
  },
  calloutText: {
    fontSize: 12,
    color: '#444',
  },
  navAction: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.success,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  siteHeader: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary },
  siteSub: { fontSize: 12, color: colors.textSecondary, marginBottom: 15 },
  reportButton: { 
    backgroundColor: colors.success, 
    padding: 16, 
    borderRadius: 12,
    alignItems: 'center'
  },
  reportButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 15 
  }
});