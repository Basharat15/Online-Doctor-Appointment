import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DoctorDetailsScreen , {ScreenOptions as  DoctorDetailsScreenOptions } from '../screens/patient/DoctorDetailsScreen';
import DoctorsOverviewScreen , {ScreenOptions as DoctorsOverviewScreenOptions}from '../screens/patient/DoctorsOverviewScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const DoctorsOverviewStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="DoctorsOverview"
                component={DoctorsOverviewScreen}
                options={DoctorsOverviewScreenOptions}
              />
              <Stack.Screen
                name="DoctorDetails"
                component={DoctorDetailsScreen}
                options={DoctorDetailsScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default DoctorsOverviewStack;