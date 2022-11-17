import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import DoctorAuthScreen , {ScreenOptions as DoctorAuthScreenOptions} from '../screens/doctor/DoctorAuthScreen';
import PatientAuthScreen , {ScreenOptions as PatientAuthScreenOptions} from '../screens/patient/PatientAuthScreen';

import SignUp, {ScreenOptions as DoctorSignupScreenOptions}  from '../screens/doctor/SignUp';
import PatientSignUp, {ScreenOptions as PatientSignupScreenOptions}  from '../screens/patient/SignUp';
import Start , {ScreenOptions as StartScreenOptions}from '../screens/Start';

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const DoctorAuthStack = () =>{
       return(
              <Stack.Navigator >
              <Stack.Screen
              name="Doctor/Patient"
              component={Start}
              options={StartScreenOptions}
              />
              <Stack.Screen
                name="Doctor Authentication"
                component={DoctorAuthScreen}
                options={DoctorAuthScreenOptions}
              />
                <Stack.Screen
                name="Doctor Signup"
                component={SignUp}
                options={DoctorSignupScreenOptions}
              />
              <Stack.Screen
              name="Patient Authentication"
              component={PatientAuthScreen}
              options={PatientAuthScreenOptions}
              />
           <Stack.Screen
                name="Patient Signup"
                component={PatientSignUp}
                options={PatientSignupScreenOptions}
              />


            </Stack.Navigator>
       )
};

export default DoctorAuthStack;