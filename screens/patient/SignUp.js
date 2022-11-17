//import liraries
import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Button,
    ActivityIndicator,
    Modal,
    Pressable,
    KeyboardAvoidingView,
    ImageBackground, Dimensions, Image, TextInput, TouchableOpacity, Alert
} from 'react-native'
import { useDispatch } from 'react-redux'
import InputSign from '../../components/UI/InputSignIn';

import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import * as  patientAuthActions from '../../store/actions/PatientAuthAction';
import { Ionicons, FontAwesome, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons'



// create a component
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
const PatientSignUp = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSignup, SetisSignup] = useState(false)
    const [error, setError] = useState();
    const [alert, setAlert] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
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
            await dispatch(patientAuthActions.signup(
            formState.inputValues.email,
            formState.inputValues.password
            ))
        } catch (err) {
            setError(err.message)
            setIsLoading(false)
        }

    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
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
                <Text style={styles.text_header}>Register Now</Text>
            </View>
            <View style={styles.footer}>
                {/* for email */}
                <Text style={styles.text_footer}>E-mail</Text>
                <View style={styles.action}>
                    <AntDesign name="user" size={20} color="#05375a" />
                    <InputSign
                        style={styles.textInput}
                        id='email'
                        keyboardType='email-address'
                        required
                        email
                        returnKeyType='next'
                        autoCapitalize='none'
                        warningText='Please Enter a Valid Email address.'
                        onInputChange={inputChangeHandler}
                        initialValue=''
                        placeholder='Please Enter Your E-mail'
                    />
                    {data.check_textInputChange ? <AntDesign name="checkcircleo" size={20} color="green" /> : null}
                </View>
                {/* for password */}
                <Text style={styles.text_footer1}>Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" size={20} color="#05375a" />
                    <InputSign
                        style={styles.textInput}
                        id='password'
                        keyboardType='default'
                        secureTextEntry={data.secureTextEntry ? true : false}
                        required
                        minLenght={6}
                        autoCapitalize='none'
                        warningText='Please Enter  Password.'
                        onInputChange={inputChangeHandler}
                        initialValue=''
                        returnKeyType='next'
                        placeholder='Please Enter Your Password'

                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ? <Feather name="eye-off" size={20} color="green" /> :
                            <Feather name="eye" size={20} color="green" />}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={authHandler}
                    style={styles.button}
                >
                    <LinearGradient
                        colors={['#08d4c4', '#01ab9d']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign1}>Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack()
                    }} 
                    style={styles.signIn1}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export const ScreenOptions = navData => {
    return {
  
      headerTitle: 'Patient Signup',
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
      },
      headerTitleStyle: {
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
  
// define your styles
const { height } = Dimensions.get('screen')
const height_logo = height * 0.28;
const styles = StyleSheet.create({
    // screen: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // gradient: {
    //     width: '100%',
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // AuthContainer: {
    //     width: '80%',
    //     maxWidth: 400,
    //     maxHeight: 400,
    //     padding: 20,
    //     // backgroundColor: '#00000099',
    //     // marginBottom:150
    // },
    // btnContainer: {
    //     marginTop: 10
    // },
    // Centered: {
    //     flex: 1,
    //     textAlign: 'center',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // text: {
    //     color: '#248f8f',
    //     fontSize: 20,
    //     fontFamily: 'Bold'
    // },
    // text2: {
    //     color: 'red',
    //     fontSize: 16,
    //     fontFamily: 'Bold'
    // },
    // btnContainer2: {
    //     width: 120,
    //     marginVertical: 10
    // },
    // warning_modal: {
    //     width: 250,
    //     height: 250,
    //     backgroundColor: 'white',
    //     borderWidth: 1,
    //     borderColor: '#248f8f',
    //     borderRadius: 20,
    // },
    // warning_title: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: 50,
    //     backgroundColor: '#248f8f',
    //     borderTopRightRadius: 20,
    //     borderTopLeftRadius: 20,
    // },
    // center_View: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // backgroundColor: '#00000099'
    // },
    // warning_Message: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: 180,

    // },
    // text: {
    //     color: 'white',
    //     fontSize: 20,
    //     textAlign: 'center',
    //     color: 'black'
    // },
    // reset: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: 50,
    //     backgroundColor: '#248f8f',
    //     borderBottomLeftRadius: 20,
    //     borderBottomRightRadius: 20,
    // },

    // New design 
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
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginBottom: 20
    },
    text_footer1: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 35,
        marginBottom: 20
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
        borderColor: '#009387',
        borderWidth: 1,
        marginTop: 15,
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
        color: '#fff'
    }
})
//make this component available to the app
export default PatientSignUp;
