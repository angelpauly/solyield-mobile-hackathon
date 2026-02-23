import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AgendaScreen from "../screens/AgendaScreen";
import CheckInScreen from "../screens/CheckInScreen";
import MapScreen from "../screens/MapScreen";
import ReportScreen from "../screens/ReportScreen";

export type RootStackParamList = {
  Agenda: undefined;
  CheckIn: { siteId: string };
  //Map: undefined;
  Map: { site: any };
  Report: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Agenda" component={AgendaScreen} />
      <Stack.Screen name="CheckIn" component={CheckInScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
    </Stack.Navigator>
  );
}