# SolYield - Field Inspection & Analytics Platform

 Level 1 - Solar Field Operations

## 🚀 Overview
SolYield is a high-performance mobile application designed for solar plant technicians. It streamlines the inspection process by combining GPS-verified check-ins, interactive site navigation, and dynamic PDF reporting with real-time performance analytics.

## Features (Level 1 Requirements)

### 🗓️ 1.1 The Day's Agenda
- Implemented a **"My Visits"** screen providing a unified view of the technician's daily schedule.
- Includes a demo-friendly **Reset** feature to clear visit data for live presentations.

### 📍 1.2 "I'm Here!" Check-in
- **Geofencing Verification:** The app captures live GPS coordinates using `expo-location`.
- **Validation:** Arrival is only permitted if the technician is within a **500m radius** of the assigned solar farm.

### 🗺️ 1.3 Site Navigation
- **Native Maps:** Utilizes `react-native-maps` for a smooth, native experience.
- **Interactive Callouts:** Tapping a site marker displays specific site details.
- **Google Maps Integration:** Deep-link navigation allows technicians to launch the Google Maps app directly for turn-by-turn directions.

### 📊 1.4 The Report Card (Boss Level)
- **Dynamic Analytics:** Generates professional PDF reports featuring:
  - **Daily Generation Bar Chart:** Compares current output against historical averages.
  - **Performance Pie Chart:** A health index dynamically calculated from input voltage.
- **Digital Evidence:** Embeds inspection photos directly into the PDF using Base64 encoding.
- **Technician Identity:** All reports are digitally signed and timestamped by **Angel**.

---

## 🛠️ Technical Stack
- **Framework:** React Native / Expo
- **Language:** TypeScript
- **State Management:** React Hooks
- **Persistence:** AsyncStorage (Offline-First)
- **Tooling:** `expo-print`, `expo-sharing`, `expo-location`, `react-native-maps`

---

## ⚙️ Setup & Installation
To run this project locally, ensure you have the [Expo Go](https://expo.dev/go) app on your mobile device.

1. Clone the repository:
   ```bash
   git clone <your-repo-link>
2. npm install
3. npx expo start