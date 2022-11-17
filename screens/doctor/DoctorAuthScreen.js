import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { Text ,Pressable, Image, ScrollView, TouchableOpacity,View, StyleSheet, Button, KeyboardAvoidingView, ActivityIndicator,Alert, Dimensions, Modal } from 'react-native';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import InputSign from '../../components/UI/InputSignIn'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome, MaterialIcons, AntDesign,Feather } from '@expo/vector-icons'
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import * as doctorAuthActions from '../../store/actions/DoctorAuthAction'

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
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const DoctorAuthScreen = props =>{ 
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false)
  const [isSignup, setIsSignup] = useState(false);
  const [data,setData] = useState({
    email:'',
    password:'',
    check_textInputChange:false,
    secureTextEntry:true
})
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });
  
  useEffect(()=>{
    if(error){
        Alert.alert('An error accured!',error,[{ text:'Okay' }])
    }
  },[error])

  const authHandler = async () => {
    setError(null)
    setIsLoading(true)
    try {
        await dispatch(doctorAuthActions.login(
            formState.inputValues.email,
            formState.inputValues.password
        )) 
    } catch (err) {
        setError(err.message)
        setIsLoading(false)
    }
          
         };
         const updateSecureTextEntry = ()=>{
          setData({
              ...data,
              secureTextEntry:!data.secureTextEntry
          })
  
      }
  
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      if(inputValue.length !== 0){
        setData({
            ...data,
            email:inputValue,
            check_textInputChange:true
        })
    }else{
        setData({
            ...data,
            email:inputValue,
            check_textInputChange:false
        }) 
    }
    if(inputIdentifier==='password'){
    setData({
        ...data,
        password:inputValue
    })
}
    dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
    });
    },
    [dispatchFormState]
  );
      
  if (isLoading) {
    return (
        <View style={styles.Centered}>
            <ActivityIndicator
                size='large'
                color={Colors.primary}
            />
        </View>
    )
}
    return (
        
        // New design 
        <View style={styles.container}>
            <Modal visible={alert}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => {
                        setAlert(false)
                    }}
                >
                    <View style={styles.center_View}>
                        <View style={styles.warning_modal}>
                            <View style={styles.warning_title}>
                                <Text style={styles.text}>An error occured</Text>
                            </View>
                            <View style={styles.warning_Message}>
                             <Text style={styles.text}>'{Error}'</Text>  
                            </View>
                            <Pressable
                                onPress={() => {
                                    setAlert(false)
                                }}
                                android_ripple={{ color: Colors.primary }}
                            >
                                <View style={styles.reset}>
                                    <Text style={styles.text}>Ok</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            <View style={styles.header}>
                <Text style={styles.text_header}>Wellcome!</Text>
            </View>
            <View style={styles.footer}>
            < Image
            source={{uri:'data:image/jpeg;base64,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'}} 
            style={styles.img}
            resizeMode='stretch'
            />
                <Text style={styles.text_footer}>E-mail</Text>
                <View style={styles.action}>
                    <AntDesign  name="user" size={20} color="#05375a" />
                    <InputSign
                        style={styles.textInput}
                        id='email'
                        keyboardType='email-address'
                        required
                        email
                        returnKeyType='next'
                        autoCapitalize='none'
                        warningText='please enter a valid email address.'
                        onInputChange={inputChangeHandler}
                        initialValue=''
                        placeholder='Please Enter Your E-mail'
                    />
                   {data.check_textInputChange ?<AntDesign  name="checkcircleo" size={20} color="green" />:null} 
                </View>

                <Text style={styles.text_footer1}>Password</Text>
                <View style={styles.action1}>
                    <Feather   name="lock"  size={20} color="#05375a" />
                    <InputSign
                        style={styles.textInput}
                        id='password'
                        keyboardType='default'
                        secureTextEntry={data.secureTextEntry ? true :false}
                        required
                        minLenght={6}
                        autoCapitalize='none'
                        warningText='please enter  password.'
                        onInputChange={inputChangeHandler}
                        initialValue=''
                        returnKeyType='next'
                        placeholder='Please Enter Your Password'
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                    {data.secureTextEntry ?<Feather  name="eye-off" size={20} color="green" />:
                    <Feather  name="eye" size={20} color="green" />}
                    </TouchableOpacity>    
                </View>
                <TouchableOpacity onPress={authHandler} style={styles.button}>
                <LinearGradient
                colors={['#08d4c4','#01ab9d']}
                style={styles.signIn}
                >
                  <Text style={styles.textSign1}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>{
                    props.navigation.navigate('Doctor Signup')
                }}
                style={styles.signIn1}
                >
                    <Text style={[styles.textSign,{
                        color:'#009387'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
                </View>
            </View>

    
      );
};
const { height } = Dimensions.get('screen')
const height_logo = height * 0.28;
   const styles = StyleSheet.create({
    warning_modal: {
      width: 250,
      height: 250,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#248f8f',
      borderRadius: 20,
  },
  warning_title: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      backgroundColor: '#248f8f',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
  },
  center_View: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: '#00000099'
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
      backgroundColor: '#248f8f',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
  },

  // New design 
  container: {
      flex: 1,
      backgroundColor: Colors.primary
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 10,
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 20
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18,
      marginBottom:10
  },
  text_footer1: {
      color: '#05375a',
      fontSize: 18,
      marginTop:35,
      marginBottom:20
  },
  action: {
       flexDirection: 'row',
      justifyContent: 'space-around',
      borderBottomColor: '#f2f2f2',
      // paddingBottom: 5,
      // height:60
  },
  action1: {
      flexDirection: 'row',
     justifyContent: 'space-around',
     borderBottomColor: '#f2f2f2',
     // paddingBottom: 5,
     // height:60
 },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      paddingLeft: 15,
      marginTop: Platform.OS === 'ios' ? 0 : -17,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingHorizontal: 2,
      paddingVertical: 1,
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  signIn1: {
      borderColor:'#009387',
      borderWidth:1,
      marginTop:15,
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  textSign1: {
      fontSize: 18,
      fontWeight: 'bold',
      color:'#fff'
  },
 img:{
  width:'30%',
  height:'25%',
  marginLeft:123,
  marginBottom:15,
  borderRadius:30
 }
 
  });
  
  export const ScreenOptions = navData => {
    return {
  
      headerTitle: 'Doctor Authentication',
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
      },
      headerTitleStyle: {
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
  
export default DoctorAuthScreen;