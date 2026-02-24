import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system'; //
import { getReports } from "../utils/reportStorage";
import { colors } from "../theme/colors";

export default function ViewReportScreen({ route }: any) {
  const { siteId } = route.params;
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const all = await getReports();
      const found = all.find((r: any) => r.siteId === siteId);
      setReport(found);
    };
    load();
  }, [siteId]);

  const generateLevel1PDF = async () => {
    if (!report) return;

    let photoBase64 = "";
    
    // CRITICAL FIX: Ensure we use 'report.photo' exactly as saved
    if (report.photo) {
      try {
        const base64 = await FileSystem.readAsStringAsync(report.photo, { 
          encoding: 'base64' 
        });
        photoBase64 = `data:image/jpeg;base64,${base64}`;
      } catch (e) {
        console.warn("Photo conversion failed. Check if URI is valid:", report.photo);
      }
    }

    const energy = report.energyGenerated || 0;
    const voltage = report.voltage || 0;
    const efficiency = Math.min((voltage / 240) * 100, 100).toFixed(0);
    const barHeight = Math.min((energy / 600) * 100, 100);
    const timestamp = new Date().toLocaleString();

    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            .header { border-bottom: 3px solid ${colors.primary}; padding-bottom: 10px; margin-bottom: 20px; }
            .chart-row { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .bar-container { display: flex; align-items: flex-end; height: 100px; border-left: 2px solid #333; border-bottom: 2px solid #333; padding: 10px; }
            .pie-chart { width: 100px; height: 100px; border-radius: 50%; background: conic-gradient(${colors.success} ${efficiency}%, #ff4444 0); border: 2px solid #fff; box-shadow: 0 0 5px rgba(0,0,0,0.1); }
            .evidence-img { width: 100%; max-height: 300px; border-radius: 10px; margin-top: 20px; object-fit: cover; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="color: ${colors.primary}; margin: 0;">SolYield Analytics Report</h1>
            <p style="font-size: 12px; color: #666;">Technician: Angel | Site: ${report.siteName} | ${timestamp}</p>
          </div>

          <div class="chart-row">
            <div style="flex: 1;">
              <h3 style="font-size: 14px;">Daily Generation (kWh)</h3>
              <div class="bar-container">
                <div style="background: #eee; width: 30px; height: 50%; margin-right: 15px;"></div>
                <div style="background: ${colors.success}; width: 30px; height: ${barHeight}%; position: relative;">
                  <span style="position: absolute; top: -15px; font-size: 9px; font-weight: bold;">${energy}</span>
                </div>
              </div>
            </div>
            <div style="flex: 1; text-align: center;">
              <h3 style="font-size: 14px;">System Health (${efficiency}%)</h3>
              <div class="pie-chart" style="margin: 0 auto;"></div>
            </div>
          </div>

          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            <p><strong>Voltage:</strong> ${voltage}V | <strong>Status:</strong> ${report.inverterStatus}</p>
            <p><strong>Notes:</strong> ${report.notes || "No notes provided."}</p>
          </div>

          ${photoBase64 ? `
            <h3 style="margin-top: 20px;">Inspection Evidence</h3>
            <img src="${photoBase64}" class="evidence-img" />
          ` : `<p style="color: red; margin-top: 20px;">(No photo attached to this report)</p>`}

          <p style="margin-top: 40px; text-align: center; color: ${colors.primary}; font-weight: bold;">Digitally Verified by Angel</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert("Error", "Could not generate PDF.");
    }
  };

  if (!report) return <View style={styles.container}><Text>Loading Report...</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{report.siteName}</Text>
        <Text style={styles.data}>⚡ {report.energyGenerated} kWh | 🔌 {report.voltage} V</Text>
        
        <View style={styles.barBox}>
          <View style={[styles.bar, { height: `${Math.min((report.energyGenerated/600)*100, 100)}%`, backgroundColor: colors.success }]}>
            <Text style={styles.barT}>{report.energyGenerated}</Text>
          </View>
        </View>

        <Text style={styles.notes}>{report.notes}</Text>
      </View>
      <TouchableOpacity style={styles.pdfBtn} onPress={generateLevel1PDF}>
        <Text style={styles.pdfBtnText}>📄 Export Boss Level PDF Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  card: { backgroundColor: '#fff', padding: 25, borderRadius: 20, elevation: 5 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.primary, marginBottom: 15 },
  data: { fontSize: 16, marginBottom: 10, fontWeight: '600' },
  barBox: { height: 100, borderBottomWidth: 2, borderColor: '#333', justifyContent: 'flex-end', paddingHorizontal: 20, marginTop: 10 },
  bar: { width: 35, borderTopLeftRadius: 5, borderTopRightRadius: 5, alignItems: 'center', justifyContent: 'center' },
  barT: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  notes: { fontStyle: 'italic', marginTop: 20, color: '#666' },
  pdfBtn: { backgroundColor: colors.primary, padding: 18, borderRadius: 15, marginTop: 30, alignItems: 'center' },
  pdfBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});