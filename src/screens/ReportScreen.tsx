import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { saveReport } from "../utils/reportStorage";
import { Report } from "../types/report";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Report">;

export default function ReportScreen({ route, navigation }: Props) {
  const { site } = route.params;

  const [energyGenerated, setEnergyGenerated] = useState("");
  const [inverterStatus, setInverterStatus] =
    useState<Report["inverterStatus"]>("Operational");
  const [panelCondition, setPanelCondition] =
    useState<Report["panelCondition"]>("Good");
  const [issueType, setIssueType] =
    useState<Report["issueType"]>("None");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    if (!energyGenerated) {
      Alert.alert("Validation", "Please enter energy generated.");
      return;
    }

    const newReport: Report = {
      id: Date.now().toString(),
      siteId: site.id,
      siteName: site.name,
      date: new Date().toISOString(),
      energyGenerated: Number(energyGenerated),
      inverterStatus,
      panelCondition,
      issueType,
      notes,
      locationVerified: true,
    };

    await saveReport(newReport);

    Alert.alert("Success", "Report submitted successfully.");
    navigation.navigate("Agenda");
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>Field Inspection Report</Text>

      {/* Site Info Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Site Information</Text>

        <Text style={styles.label}>Site Name</Text>
        <Text style={styles.readOnly}>{site.name}</Text>

        <Text style={styles.label}>Date</Text>
        <Text style={styles.readOnly}>
          {new Date().toLocaleDateString()}
        </Text>
      </View>

      {/* Performance Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Performance Metrics</Text>

        <Text style={styles.label}>Energy Generated (kWh)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={energyGenerated}
          onChangeText={setEnergyGenerated}
          placeholder="Enter energy generated"
        />

        <Text style={styles.label}>Inverter Status</Text>
        {["Operational", "Minor Fault", "Critical Fault"].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.option,
              inverterStatus === status && styles.selected,
            ]}
            onPress={() =>
              setInverterStatus(status as Report["inverterStatus"])
            }
          >
            <Text
              style={
                inverterStatus === status
                  ? styles.selectedText
                  : styles.optionText
              }
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Panel Condition</Text>
        {["Good", "Dusty", "Damaged"].map((condition) => (
          <TouchableOpacity
            key={condition}
            style={[
              styles.option,
              panelCondition === condition && styles.selected,
            ]}
            onPress={() =>
              setPanelCondition(condition as Report["panelCondition"])
            }
          >
            <Text
              style={
                panelCondition === condition
                  ? styles.selectedText
                  : styles.optionText
              }
            >
              {condition}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Issues Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Issue Assessment</Text>

        {[
          "None",
          "Cleaning Required",
          "Electrical Fault",
          "Structural Issue",
        ].map((issue) => (
          <TouchableOpacity
            key={issue}
            style={[
              styles.option,
              issueType === issue && styles.selected,
            ]}
            onPress={() =>
              setIssueType(issue as Report["issueType"])
            }
          >
            <Text
              style={
                issueType === issue
                  ? styles.selectedText
                  : styles.optionText
              }
            >
              {issue}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Observations</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          value={notes}
          onChangeText={setNotes}
          placeholder="Enter inspection notes"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.textPrimary,
  },
  card: {
    backgroundColor: colors.card,
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: colors.primary,
  },
  label: {
    marginTop: 12,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  readOnly: {
    marginTop: 4,
    color: colors.textSecondary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
    backgroundColor: "#fff",
  },
  option: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    marginTop: 8,
  },
  optionText: {
    color: colors.textPrimary,
  },
  selected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  selectedText: {
    color: colors.primary,
    fontWeight: "600",
  },
  button: {
    marginTop: 10,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});