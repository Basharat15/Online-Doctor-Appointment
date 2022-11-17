import react from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const DoctorAppointmentItem =  props =>{
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
                            <View style={styles.imgContainer}>
                            <Image style={styles.img}  source={{ uri: props.docImageUrl }}  />
                            </View>
                            <View style={styles.titleContainer}>
                            <Text style={styles.docTitle}>{props.docTitle}</Text>
                            <Text style={styles.docCategory}>{props.docCategory}</Text>
                            </View>
                          
                     </View>
                            <View style={styles.patientDetailsTextContainer}>
                                   <Text style={styles.pdText}>Patient Details</Text>
                            </View>
                            <View style={styles.detailsMainContainer}>
                              <View style={styles.detailsContainer1}>
                                   <Text style={styles.detailsText}>{props.name}</Text>
                              </View>
                              <View style={styles.detailsContainer2}>
                              <Text style={styles.detailsText}>{props.time}</Text>
                              </View>  
                              <View style={styles.detailsContainer3}>
                              <Text style={styles.detailsText}>{props.problem}</Text>
                              </View>       
                            </View>
                            <View style={styles.buttonContainer}>
                                   {props.children}
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
              height: 155,
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
              borderRadius: 10,
              overflow:'hidden',
              
       },
       dateContainer:{
              height:'12%',
              width:'100%',
              alignItems:'center'
       },
       date:{
             color:Colors.accent
       },
       header:{
              height:'35%',
              width:'100%',
              flexDirection:'row', 
              marginTop:'-2%'       
       },
       imgContainer:{
              height:'90%',
              width:'14%',
              // backgroundColor:'green',
              marginTop:'1%',
              borderRadius:50,
              marginLeft:'3%'
       },
       img:{
              height:'100%',
              width:'100%',
              borderRadius:50
       },
       titleContainer:{
              height:'90%',
              width:'47%',
              // backgroundColor:'blue',
              marginTop:'1%',
              marginLeft:'5%'
              
       },
       docTitle:{
              fontSize:16,
              fontFamily:'RobotoBold',
              paddingTop:'3%',
              paddingLeft:'3%',

       },
       docCategory:{
              fontSize:14,
              fontFamily:'RobotoRegular',
              paddingLeft:'3%',
              marginTop:'-1%'
       },
       patientDetailsTextContainer:{
              height:'8%',
              width:'100%',
              // backgroundColor:'pink',
              alignItems:'center',
              marginBottom:'1%',
       },
       pdText:{
              fontSize:10,
              fontFamily:'Regular',
              color:Colors.accent
       
       },
       detailsMainContainer:{
              height:'18%',
              width:'96%',
              flexDirection:'row',
              justifyContent:'space-between',
              marginLeft:'2%',
              marginBottom:'1%'
              
             
       },
       detailsContainer1:{
              height:'100%',
              width:'32%',
              alignItems:'center',
              borderRadius:5,
              padding:'1%',
              borderWidth:1,
              borderColor:Colors.primary,
    
       },
       detailsContainer2:{
              height:'100%',
              width:'32%',
              alignItems:'center',
              borderRadius:5,
              padding:'1%',
              borderWidth:1,
              borderColor:Colors.primary
    
       },
       detailsContainer3:{
              height:'100%',
              width:'32%',
              alignItems:'center',
              borderRadius:5,
              padding:'1%',
              borderWidth:1,
              borderColor:Colors.primary
    
       },
       detailsText:{
              color:'black',
              fontSize:12
       },
       buttonContainer:{
              height:'31%',
              width:'100%',
              flexDirection:'row',
              justifyContent:'center',
                      
       },

});

export default DoctorAppointmentItem;