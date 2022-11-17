import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, Button, ActivityIndicator, StyleSheet, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DoctorItem from '../../components/patient/DoctorItem';
import HeaderButton from '../../components/UI/HeaderButton';
import { Item, HeaderButtons } from 'react-navigation-header-buttons'
import Colors from '../../constants/Colors';
import * as doctorsActions from '../../store/actions/DoctorsAction'
import HeaderButton from '../../components/UI/HeaderButton;'
import DoctorItemButton from '../../components/UI/DoctorItemButton';

const DoctorsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const doctors = useSelector(state => state.doctors.availableDoctors);

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

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadDoctors)

    return () => {
      willFocusSub.remove();
    }
  }, [loadDoctors]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('DoctorDetails', {
      doctorId: id,
      doctorTitle: title
    });
  };

  useEffect(() => {
    setIsLoading(true);
    loadDoctors().then(() => {
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

  if (!isRefreshing && doctors.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <FlatList
        onRefresh={loadDoctors}
        refreshing={isRefreshing}
        data={doctors}
        key="uniqueid1"
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <DoctorItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            category={itemData.item.category}
            imgUrl={itemData.item.imgUrl}
            holiday={itemData.item.holiday}
            timing={itemData.item.timing}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <DoctorItemButton
                         onPress={() => {
                          selectItemHandler(itemData.item.id, itemData.item.title);
                        }}
            >
            View Details
            </DoctorItemButton>
          </DoctorItem>
        )}

      />
    </View>
  );
};

export const ScreenOptions = navData => {
  return {
    headerTitle: 'All Available Doctors',
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
    },
    //cart header
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="cart"
            iconName={Platform.OS === 'android' ? 'people' : 'people'}
            onPress={() => {
              navData.navigation.navigate('Your Appointments')
            }}

          />
        </HeaderButtons>
      )
    },

  }
};

const styles = StyleSheet.create(
  {
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    screen: {
      flex: 1,
    },
    containerText: {
      alignItems: 'center',
      marginVertical: 10,
  },
  text1: {
      alignItems: 'center',
      fontSize: 20,
      fontFamily: 'Bold',
      color: Colors.primary
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

  })

export default DoctorsOverviewScreen;