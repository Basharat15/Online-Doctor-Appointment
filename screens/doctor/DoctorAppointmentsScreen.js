import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View,ImageBackground, FlatList, Text, Button, ActivityIndicator, StyleSheet, Modal, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import * as AppointmentActions from '../../store/actions/AppointmentAction';
import * as AcceptedAppointmentActions from '../../store/actions/AcceptedAppointmentsAction';
import DoctorAppointmentItem from '../../components/doctor/DoctorAppointmentItem';
import DoctorItemButton from '../../components/UI/DoctorItemButton';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
       if (action.type === FORM_INPUT_UPDATE) {
         const updatedValues = {
           ...state.inputValues,
           [action.input]: action.value
         };
         const updatedValidities = {
           ...state.inputValidities,
           [action.input]: action.isValid
         };
         let formIsValid = true;
         for (const key in updatedValidities) {
           formIsValid = formIsValid && updatedValidities[key];
         }
         return {
           formIsValid: formIsValid,
           inputValidities: updatedValidities,
           inputValues: updatedValues
         };
       }
       return state;
     }

const DoctorAppointmentsScreen = props => {
       const [isAlert, setIsAlert] = useState(false);
       const [isLoading, setIsLoading] = useState(false);
       const [isRefreshing, setIsRefreshing] = useState(false);
       const [error, setError] = useState();
       const [itemSelected, setItemSelected] = useState('');
       const dispatch = useDispatch();
       const doctorAppointments = useSelector(state => state.bookAppointment.doctorAppointments);
       // const doctors = useSelector(state => state.doctors.availableDoctors);
       const loadedAppointments = useCallback(async () => {

              setError(null);
              setIsRefreshing(true);
              try {
                     await dispatch(AppointmentActions.fetchAppointments());
              } catch (err) {
                     setError(err.message);
              }
              setIsRefreshing(false);
       }, [dispatch]);

       useEffect(() => {
              const willFocusSub = props.navigation.addListener('willFocus', loadedAppointments)

              return () => {
                     willFocusSub.remove();
              }
       }, [loadedAppointments]);

       // const doctorAppointments = useSelector(state => {
       //        const transformedDoctorAppointments = [];
       //        for (const key in state.bookAppointment.appointments) {
       //               transformedDoctorAppointments.push({
       //                      doctorId: key,
       //                      doctorTitle: state.bookAppointment.appointments[key].doctorTitle,
       //                      doctorCategory: state.bookAppointment.appointments[key].doctorCategory
       //               })
       //        }
       //        return transformedDoctorAppointments;
       // });


            
  const [formState, dispatchFormState] = useReducer(formReducer, {
       inputValues: {
         appToken: '',
         time: ''
       },
       inputValidities: {
         appToken: false,
         time: false,
       },
       formIsValid: false
     });
     const inputChangeHandler = useCallback((
       inputIdentifier, inputValue, inputValidity) => {
   
       dispatchFormState({
         type: FORM_INPUT_UPDATE,
         value: inputValue,
         isValid: inputValidity,
         input: inputIdentifier
       });
     }, [dispatchFormState]);
   
     useEffect(()=>{
       if(error){
           Alert.alert('An error accured!',error,[{ text:'Okay' }])
       }
     },[error]);
      //Submit Function
      const submitFunction = useCallback( async() =>{
       if(!formState.formIsValid){
         Alert.alert("Wrong Input","Please check the errors in the form",
         [
          {text:'OK'}
         ]);
         return;
       }
       setError(null);
       setIsLoading(true);
      try {
         await dispatch(AcceptedAppointmentActions.acceptedAppointment(
            itemSelected.docOwnerId,
            itemSelected.ownerId,
            itemSelected.name,
            itemSelected.docTitle,
            formState.inputValues.appToken, 
            formState.inputValues.time,)
          );
   
      } catch(err){
       setError(err.message);
      }
     setIsLoading(false);
     setIsAlert(false)
     },[formState, dispatch]);

     useEffect(() => {
       if (error) {
           setIsAlert(true)
       }
   }, [error])

       const deleteProfileHandler = (Id) => {
              Alert.alert('Are you sure?', 'Do you really want to cancel the appointment?', [
                     { text: 'No', style: 'default' },
                     {
                            text: 'Yes', style: 'destructive', onPress: () => {
                                   dispatch(AppointmentActions.deleteDoctorAppointment(Id))
                                   loadedAppointments();
                            }
                     }
              ])
       };
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

       if (!isRefreshing && doctorAppointments.length === 0) {
              return (
                   
                     <View style={styles.centered}>
                              <ImageBackground
                              source={{uri:'https://images.unsplash.com/photo-1638202993928-7267aad84c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'}}
                              style={{width:'100%' ,height:'100%'}}
                              >
                            <View style={styles.emptyTextView}>
                              <Text style={styles.emptyText}>You don't have any appointment yet!
                                   Please update your Profile...
                            </Text>
                            </View>
                            </ImageBackground>
                           
                     </View>
              );
       }
       return (

              <View style={styles.screen}>
        <Modal visible={isAlert}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
            setIsAlert(false)
        }}
    >
        <View style={styles.centerView}>
            <ScrollView>
                <Card style={styles.AuthContainer}>
                    <ScrollView>
                        <View style={styles.useInfo}>
                            <Text style={styles.useInfoText}>Accept Appointment</Text>
                        </View>

                        <Input
                            id='appToken'
                            label="Token"
                            errorText='Please enter patient appointment number!!'
                            keyboardType='default'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='Please Enter patient appointment number!'
                            initialValue=''
                            onInputChange={inputChangeHandler}
                            required
                            maxLenth={3}
                            minLength={1}
                        />
                        <Input
                            id='time'
                            label="Time"
                            errorText='Please enter patient appointment time!'
                            keyboardType='default'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='Please Enter expected appointment timee E.g 12:40pm'
                            initialValue=''
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                            maxLenth={14}
                            minLength={4}
                        />
                        
                        <View style={styles.btnContainer}>
                            <Button
                                title='Submit'
                                color={Colors.primary}
                                onPress={submitFunction}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </ScrollView>
        </View>
    </Modal>
                     <FlatList
                            onRefresh={loadedAppointments}
                            refreshing={isRefreshing}
                            data={doctorAppointments}
                            keyExtractor={item => item.Id}
                            renderItem={itemData => (
                                   <DoctorAppointmentItem
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
                                                 style={styles.declineButton}
                                                 onPress={ () => {
                                                               deleteProfileHandler(itemData.item.Id)
                                                        }
                                                 } >
                                                 Decline
                                          </DoctorItemButton>
                                          <DoctorItemButton
                                                 style={styles.acceptButton}
                                                 disabled={itemSelected===''}
                                                 onPress={
                                                        () => {
                                                               setItemSelected(itemData.item)
                                                               setIsAlert(true)
                                                        }
                                                 }>
                                                 Accept
                                          </DoctorItemButton>
                                          {/* <Button color={Colors.accent}
                            title="Confirm"
                            onPress={() => {
                            // selectItemHandler(itemData.item.id, itemData.item.title);
                             }}
                             />
                      <Button color={Colors.primary}
                            title="Delete"
                            onPress={() => {
                            // setItemSelected(itemData.item)
                            
            
                            }}
                            /> */}
                                   </DoctorAppointmentItem>


                            )}

                     />
              </View>
       )
};
//Navigation declaration
export const ScreenOptions = navData => {

       return {

              
              headerTitle: 'Your Appointments',
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
}}

const styles = StyleSheet.create({

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
              color:Colors.accent,
              fontSize:18
              
            
       },
       screen: {
              flex: 1,

       },
       declineButton: {
              marginRight: '10%'
       },
       acceptButton: {
              marginLeft: '45%'
       },
       centerView: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000099'
          },
       AuthContainer: {
              width: 300,
              height: 350,
              padding: 40,
              marginTop: 100,
              backgroundColor: 'white'
          },
          useInfo: {
              alignItems: 'center',
              marginBottom: 20,
              backgroundColor: Colors.primary,
              height: 40,
              justifyContent: 'center',
              borderRadius: 5
          },
          useInfoText: {
              color: 'white',
              fontSize: 16,
              fontFamily: 'Regular'
          },
          btnContainer: {
              flex: 1,
              marginTop: 35,
              width: 100,
              marginHorizontal: 70
          },
          warning_modal: {
              width: 250,
              height: 250,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: Colors.primary,
              borderRadius: 20,
          },
          warning_title: {
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              backgroundColor: Colors.primary,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
          },
          center_View: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000099'
          },
          warning_Message: {
              justifyContent: 'center',
              alignItems: 'center',
              height: 180,
        
          },
          text: {
              color: 'white',
              fontSize: 20,
              textAlign: 'center',
              color: 'black'
          },
          reset: {
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              backgroundColor: Colors.primary,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
          },
          Centered: {
              flex: 1,
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center'
          },  


});

export default DoctorAppointmentsScreen;