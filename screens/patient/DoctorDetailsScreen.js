import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView,Button,Modal,ScrollView, Alert, ActivityIndicator} from 'react-native';
import { useSelector , useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import MainButton from '../../components/UI/MainButton';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import * as AppointmentActions from '../../store/actions/AppointmentAction'
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
import DatePicker from 'react-native-datepicker';

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
const DoctorDetailsScreen = props => {
       const [isAlert, setIsAlert] = useState(false);
       const [isLoading, setIsLoading] = useState(false);
       const [isRefreshing, setIsRefreshing] = useState(false);
       const [error, setError] = useState();
       const [itemSelected, setItemSelected] = useState('');
       const [date, setDate] = useState('09-10-2021');
       const dispatch = useDispatch();

       //This is how we select the single doctor
       const doctorId = props.route.params.doctorId;
       const selectedDoctor = useSelector(state =>
         state.doctors.availableDoctors.find(doc => doc.id === doctorId)
       )
       
  const [formState, dispatchFormState] = useReducer(formReducer, {
       inputValues: {
         name: '',
         age: '',
         problem: '',
         phoneNum: '',
         time: ''
       },
       inputValidities: {
         name: false,
         age: false,
         problem: false,
         phoneNum: false,
         time: false
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
         await dispatch(AppointmentActions.Appointment(
            itemSelected.ownerId,
            itemSelected.title,
            itemSelected.category,
            itemSelected.imgUrl,
            formState.inputValues.name, 
            formState.inputValues.age, 
            formState.inputValues.problem, 
            formState.inputValues.phoneNum, 
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
   if (isLoading) {
       return (
         <View style={styles.centered}>
           <ActivityIndicator size="large" color={Colors.primary} />
         </View>
       );
     }
   
       return(
        <ScrollView>  
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
                            <Text style={styles.useInfoText}>Patient Information</Text>
                        </View>

                        <Input
                            id='name'
                            label="Name"
                            errorText='Please enter some your name!'
                            keyboardType='default'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='Please Enter Your Complete Name'
                            initialValue=''
                            onInputChange={inputChangeHandler}
                            required
                            maxLength={17}
                            minLenth={6}
                        />
                        <Input
                            id='age'
                            label="Age"
                            errorText='Please Enter your age!'
                            keyboardType='decimal-pad'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='Please enter your age'
                            initialValue=''
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                            maxLength={2}
                        />
                        <Input
                            id='problem'
                            label="Problem"
                            errorText='Please enter your problem!'
                            keyboardType='default'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='Please enter your problem'
                            required
                            onInputChange={inputChangeHandler}
                            maxLength={10}
                            minLenth={4}
                        />
                        <Input
                            id='phoneNum'
                            label="Contact Number"
                            errorText='Please enter valid phone number!'
                            keyboardType='decimal-pad'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='Please enter your phone number!'
                            required
                            onInputChange={inputChangeHandler}
                            minLength={11}
                            maxLength={11}
                        />
                        <Input
                            id='time'
                            label="Date"
                            errorText='Please enter valid date'
                            keyboardType='decimal-pad'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            placeholder='Please enter date on which you want to checkup'
                            initialValue=''
                            onInputChange={inputChangeHandler}
                            required
                        minLength={10}
                        maxLength={10}

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
              <View style={styles.imgContainer} >
              <Image style={styles.image} source={{uri: selectedDoctor.imgUrl}}/>
              </View>
              <Text style={styles.category}>{selectedDoctor.category}</Text>
              <Text style={styles.title}>{selectedDoctor.title}</Text>
              <Text style={styles.aboutLabel}>About:</Text>
              <Text style={styles.description}>{selectedDoctor.descryption}</Text>
              <Text style={styles.addressLabel}>Location:</Text>
              <Text style={styles.address}>{selectedDoctor.address}</Text>
              <Text style={styles.contactLabel}>Contact:</Text>
              <Text style={styles.phonenum}>{selectedDoctor.phonenum}</Text>
              <Text style={styles.timingLabel}>Timing:</Text>
              <Text style={styles.timing}>{selectedDoctor.timing}</Text>
              <Text style={styles.holidayLabel}>Holiday:</Text>
              <Text style={styles.holiday}>{selectedDoctor.holiday}</Text>
              <MainButton style={styles.button} onPress={() => {
                   setItemSelected(selectedDoctor)
                   setIsAlert(true)
              }}>
              Book Appointment
              </MainButton>
              </View>
        </ScrollView>      
       );
};

const styles = StyleSheet.create({
       screen:{
              flex:1,       
       },
       imgContainer:{
              height:160,
              marginLeft:'31%',
              marginRight:'31%',
              marginTop: 35,
              marginBottom:20,
              borderRadius: 35,
              overflow:'hidden',
       },
       image:{
              height:'100%' ,
              width: '100%',
       },
       category:{
              fontSize:16,
              color:Colors.primary,
              textAlign:'center',
              fontFamily: 'RobotoRegular'
       },
       title:{
              fontSize:25,
              color:'black',
              textAlign:'center',
              fontFamily: 'RobotoBold',
              marginTop:5
       },
       aboutLabel:{
              fontSize:19,
              color:Colors.primary,
              alignItems:'flex-start',
              fontFamily: 'RobotoBold',
              marginLeft:'5%',
              marginTop:10,
       },
       description:{
              fontSize:14,
              alignItems:"flex-start",
              textAlign:'center',
              marginLeft:'14%',
              fontFamily:'Regular'
       }, 
       addressLabel:{
              fontSize:19,
              color:Colors.primary,
              alignItems:'flex-start',
              fontFamily: 'RobotoBold',
              marginLeft:'5%',
              marginTop:10,
       },
       address:{
              fontSize:14,
              alignItems:"flex-start",
              textAlign:'center',
              marginLeft:'10%',
              fontFamily:'Regular'

       },   
       contactLabel:{
              fontSize:19,
              color:Colors.primary,
              alignItems:'flex-start',
              fontFamily: 'RobotoBold',
              marginLeft:'5%',
              marginTop:10,
       },  
       phonenum:{
              fontSize:14,
              alignItems:"flex-start",
              marginLeft:'20%',
              fontFamily:'Regular'
       }, 
       timingLabel:{
              fontSize:19,
              color:Colors.primary,
              alignItems:'flex-start',
              fontFamily: 'RobotoBold',
              marginLeft:'5%',
              marginTop:10,
       }, 
       timing:{
              fontSize:14,
              alignItems:"flex-start",
              marginLeft:'20%',
              fontFamily:'Regular'
       }, 
       contactLabel:{
              fontSize:19,
              color:Colors.primary,
              alignItems:'flex-start',
              fontFamily: 'RobotoBold',
              marginLeft:'5%',
              marginTop:10,
       },  
       phonenum:{
              fontSize:14,
              alignItems:"flex-start",
              marginLeft:'20%',
              fontFamily:'Regular'
       }, 
       holidayLabel:{
              fontSize:19,
              color:Colors.primary,
              alignItems:'flex-start',
              fontFamily: 'RobotoBold',
              marginLeft:'5%',
              marginTop:5,
       }, 
       holiday:{
              fontSize:14,
              alignItems:"flex-start",
              marginLeft:'20%',
              fontFamily:'Regular'
       }, 
       button:{
              height:50,
              width:'50%',
              padding:10,
              marginTop:15, 
              marginLeft:'45%'
       },
       centered: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            },
       centerView: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000099'
          },
          AuthContainer: {
              width: 330,
              height: 590,
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
export const ScreenOptions = navData => {
       return {
       
           headerTitle: navData.route.params.doctorTitle ,
           headerStyle: {
               backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
           },
           headerTitleStyle: {
           },
           headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
       }
   }

export default DoctorDetailsScreen;