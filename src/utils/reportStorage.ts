import AsyncStorage from "@react-native-async-storage/async-storage";
import { Report } from "../types/report";

const STORAGE_KEY = "SOLAR_REPORTS";

export const saveReport = async (report: Report) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const reports: Report[] = existing ? JSON.parse(existing) : [];

    reports.push(report);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (error) {
    console.error("Error saving report:", error);
  }
};

export const getReports = async (): Promise<Report[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error fetching reports:", error);
    return [];
  }
};