import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {View,ImageBackground,  StyleSheet, Text, FlatList, ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/UI/HeaderButton';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import * as AcceptedAppointmentActions from '../../store/actions/AcceptedAppointmentsAction';
import DoctorAcceptedAppointmentItem from '../../components/doctor/DoctorAcceptedAppointmentItem'


const DoctorAcceptedAppointmentsScreen = props =>{

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const doctorAcceptedAppointments = useSelector(state => state.acceptedAppointments.doctorAcceptedAppointments);

  const loadedAcceptedAppointments = useCallback(async () => {

      setError(null);
      setIsRefreshing(true);
      try {
             await dispatch(AcceptedAppointmentActions.fetchAcceptedAppointments());
      } catch (err) {
             setError(err.message);
      }
      setIsRefreshing(false);
}, [dispatch, setIsLoading, setError]);

useEffect(() => {
      const willFocusSub = props.navigation.addListener('willFocus', loadedAcceptedAppointments)

      return () => {
             willFocusSub.remove();
      }
}, [loadedAcceptedAppointments]);
useEffect(() => {
      setIsLoading(true);
      loadedAcceptedAppointments().then(() => {
             setIsLoading(false);
            //  loadedAcceptedAppointments(doctorAcceptedAppointments)
             
      })
}, [dispatch, loadedAcceptedAppointments]);


if (isLoading) {
      return (
             <View style={styles.centered}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    
             </View>
      );
}

if (!isRefreshing && doctorAcceptedAppointments.length === 0) {
      return (
       <View style={styles.centered}>
       <ImageBackground
       source={{uri:'https://images.unsplash.com/photo-1638202993928-7267aad84c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'}}
       style={{width:'100%' ,height:'100%'}}
       >
     <View style={styles.emptyTextView}>
       <Text style={styles.emptyText}>You don't have any appointment yet!
            
     </Text>
     </View>
     </ImageBackground>
    
</View>
      );
}

return(
  <View style={styles.screen}>
  <FlatList
         onRefresh={loadedAcceptedAppointments}
         refreshing={isRefreshing}
         data={doctorAcceptedAppointments}
         keyExtractor={item => item.Id}
         renderItem={itemData => (
         <DoctorAcceptedAppointmentItem
                       docOwnerId={itemData.item.docOwnerId}
                       docTitle={itemData.item.docTitle}

                       name={itemData.item.name}
               
                     
                       token={itemData.item.appToken}
                       time={itemData.item.time}
                       date={itemData.item.readableDate}
                >
                  </DoctorAcceptedAppointmentItem>
         )}
         />
         </View>

)
};

export const ScreenOptions = navData => {

    return {
  
      headerTitle: 'Accepted Appointments',
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
  };

const styles= StyleSheet.create({
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
              fontSize:18,
       
              
            
       },
});

export default DoctorAcceptedAppointmentsScreen;