import React ,{useEffect , useCallback, useReducer, useState} from 'react';
import{ View, Text, StyleSheet, TextInput,ScrollView,Alert, ActivityIndicator} from 'react-native';
import Colors from '../../constants/Colors';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as doctorActions from '../../store/actions/DoctorsAction';
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
};
const EditProfileScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const docId = props.route.params ? props.route.params.doctorId : null;
    const editedProfile= useSelector(state => 
      state.doctors.doctorProfile.find(doc => doc.id === docId)
      );
    const dispatch = useDispatch();
      //form Validation
    const [formState, dispatchFormState] = useReducer(formReducer ,{
      inputValues: {
        title: editedProfile ? editedProfile.title : '',
        category: editedProfile ? editedProfile.category : '',
        address: editedProfile ? editedProfile.address :'',
        descryption: editedProfile ? editedProfile.descryption : '',
        phonenum: editedProfile ? editedProfile.phonenum : '',
        timing: editedProfile ? editedProfile.timing : '',
        imgUrl: editedProfile ? editedProfile.imgUrl : '',
        holiday: editedProfile ? editedProfile.holiday : ''
  
      },
      inputValidities: {
        title: editedProfile ? true:false,
        category: editedProfile ? true:false,
        address: editedProfile ? true:false,
        descryption: editedProfile ? true:false,
        phonenum: editedProfile ? true:false,
        timing: editedProfile ? true:false,
        imgUrl: editedProfile ? true:false,
        holiday: editedProfile ? true:false
      },
      formIsValid: editedProfile ? true:false
    });

    useEffect(()=>{
        if(error){
          Alert.alert('An error occurred!', error, [{text:'Okay'}]);
        }
    },[error]);
      //Submit Function
    const submitHandler = useCallback( async() =>{
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
      if(editedProfile) {
        await dispatch(doctorActions.updateDoctor(
           docId, 
           formState.inputValues.title, 
           formState.inputValues.category, 
           formState.inputValues.address, 
           formState.inputValues.descryption, 
           formState.inputValues.phonenum, 
           formState.inputValues.timing,
           formState.inputValues.imgUrl, 
           formState.inputValues.holiday
           )
         );
         
       } else {
        await  dispatch(doctorActions.createDoctor(
           formState.inputValues.title,
           formState.inputValues.category,
           formState.inputValues.address,
           formState.inputValues.descryption,
           formState.inputValues.phonenum,
           formState.inputValues.timing,
           formState.inputValues.imgUrl, 
           formState.inputValues.holiday))
       }
     props.navigation.goBack();
     } catch(err){
      setError(err.message);
     }
    setIsLoading(false);
    
    },[dispatch, docId, formState]);
  
    useEffect ( () =>{
           props.navigation.setOptions({
            headerRight :()=> {
            return (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                          <Item
                              title="save"
                              iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                              onPress={submitHandler}      
                              
                          />
                      </HeaderButtons>
                      )
                    }
           })
    }, [submitHandler]);
  
    const inputChangeHandler = useCallback((
      inputIdentifier, inputValue, inputValidity) => {
  
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    }, [dispatchFormState]);

    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
    return (
        <ScrollView>
        <View style={styles.form}>
        </View>
        <Input
          id="title"
          label="Title"
          errorText="Please enter the valid title!"
          placeholder='Please Enter "Dr" Before Your Complete Name'
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProfile ? editedProfile.title:''}
          initiallyValid={!!editedProfile}
          maxLength={30}
          minLength={7}
          required

        />
          
        <Input
          id="category"
          label="Category"
          errorText="Please enter the valid category!"
          placeholder='Please Enter Your Specialization e.g "Phycologist" '
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProfile ? editedProfile.category:''}
          initiallyValid={!!editedProfile}
          required
          maxLength={25}
          minLength={5}
        />

        <Input
          id="address"
          label="Location"
          errorText="Please enter the valid location!"
          placeholder="Please Enter Your Completer Address/Location"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProfile ? editedProfile.address:''}
          initiallyValid={!!editedProfile}
          required
          maxLength={60}
          minLength={10}
        />

        <Input
          id="descryption"
          label="Descryption"
          errorText="Please enter the valid Descryption!"
          placeholder="Please Enter Something About Your Self e.g Experience /Qualification etc"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={2}
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProfile ? editedProfile.descryption:''}
          initiallyValid={!!editedProfile}
          required
          minLength={20}
          maxLength={70}
        />

        <Input
          id="phonenum"
          label="Contact"
          errorText="Please enter the valid phone number!"
          placeholder="Please Enter Your 11 digit contact number"
          keyboardType="decimal-pad"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProfile ? editedProfile.phonenum:''}
          initiallyValid={!!editedProfile}
          required
          maxLength={11}
          minLength={11}
        />
        <Input
          id="timing"
          label="Timing"
          errorText="Please enter the valid Timing!"
          placeholder='Please Enter Timing in this format "6:00amto 8:00pm" '
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProfile ? editedProfile.timing:''}
          initiallyValid={!!editedProfile}
          required
          minLength={6}
          maxLength={19}
        /> 
          <Input
          id="imgUrl"
          label="Image Url"
          errorText="Please enter the valid imageUrl!"
          placeholder='Paste Your Fb Profile URL Or Any Other Image URL'
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProfile ? editedProfile.imgUrl:''}
          initiallyValid={!!editedProfile}
          minLength={40}
          required
        /> 
          <Input
          id="holiday"
          label="Holiday"
          errorText="Please enter the holiday "
          placeholder='Enter Your Missing day e.g Sunday'
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProfile ? editedProfile.holiday:''}
          initiallyValid={!!editedProfile}
          required
          minLength={6}
          maxLength={20}
        /> 
      </ScrollView>

    );
  };

  export const ScreenOptions = navData => {
  const submitFn = navData.route.params ? navData.route.params: {};
      const routeParams = navData.route.params ? navData.route.params:{}
           return {
    
               headerTitle: routeParams.doctorId ? 'Edit Profile' : 'Add Profile' ,
               headerStyle: {
                   backgroundColor: Platform.OS === 'android' ? Colors.primary : 'black'
               },
               headerTitleStyle: {
               },
               headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
           
               ,
              //  headerRight: () => {
                  // return (
                  //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  //         <Item
                  //             title="save"
                  //             iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                  //             onPress={submitFn}      
                              
                  //         />
                  //     </HeaderButtons>
                  // )}
           }}

           const styles = StyleSheet.create({
            form: {
              margin: 20,
            
            },
            centered: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }
          });
          



export default EditProfileScreen;

























