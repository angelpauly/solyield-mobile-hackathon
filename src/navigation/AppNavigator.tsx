import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AgendaScreen from "../screens/AgendaScreen";
import CheckInScreen from "../screens/CheckInScreen";
import MapScreen from "../screens/MapScreen";
import ReportScreen from "../screens/ReportScreen";
import ViewReportScreen from "../screens/ViewReportScreen";

export type RootStackParamList = {
  Agenda: undefined;
  CheckIn: { site: any };
  Map: { site: any };
  Report: { site: any };
  ViewReport: { siteId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Agenda">
        <Stack.Screen name="Agenda" component={AgendaScreen} options={{ title: "SolYield Agenda" }} />
        <Stack.Screen name="CheckIn" component={CheckInScreen} options={{ title: "Verification" }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: "Site Navigation" }} />
        <Stack.Screen name="Report" component={ReportScreen} options={{ title: "Field Inspection" }} />
        <Stack.Screen name="ViewReport" component={ViewReportScreen} options={{ title: "Inspection Summary" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}