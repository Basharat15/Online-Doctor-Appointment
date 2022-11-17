import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import DoctorProfileScreen , {ScreenOptions as DoctorProfileScreenOptions} from '../screens/doctor/DoctorProfileScreen';
import EditProfileScreen , {ScreenOptions as EditProfileScreenOptions} from '../screens/doctor/EditProfileScreen';
import DoctorsOverviewStack from './DoctorsOverviewStack';
import DoctorProfileStack from './DoctorProfileStack';
import { useDispatch } from 'react-redux';
import * as doctorAuthActions from '../store/actions/DoctorAuthAction'
import PatientAuthStack from './PatientAuthStack';
import DoctorAppointmentsStack from './DoctorAppointmentsStack';
import DoctorAcceptedAppointmentsStack from './DoctorAcceptedAppointmentsStack';
const DoctorDrawerStackNavigator = createDrawerNavigator();

const DoctorNavigator = () => {
  const dispatch= useDispatch();
       return(
              <DoctorDrawerStackNavigator.Navigator
              drawerContent={props => {
                return (
                  <View style={{ flex: 1, paddingTop: 45 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                      <DrawerItemList {...props} />
                      <Button
                        title="Logout"
                        color={Colors.accent}
                        onPress={() => {
                          dispatch(doctorAuthActions.Logout());
                          // props.navigation.navigate('Doctor Authentication');
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
              <DoctorDrawerStackNavigator.Screen
              name="Your Profile"
              component={DoctorProfileStack}
              options={{
                drawerIcon: ({ focused }) => (
                  <Ionicons name={'person'} size={focused ? 25 : 20} color={focused ? 'black' : 'gray'} />
                ),
                headerShown: false,
                drawerActiveTintColor: 'black',
                drawerActiveBackgroundColor: Colors.primary
              }}
              />
              <DoctorDrawerStackNavigator.Screen
              name="Your Appointments"
              component={DoctorAppointmentsStack}
              options={{
                drawerIcon: ({ focused }) => (
                  <Ionicons name={'people'} size={focused ? 25 : 20} color={focused ? 'black' : 'gray'} />
                ),
                headerShown: false,
                drawerActiveTintColor: 'black',
                drawerActiveBackgroundColor: Colors.primary
              }}
              />
              <DoctorDrawerStackNavigator.Screen
              name="Accepted Appointments"
              component={DoctorAcceptedAppointmentsStack}
              options={{
                drawerIcon: ({ focused }) => (
                  <Ionicons name={'paper-plane'} size={focused ? 25 : 20} color={focused ? 'black' : 'gray'} />
                ),
                headerShown: false,
                drawerActiveTintColor: 'black',
                drawerActiveBackgroundColor: Colors.primary
              }}
              />
              </DoctorDrawerStackNavigator.Navigator>
       )
};

export default DoctorNavigator;
// const defaultNavOptions = {
//        headerStyle: {
//          backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
//        },
//        headerTitleStyle: {
//          fontFamily: 'open-sans-bold'
//        },
//        headerBackTitleStyle: {
//          fontFamily: 'open-sans'
//        },
//        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
//      };

// const AdminStackNavigator = createStackNavigator();

// export const AdminNavigator = () => {
//        return (
//               <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
//                 <AdminStackNavigator.Screen
//                 name="DoctorProfile"
//                 component={DoctorProfileScreen}
//                 options={DoctorProfileScreenOptions}
//                 />
//                 <AdminStackNavigator.Screen
//                 name="EditProfile"
//                 component={EditProfileScreen}
//                 options={EditProfileScreenOptions}
//                 />
//               </AdminStackNavigator.Navigator>
//             );
// };