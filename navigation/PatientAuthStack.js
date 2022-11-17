import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import PatientAuthScreen , {ScreenOptions as PatientAuthScreenOptions} from '../screens/patient/PatientAuthScreen';

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const PatientAuthStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="Patient Authentication"
                component={PatientAuthScreen}
                options={PatientAuthScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default PatientAuthStack;