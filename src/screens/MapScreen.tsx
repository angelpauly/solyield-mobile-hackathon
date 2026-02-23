import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import * as Linking from "expo-linking";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function MapScreen({ route }: Props) {
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
        <ActivityIndicator size="large" />
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
    <MapView
      style={StyleSheet.absoluteFillObject}
      initialRegion={{
        latitude: midLatitude,
        longitude: midLongitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
    >
      {/* User Marker */}
      <Marker
        coordinate={userLocation}
        title="You"
        pinColor="blue"
      />

      {/* Site Marker with Callout */}
      <Marker
        coordinate={{
          latitude: site.location.lat,
          longitude: site.location.lng,
        }}
        pinColor="red"
      >
        <Callout onPress={handleNavigate}>
          <View style={styles.callout}>
            <Text style={styles.siteName}>{site.name}</Text>
            <Text style={styles.navigateText}>
              Tap to Navigate
            </Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  callout: {
    width: 160,
  },
  siteName: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  navigateText: {
    color: "blue",
  },
});