import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, FlatList, ImageBackground, Text, Button, ActivityIndicator, StyleSheet, Modal, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import * as AppointmentActions from '../../store/actions/AppointmentAction';
import PatientAppointmentItem from '../../components/patient/PatientAppointmentItem';
import DoctorItemButton from '../../components/UI/DoctorItemButton';
const AppointmentsScreen = props => {
       const [isLoading, setIsLoading] = useState(false);
       const [isRefreshing, setIsRefreshing] = useState(false);
       const [error, setError] = useState();
       const dispatch = useDispatch();
       const appointments = useSelector(state => state.bookAppointment.appointments);
      

       const deleteProfileHandler = (Id) =>{
              Alert.alert('Are you sure?','Do you really want to cancel your appointment?', [
                {text:'No',style:'default'},
                {text:'Yes',style:'destructive', onPress: () => {
                  dispatch(AppointmentActions.deleteAppointment(Id))
                  loadedAppointments();
              }}
              ])
            };
            const loadedAppointments = useCallback(async () => {

              setError(null);
              setIsRefreshing(true);
              try {
                     await dispatch(AppointmentActions.fetchAppointments());
              } catch (err) {
                     setError(err.message);
              }
              setIsRefreshing(false);
       }, [dispatch, setIsLoading, setError]);

       useEffect(() => {
              const willFocusSub = props.navigation.addListener('willFocus', loadedAppointments)

              return () => {
                     willFocusSub.remove();
              }
       }, [loadedAppointments]);
       useEffect(() => {
              setIsLoading(true);
              loadedAppointments().then(() => {
                     setIsLoading(false);
              })
       }, [dispatch, loadedAppointments]);


       if (isLoading) {
              return (
                     <View style={styles.centered}>
                            <ActivityIndicator size="large" color={Colors.primary} />
                     </View>
              );
       }

       if (!isRefreshing && appointments.length === 0) {
              return (
                     <View style={styles.centered}>
                     <ImageBackground
                     source={{uri:'https://images.unsplash.com/photo-1638202993928-7267aad84c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'}}
                     style={{width:'100%' ,height:'100%'}}
                     >
                   <View style={styles.emptyTextView}>
                     <Text style={styles.emptyText}>You don't have any appointment yet!
                          Please book appointment now to continue!
                   </Text>
                   </View>
                   </ImageBackground>
                  
            </View>
              );
       }
       return (
              <View style={styles.screen}>
              <FlatList
                     onRefresh={loadedAppointments}
                     refreshing={isRefreshing}
                     data={appointments}
                     keyExtractor={item => item.Id}
                     renderItem={itemData => (
                     <PatientAppointmentItem
                                   docOwnerId={itemData.item.docOwnerId}
                                   docTitle={itemData.item.docTitle}
                                   docCategory={itemData.item.docCategory}
                                   docImageUrl={itemData.item.docImageUrl}
                                   name={itemData.item.name}
                                   age={itemData.item.age}
                                   problem={itemData.item.problem}
                                   phoneNum={itemData.item.phoneNum}
                                   time={itemData.item.time}
                                   date={itemData.item.readableDate}
                            >
                     <DoctorItemButton
                         onPress={() => {
                            deleteProfileHandler(itemData.item.Id)
                        }}
            >
                      Cancel
                     </DoctorItemButton>


                     </PatientAppointmentItem>

                     )}
              />
              
              </View>
       )
};
//Navigation declaration
export const ScreenOptions = navData => {
       return {

              headerTitle: 'Requested Appointments',
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
              },
              headerTitleStyle: {
              },
              headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        
              headerLeft: () => {
                     return (
                         <HeaderButtons HeaderButtonComponent={HeaderButton}>
                             <Item
                                 title="Menu"
                                 iconName={Platform.OS === 'android' ? 'menu' : 'menu'}
                                 onPress={() => {
                                     navData.navigation.toggleDrawer();
                                 }}
                             />
                         </HeaderButtons>
                     )
                                
        }
        
            }
}

const styles = StyleSheet.create({

       screen: {
              flex: 1,
              // justifyContent: 'center',
              // alignItems: 'center'
       },
       centered:{
              flex:1,
              alignItems:'center',
              justifyContent:'center',

       },
       emptyTextView:
       {
              flex:1,
              alignItems:'center',
              justifyContent:'center'

       },
       emptyText:{
              padding:20,
              fontFamily:'RobotoBold',
              color:Colors.primary,
              fontSize:18
              
            
       },
     
});

export default AppointmentsScreen;