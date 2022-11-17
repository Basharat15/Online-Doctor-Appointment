import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import DoctorAppointmentsScreen,{ScreenOptions as DoctorAppointmentsScreenOptions} from '../screens/doctor/DoctorAppointmentsScreen';

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }
     const DoctorAppointmentsStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="DoctorAppointments"
                component={DoctorAppointmentsScreen}
                options={DoctorAppointmentsScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default DoctorAppointmentsStack;