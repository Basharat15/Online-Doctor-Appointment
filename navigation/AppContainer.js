import React from 'react';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import DoctorAuthStack from './DoctorAuthStack';
import DoctorStartupScreen from '../screens/doctor/DoctorStartupScreen';
import PatientStartupScreen from '../screens/patient/PatientStartupScreen';
import DoctorProfileStack from './DoctorProfileStack';
import StartStack from './StartStack';
import DoctorNavigator from './DoctorNavigator';
import PatientNavigator from './PatientNavigator';
import PatientAuthStack from './PatientAuthStack';


const AppContainer = () =>{
       const doctorIsAuth = useSelector(state => !!state.doctorAuth.token);
       const doctordidTryAutoLogin = useSelector(state=>!!state.doctorAuth.didTryAutoLogin);
       const patientIsAuth =  useSelector(state => !!state.patientAuth.token);
       const patientdidTryAutoLogin = useSelector(state => !!state.patientAuth.didTryAutoLogin); 
       
       return(
              <NavigationContainer>   
                     {!doctorIsAuth && !patientIsAuth && <DoctorAuthStack/> }
                     {!patientIsAuth && doctorIsAuth && <DoctorNavigator/>}
                    {!doctorIsAuth && patientIsAuth && <PatientNavigator/>}
 {/* {patientIsAuth && <PatientNavigator/> }
 {!patientIsAuth && patientdidTryAutoLogin && <PatientAuthStack/>}
 {!patientIsAuth && !patientdidTryAutoLogin && <PatientStartupScreen/>} 
  
{doctorIsAuth && <DoctorNavigator/>}  
 {!doctorIsAuth && doctordidTryAutoLogin && <DoctorAuthStack/>}
{!doctorIsAuth && !doctordidTryAutoLogin && <DoctorStartupScreen/>}   */}

              {/* {!patientIsAuth && !doctorIsAuth  && <StartStack/>} 
              {!doctorIsAuth  &&  patientIsAuth && <PatientNavigator/> }
              {!doctorIsAuth  && !patientIsAuth  &&  patientdidTryAutoLogin && <PatientAuthStack/>}
              {!doctorIsAuth && !patientIsAuth  && !patientdidTryAutoLogin && <PatientStartupScreen/>} 
               {!patientIsAuth && doctorIsAuth   && <DoctorNavigator/>}
              {!patientIsAuth &&!doctorIsAuth   && doctordidTryAutoLogin   && <DoctorAuthStack/>}
              {!patientIsAuth &&!doctorIsAuth   && !doctordidTryAutoLogin  && <DoctorStartupScreen/>}   */}
              </NavigationContainer>
       )
};

export default AppContainer;

