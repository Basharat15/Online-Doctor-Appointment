import React,{useCallback,useEffect,useState} from 'react';
import {FlatList, Button, Alert, StyleSheet, View, Text, ActivityIndicator, Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import DoctorItem from '../../components/patient/DoctorItem';
import Colors from '../../constants/Colors';
import * as doctorsActions from '../../store/actions/DoctorsAction';
import DoctorProfileItem from '../../components/doctor/DoctorProfileItem';
import DoctorItemButton from '../../components/UI/DoctorItemButton';


const DoctorProfileScreen = props =>{
    const [isLoading, setIsLoading]  = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
       const doctorProfile = useSelector(state => state.doctors.doctorProfile)
       const dispatch = useDispatch()


       const loadDoctors = useCallback(async () => {
           
           setError(null);
           setIsRefreshing(true);
           try {
             await dispatch(doctorsActions.fetchDoctors());
           } catch (err) {
             setError(err.message);
           }
           setIsRefreshing(false);
         }, [dispatch, setIsLoading, setError]);
   
         useEffect(() =>{
           const willFocusSub = props.navigation.addListener('willFocus', loadDoctors)
   
           return () =>{
               willFocusSub.remove();
           }
         },[loadDoctors]);
         useEffect(() => {
            setIsLoading(true);
            loadDoctors().then(() =>{
              setIsLoading(false);
            })
          }, [dispatch, loadDoctors]);
        
          if (error) {
            return (
              <View style={styles.centered}>
                <Text>An error occurred!</Text>
                <Button
                  title="Try again"
                  onPress={loadDoctors}
                  color={Colors.primary}
                />
              </View>
            );
          }
        
          if (isLoading) {
            return (
              <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
              </View>
            );
          }
        

       const editProfileHandler = id =>{
           props.navigation.navigate('EditProfile' , { doctorId:id });
       }

       const deleteProfileHandler = (id) =>{
        Alert.alert('Are you sure?','Do you really want to delete your profile', [
          {text:'No',style:'default'},
          {text:'Yes',style:'destructive', onPress: () => {
            dispatch(doctorsActions.deleteDoctor(id))
        }}
        ])
      };

      if(doctorProfile.length === 0){
        return(
            <View style={styles.screen}>
              <Image source={{uri:'https://img.freepik.com/free-vector/isolated-phonendoscope_1262-6423.jpg?size=338&ext=jpg&ga=GA1.2.825938731.1656826831'}}  style={styles.backgroundImage}/>
                <Text style={styles.title}>
                  Well Come Here!
                </Text>
                <View style={styles.descryptionContainer}>
                <Text style={styles.descryption}>
                  Please create your profile to proceed next!!!
                  Make sure enter your details accurately, In case of 
                  any violation Your Profile will be dismissed without 
                  your permission.Thanks
                </Text>
                </View>
                <DoctorItemButton
                style={styles.createButton}
                onPress={()=>{
                  props.navigation.navigate('EditProfile')
                }}
                >
                    Create Profile
                </DoctorItemButton>
            </View>
      )};
       return ( 
       <FlatList 
       data={doctorProfile}
       keyExtractor={item => item.id}
       renderItem={itemData => (
       <DoctorProfileItem
       title={itemData.item.title}
       category={itemData.item.category}
       imgUrl={itemData.item.imgUrl}
       descryption={itemData.item.descryption}
       address={itemData.item.address}
       timing={itemData.item.timing}
       phonenum={itemData.item.phonenum}
       holiday={itemData.item.holiday}
       onSelect={()=>{
        editProfileHandler(itemData.item.id)
       }}
       >
            <DoctorItemButton
                  style={styles.editButton}   
                  onPress={() => {
                  editProfileHandler(itemData.item.id)
            }}>
              Edit Profile
            </DoctorItemButton> 
            <DoctorItemButton 
                  style={styles.deleteButton}
                  onPress={ ()=>{
                  deleteProfileHandler(itemData.item.id)
            }}>
              Delete Profile
            </DoctorItemButton>
        
       </DoctorProfileItem>
       )}
       />)}
       

export const ScreenOptions = navData => {
  return{
      
    headerTitle: 'Your Profile',
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
                  
                  }}}
  
   
   const styles = StyleSheet.create(
    {
        centered:{
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center'
          },
          editButton:{
            marginRight:'40%',
            
          },
          deleteButton:{
            marginLeft:'5%'
          },
          screen:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
            flexDirection: 'column',

          },
          backgroundImage:{
            width:'100%',
            height:'50%',
          },
          title:{
            fontFamily:'RobotoBold',
            fontSize:16
          },
          descryption:{
            fontFamily:'Regular',
            color:Colors.primary,
            
          },
          createButton:{
            marginTop:25
          },
          descryptionContainer:{
          
            marginTop:20,
            
          }
    })

export default DoctorProfileScreen;