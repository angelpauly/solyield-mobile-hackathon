import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { saveReport } from "../utils/reportStorage";
import { colors } from "../theme/colors";
import { Report } from "../types/report";

export default function ReportScreen({ route, navigation }: any) {
  const { site } = route.params;
  const [energyGenerated, setEnergyGenerated] = useState("");
  const [voltage, setVoltage] = useState(""); 
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return Alert.alert("Error", "Camera permission required.");
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.7 });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!energyGenerated || !voltage) return Alert.alert("Error", "Fill all data.");
    
    const newReport: Report = {
      id: Date.now().toString(),
      siteId: site.id,
      siteName: site.name,
      date: new Date().toISOString(),
      energyGenerated: Number(energyGenerated),
      voltage: Number(voltage),
      inverterStatus: Number(voltage) > 180 ? "Operational" : "Faulty", // Dynamic Status
      panelCondition: photo ? "Inspected" : "Not Pictured",
      issueType: "None",
      notes: notes,
      photo: photo || undefined,
      locationVerified: true,
    };

    await saveReport(newReport);
    Alert.alert("Success", "Report Submitted!", [{ text: "OK", onPress: () => navigation.popToTop() }]);
  };

  return (
    <ScrollView style={styles.background} contentContainerStyle={styles.container}>
      <Text style={styles.header}>Field Inspection</Text>
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Energy (kWh)" keyboardType="numeric" value={energyGenerated} onChangeText={setEnergyGenerated} />
        <TextInput style={styles.input} placeholder="Voltage (V)" keyboardType="numeric" value={voltage} onChangeText={setVoltage} />
        <TouchableOpacity style={styles.photoBtn} onPress={takePhoto}>
          <Text style={styles.photoText}>{photo ? "📸 Change Photo" : "📸 Take Photo"}</Text>
        </TouchableOpacity>
        {photo && <Image source={{ uri: photo }} style={styles.preview} />}
        <TextInput style={[styles.input, { height: 80 }]} placeholder="Notes..." multiline value={notes} onChangeText={setNotes} />
      </View>
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}><Text style={styles.submitText}>Submit Report</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: { backgroundColor: colors.background, flex: 1 },
  container: { padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', color: colors.primary, marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 10, marginBottom: 15 },
  photoBtn: { backgroundColor: colors.primaryLight, padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  photoText: { color: colors.primary, fontWeight: 'bold' },
  preview: { width: '100%', height: 150, borderRadius: 10, marginBottom: 10 },
  submitBtn: { backgroundColor: colors.success, padding: 18, borderRadius: 10, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: 'bold' }
});