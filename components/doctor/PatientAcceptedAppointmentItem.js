import react from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const PatientAcceptedAppointmentItem =  props =>{
       let TouchableCmp = TouchableOpacity;
       if(Platform.OS === 'android' && Platform.Version >=21){TouchableCmp = TouchableNativeFeedback;}
       return(
<View style={styles.appointmentItem}>
               <TouchableCmp useForeground >
                     <View style={styles.touchable}>
                     <View style={styles.dateContainer}>
                            <Text style={styles.date}>{props.date}</Text>
                            </View>
                     <View style={styles.header}>    
                            <Text style={styles.docTitle}>{props.docTitle}</Text>      
                     </View>

                            <View style={styles.detailsMainContainer}>
                              <View style={styles.lable1}>
                                   <Text style={styles.lableText}>Token</Text>
                              </View>
                              <View style={styles.lable2}>
                              <Text style={styles.lableText}>Time</Text>
                              </View>  
                          
                            </View>
                            <View style={styles.detailsMainContainer}>
                              <View style={styles.detailsContainer1}>
                                   <Text style={styles.detailsText}>{props.token}</Text>
                              </View>
                              <View style={styles.detailsContainer2}>
                              <Text style={styles.detailsText}>{props.time}</Text>
                              </View>  
                          
                            </View>
                            </View>
                     </TouchableCmp>
                     </View>
              
              

       );
};

const styles= StyleSheet.create({
       appointmentItem: {
              shadowColor:'black',
              shadowOpacity: 0.26,
              shadowOffset:{width: 0, height: 2},
              shadowRadius: 8,
              elevation: 5,
              borderRadius: 10,
              backgroundColor: 'white',
              paddingVertical:5,
              height: 100,
              width: '96%',
              marginLeft:'2%',
              // backgroundColor: 'black',
              borderRadius:15,
              marginTop:10,
              // borderWidth:1,
              // borderColor:'black'
  
       },
       touchable:{
              height:'100%',
              width:'100%',
              borderRadius: 5,
              overflow:'hidden',
              
       },
       dateContainer:{
              height:'19%',
              width:'100%',
              alignItems:'center'
       },
       date:{
             color:Colors.accent
       },
       header:{
              height:'28%',
              width:'100%',
              flexDirection:'row', 
              marginTop:'-2%'   ,
              justifyContent:'center'
               
       },
       

       docTitle:{
              fontSize:14,
              fontFamily:'RobotoBold',
              paddingTop:'3%',
              paddingLeft:'3%',
          

       },



       detailsMainContainer:{
              height:'28%',
              width:'96%',
              flexDirection:'row',
              justifyContent:'space-between',
              marginLeft:'2%',
              marginBottom:'1%',
              
             
       },
       detailsContainer1:{
              height:'100%',
              width:'40%',
              alignItems:'center',
              borderRadius:5,
              padding:'1%',
              borderWidth:1,
              borderColor:Colors.primary,
              marginLeft:'4%'
    
       },
       detailsContainer2:{
              height:'100%',
              width:'40%',
              alignItems:'center',
              borderRadius:5,
              padding:'1%',
              borderWidth:1,
              borderColor:Colors.primary,
              marginRight:'4%'
    
       },
       lable1:{
              height:'100%',
              width:'40%',
              alignItems:'center',
          
              padding:'1%',
          
              marginLeft:'4%'
    
       },
       lable2:{
              height:'100%',
              width:'40%',
              alignItems:'center',
              
              padding:'1%',
          
              
              marginRight:'4%'
    
       },
       lableText:{
              color:'black',
              fontFamily:'RobotoLight'
       },
       detailsText:{
              color:'black',
              fontFamily:'Regular'
       },

});

export default PatientAcceptedAppointmentItem;