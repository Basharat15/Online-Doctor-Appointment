import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';

import DoctorAcceptedAppointmentsScreen,{ScreenOptions as DoctorAcceptedAppointmentsScreenOptions} from '../screens/doctor/DoctorAcceptedAppointmentsScreen';

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }
     const DoctorAcceptedAppointmentsStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="Doctor Accepted"
                component={DoctorAcceptedAppointmentsScreen}
                options={DoctorAcceptedAppointmentsScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default DoctorAcceptedAppointmentsStack;