import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import PatientAcceptedAppointmentsScreen, {ScreenOptions as PatientAcceptedAppointmentsScreenOptions}from '../screens/patient/PatientAcceptedAppointmentsScreen';

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }
     const PatientAcceptedAppointmentsStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="Patient Accepted"
                component={PatientAcceptedAppointmentsScreen}
                options={PatientAcceptedAppointmentsScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default PatientAcceptedAppointmentsStack;