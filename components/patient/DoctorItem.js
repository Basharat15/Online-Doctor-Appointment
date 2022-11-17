import React from 'react';
import {View, StyleSheet, Text , TouchableOpacity, TouchableNativeFeedback, Platform, Image} from 'react-native';
import DoctorItemButton from '../UI/DoctorItemButton';

const DoctorItem = props =>{
       // Basically this will remove the ripple effect in android device 
       //that have version greater than 21 
       let TouchableCmp = TouchableOpacity;
       if(Platform.OS === 'android' && Platform.Version >=21){TouchableCmp = TouchableNativeFeedback;}
       return(
       <View style= {styles.doctorItem}>
            
       <TouchableCmp useForeground onPress={props.onSelect}>
       <View style={styles.touchable} >
       <View style={styles.imgContainer}>
       <Image style={styles.img} source={{uri: props.imgUrl}}/>
       </View>
       <View style={styles.textContainer}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.category}>{props.category}</Text>
              <Text style={styles.timing}>{props.timing}</Text>
              <View style={styles.button}>
                    {props.children}
            </View>
       </View>
       </View>

       </TouchableCmp>
       </View>
       )};

const styles = StyleSheet.create({
       doctorItem:{
              shadowColor:'black',
              shadowOpacity: 0.26,
              shadowOffset:{width: 0, height: 2},
              shadowRadius: 8,
              elevation: 5,
              borderRadius: 10,
              backgroundColor: 'white',
              height: 110,
              margin: 8,
              // backgroundColor:"red",
              width:'100%',
       },
       touchable:{
              height:'100%',
              width:'100%',
              borderRadius: 10,
              overflow:'hidden',
              flex:1,
              flexDirection:'row',     
       },
       imgContainer:{
              height:'80%',
              width:'30%',
              backgroundColor:'white',
              marginTop:'3%',
              marginLeft:'3%',
              borderRadius:20,
       },
       img:{
              height:'100%',
              width:'100%',
              borderRadius:20,
              
       },
       textContainer:{
              height:'80%',
              width:'60%',
              // backgroundColor:'black',
              flexDirection:'column',
              marginTop:'3%',
              marginLeft:'3%'
       },
       title: {
              fontSize:18,
              marginTop:10,
              marginLeft:10,
              color:'black',
              fontFamily:'RobotoBold'
       },
       category: {
              fontSize:14,
              marginTop:2,
              marginLeft:10,
              color:'black',
              fontFamily:'RobotoLight'
       },
       timing: {
              fontSize:10,
              marginTop:2,
              marginLeft:10,
              color:'black',
              fontFamily:'Regular'
       },
       button:{
              width:'45%',
              marginLeft:'53%',
              marginTop:-28,
       
       },
        
});
export default DoctorItem;
