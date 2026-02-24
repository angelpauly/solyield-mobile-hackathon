import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import screens
import AgendaScreen from "../screens/AgendaScreen";
import CheckInScreen from "../screens/CheckInScreen";
import MapScreen from "../screens/MapScreen";
import ReportScreen from "../screens/ReportScreen";

export type RootStackParamList = {
  Agenda: undefined;
  CheckIn: { site: any };
  Map: { site: any };
  Report: { site: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Agenda">
        <Stack.Screen name="Agenda" component={AgendaScreen} options={{ title: "Today's Tasks" }} />
        <Stack.Screen name="CheckIn" component={CheckInScreen} options={{ title: "Check In" }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: "Navigation" }} />
        <Stack.Screen name="Report" component={ReportScreen} options={{ title: "Field Report" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}