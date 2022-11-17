import React from 'react';
import {useFonts} from 'expo-font';
import DoctorsReducer from './store/reducers/DoctorsReducer';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import AppointmentReducer from './store/reducers/AppointmentReducer';
import AppContainer from './navigation/AppContainer';
import ReduxThunk from 'redux-thunk';
import DoctorAuthReducer from './store/reducers/DoctorAuthReducer';
import PatientAuthReducer from './store/reducers/PatientAuthReducer';
import AcceptedAppointmentsReducer from './store/reducers/AcceptedAppointmentsReducer';

const rootReducer = combineReducers({
  doctors : DoctorsReducer ,
  bookAppointment : AppointmentReducer,
  acceptedAppointments: AcceptedAppointmentsReducer,
  doctorAuth: DoctorAuthReducer,
  patientAuth: PatientAuthReducer
})

const store = createStore(rootReducer , applyMiddleware(ReduxThunk));

export default function App() {
  const [loaded]= useFonts({
    RobotoBold: require('./assets/font/RobotoBold.ttf'),
    RobotoLight:require('./assets/font/RobotoLight.ttf'),
    RobotoRegular:require('./assets/font/RobotoRegular.ttf'),
    Bold:require('./assets/font/Bold.ttf'),
    Regular:require('./assets/font/Regular.ttf')
  })
  if(!loaded){
    return null
  }

  return (
      <Provider store ={store}>
        <AppContainer/>
      </Provider>
  );
}


