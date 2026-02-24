import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
      <Stack.Navigator>
        <Stack.Screen name="Agenda" component={AgendaScreen} />
        <Stack.Screen name="CheckIn" component={CheckInScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}