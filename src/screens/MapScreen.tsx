import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import * as Linking from "expo-linking";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function MapScreen({ route, navigation }: Props) {
  const { site } = route.params;

  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    };

    fetchLocation();
  }, []);

  if (!userLocation) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const midLatitude =
    (userLocation.latitude + site.location.lat) / 2;

  const midLongitude =
    (userLocation.longitude + site.location.lng) / 2;

  const handleNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${site.location.lat},${site.location.lng}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: midLatitude,
          longitude: midLongitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker coordinate={userLocation} pinColor={colors.primary} />

        <Marker
          coordinate={{
            latitude: site.location.lat,
            longitude: site.location.lng,
          }}
          pinColor={colors.danger}
        >
          <Callout onPress={handleNavigate}>
            <View style={styles.callout}>
              <Text style={styles.siteName}>{site.name}</Text>
              <Text style={styles.navigateText}>
                Tap to Open Navigation
              </Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      {/* Bottom Card */}
      <View style={styles.bottomCard}>
        <Text style={styles.siteTitle}>{site.name}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Report", { site })}
        >
          <Text style={styles.buttonText}>Proceed to Inspection</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  callout: {
    width: 180,
  },
  siteName: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  navigateText: {
    color: colors.primary,
  },
  bottomCard: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.card,
    padding: 18,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 5,
  },
  siteTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});