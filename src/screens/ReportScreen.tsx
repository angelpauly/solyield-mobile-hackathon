import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  Image 
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { saveReport } from "../utils/reportStorage";
import { colors } from "../theme/colors";
import { Report } from "../types/report"; // Importing the type to ensure compatibility

export default function ReportScreen({ route, navigation }: any) {
  const { site } = route.params;
  const [energyGenerated, setEnergyGenerated] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "We need camera access to document issues.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!energyGenerated) {
      Alert.alert("Validation Error", "Please enter the energy generated value.");
      return;
    }

    // Creating the report object to perfectly match the 'Report' type
    const newReport: Report = {
      id: Date.now().toString(),
      siteId: site.id,
      siteName: site.name,
      date: new Date().toISOString(),
      energyGenerated: Number(energyGenerated),
      inverterStatus: "Operational", // Default required field
      panelCondition: photo ? "Damaged" : "Good", // Logic based on if a photo was taken
      issueType: "None", // Default required field
      notes: notes,
      locationVerified: true, // Set to true as they passed the CheckIn screen
    };

    try {
      await saveReport(newReport);
      Alert.alert(
        "Report Submitted", 
        "Data has been saved locally. It will sync when you're back online.",
        [{ text: "OK", onPress: () => navigation.popToTop() }]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to save the report locally.");
    }
  };

  return (
    <ScrollView style={styles.background} contentContainerStyle={styles.container}>
      <Text style={styles.header}>Field Inspection Report</Text>
      <Text style={styles.siteLabel}>Site: {site.name}</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Energy Generated (kWh)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. 450.5" 
          keyboardType="numeric"
          value={energyGenerated}
          onChangeText={setEnergyGenerated}
        />

        <Text style={styles.label}>Visual Evidence</Text>
        <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
          <Text style={styles.photoButtonText}>
            {photo ? "📸 Change Photo" : "📸 Take Photo of Issue"}
          </Text>
        </TouchableOpacity>
        
        {photo && (
          <Image source={{ uri: photo }} style={styles.previewImage} />
        )}

        <Text style={styles.label}>Observations & Notes</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Describe any anomalies or cleaning requirements..." 
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Offline Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background,
  },
  container: { 
    padding: 20 
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: colors.primary,
    marginBottom: 5 
  },
  siteLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: colors.textPrimary,
  },
  input: { 
    borderWidth: 1, 
    borderColor: colors.border, 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 20,
    backgroundColor: '#FAFAFA'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  photoButton: { 
    backgroundColor: colors.primaryLight, 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  photoButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButton: { 
    backgroundColor: colors.success, 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16 
  }
});