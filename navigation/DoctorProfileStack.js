import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import DoctorProfileScreen , {ScreenOptions as DoctorProfileScreenOptions} from '../screens/doctor/DoctorProfileScreen';
import EditProfileScreen , {ScreenOptions as EditProfileScreenOptions} from '../screens/doctor/EditProfileScreen';

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }
     const DoctorProfileStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="DoctorProfile"
                component={DoctorProfileScreen}
                options={DoctorProfileScreenOptions}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={EditProfileScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default DoctorProfileStack;