import React from 'react';
import {Text , View , Button, StyleSheet, ImageBackground, Image} from 'react-native';
import Colors from '../constants/Colors';
import DoctorAuthStack from '../navigation/DoctorAuthStack';
import MainButton from '../components/UI/MainButton'


const Start = props=>{
       return (
        <ImageBackground
        source={{uri:'https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80'}}
        style={{height:'100%', width:'100%'}}
        >
              <View style={styles.screen}>
                     <View style={styles.titleContainer}>
                    <Image
                    source={{uri:'https://img.freepik.com/free-photo/top-view-paper-heart-with-heartbeat-stethoscope-heart-day_23-2148635245.jpg?w=740&t=st=1657663322~exp=1657663922~hmac=e8527bf51be3b4ea6dca81144040a2482e535e9b8e2908a3e8de4e80a36b8f83'}}
                    style={{height:'100%', width:'100%', borderRadius:20}}
                    />
                     </View>
                     <View style={styles.buttonContainer}>
                      <MainButton
                      style={styles.docButton}
                      onPress={()=>{
                        props.navigation.navigate('Doctor Authentication')
                        
                      }}
                      >
                        Doctor
                      </MainButton >
                      <MainButton
                      style={styles.patientButton}
                      onPress={()=>{
                        props.navigation.navigate('Patient Authentication')
                        
                      }}
                      >
                        Patient
                      </MainButton>
                     </View>
              </View>
        </ImageBackground>

       );
};

const styles = StyleSheet.create({
     screen:{
       flex:1,
       height:'100%',
       width:'100%',
       flexDirection:'column',
       alignItems:'center',
       borderRadius:15
      
     },
     titleContainer:{
       height:'17%',
       width:'30%',
       backgroundColor:'black',
       marginTop:'50%',
       borderRadius:20
       
     },
     buttonContainer:{
      height:'30%',
      width:'90%',
      // backgroundColor:'red',
      marginTop:'10%',
     },
     docButton:{
      margin:20,
      color:Colors.accent
     },
     patientButton:{
      marginLeft:20,
      marginRight:20
     }
 
})

export const ScreenOptions = navData => {
       return {
        
         headerStyle: {
           backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
         },
         headerTitleStyle: {
         },
         headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
       }
     }
export default Start;