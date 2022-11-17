import * as  React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import DoctorsOverviewStack from './DoctorsOverviewStack';
import AppointmentsStack from './PatientAppointmentsStack';
import Colors from '../constants/Colors';
import DoctorProfileStack from './DoctorProfileStack';
import DoctorAuthStack from './DoctorAuthStack';
import StartStack from './StartStack';
import PatientAuthStack from './PatientAuthStack';
import * as patientAuthActions from '../store/actions/PatientAuthAction';
import * as doctorAuthActions from '../store/actions/DoctorAuthAction';
import { useDispatch } from 'react-redux';
import PatientAcceptedAppointmentsStack from './PatientAcceptedAppointmentsStack';

const PatientDrawerStackNavigator = createDrawerNavigator();

const PatientNavigator = () => {
  const dispatch = useDispatch();
       return(
              <PatientDrawerStackNavigator.Navigator
              drawerContent={props => {
                return (
                  <View style={{ flex: 1, paddingTop: 45 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                      <DrawerItemList {...props} />
                      <Button
                        title="Logout"
                        color={Colors.accent}
                        onPress={() => {
                          dispatch(patientAuthActions.Logout());
                          // props.navigation.navigate('Patient Authentication');
                        }}
                      />
                    </SafeAreaView>
                  </View>
                );
              }}
              drawerContentOptions={{
                activeTintColor: Colors.primary
              }}
              >
                <PatientDrawerStackNavigator.Screen
                name="All Doctors"
                component={DoctorsOverviewStack}
                options={{
                  drawerIcon: ({ focused }) => (
                    <Ionicons name={'person-add'} size={focused ? 25 : 20} color={focused ? 'black' : 'gray'} />
                  ),
                  headerShown: false,
                  drawerActiveTintColor: 'black',
                  drawerActiveBackgroundColor: Colors.primary
                }}
                />

                <PatientDrawerStackNavigator.Screen
                name="Your Appointments"
                component={AppointmentsStack}
                options={{
                  drawerIcon: ({ focused }) => (
                    <Ionicons name={'people'} size={focused ? 25 : 20} color={focused ? 'black' : 'gray'} />
                  ),
                  headerShown: false,
                  drawerActiveTintColor: 'black',
                  drawerActiveBackgroundColor: Colors.primary
                }}
                />
                <PatientDrawerStackNavigator.Screen
                name="Booked Appointments"
                component={PatientAcceptedAppointmentsStack}
                options={{
                  drawerIcon: ({ focused }) => (
                    <Ionicons name={'paper-plane'} size={focused ? 25 : 20} color={focused ? 'black' : 'gray'} />
                  ),
                  headerShown: false,
                  drawerActiveTintColor: 'black',
                  drawerActiveBackgroundColor: Colors.primary
                }}
                />
              </PatientDrawerStackNavigator.Navigator>
              
)
};

export default PatientNavigator;

// const PatientsDrawerStackNavigator = createDrawerNavigator()

// const DoctorsNavigator = () => {

//        return(
//              <PatientsDrawerStackNavigator.Navigator>
              {/* <PatientsDrawerStackNavigator.Screen
              name="Start "
              component={StartStack}
              options={{
                drawerIcon: ({ focused }) => (
                  <Ionicons name={'gift-sharp'} size={focused ? 25 : 20} color={focused ? 'black' : 'gray'} />
                ),
                headerShown: false,
                drawerActiveTintColor: 'black',
                drawerActiveBackgroundColor: Colors.primary
              }}
              
            />
                    <PatientsDrawerStackNavigator.Screen
              name="Patient Auth"
              component={PatientAuthStack}
              options={{
                drawerIcon: ({ focused }) => (
                  <Ionicons name={'gift-sharp'} size={focused ? 25 : 20} color={focused ? 'black' : 'gray'} />
                ),
                headerShown: false,
                drawerActiveTintColor: 'black',
                drawerActiveBackgroundColor: Colors.primary
              }}
              
            /> */}
{/* <PatientsDrawerStackNavigator.Screen
              name="Doc Auth"
              component={DoctorAuthStack}
              options={{
                drawerIcon: ({ focused }) => (
                  <Ionicons name={'gift-sharp'} size={focused ? 25 : 20} color={focused ? 'black' : 'gray'} />
                ),
                headerShown: false,
                drawerActiveTintColor: 'black',
                drawerActiveBackgroundColor: Colors.primary
              }}
              
            />
      
              <PatientsDrawerStackNavigator.Screen
              name="All Doctors"
              component={DoctorsOverviewStack}
              options={{
                drawerIcon: ({ focused }) => (
                  <Ionicons name={'gift-sharp'} size={focused ? 25 : 20} color={focused ? 'black' : 'gray'} />
                ),
                headerShown: false,
                drawerActiveTintColor: 'black',
                drawerActiveBackgroundColor: Colors.primary
              }}
              
            />
      
            <PatientsDrawerStackNavigator.Screen
              name="Your Appointments"
              component={AppointmentsStack}
              options={{
                drawerIcon: ({ focused }) => (
                  <Ionicons name={'gift-sharp'} size={focused ? 25 : 20} color={focused ? 'black' : 'gray'} />
                ),
                headerShown: false,
                drawerActiveTintColor: 'black',
                drawerActiveBackgroundColor: Colors.primary
              }}
              
            />
            <PatientsDrawerStackNavigator.Screen
              name="Booked Appointments"
              component={BookedAppointmentsStack}
              options={{
                drawerIcon: ({ focused }) => (
                  <Ionicons name={'gift-sharp'} size={focused ? 25 : 20} color={focused ? 'black' : 'gray'} />
                ),
                headerShown: false,
                drawerActiveTintColor: 'black',
                drawerActiveBackgroundColor: Colors.primary
              }}
              
            />
            <PatientsDrawerStackNavigator.Screen
              name="Admin"
              component={DoctorProfileStack}
              options={{
                drawerIcon: ({ focused }) => (
                  <Ionicons name={'gift-sharp'} size={focused ? 25 : 20} color={focused ? 'black' : 'gray'} />
                ),
                headerShown: false,
                drawerActiveTintColor: 'black',
                drawerActiveBackgroundColor: Colors.primary
              }}
              
            />
            </PatientsDrawerStackNavigator.Navigator>
       )

};

export default DoctorsNavigator; */}