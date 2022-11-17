import AsyncStorage from '@react-native-async-storage/async-storage';
export const DID_TRY_AUTO_LOGIN = 'DID_TRY_AUTO_LOGIN';
export const PATIENT_AUTHENTICATE = 'PATIENT_AUTHENTICATE';
export const LOGOUT = ' LOGOUT';

let timer;
export const DidTryAutoLogin = () => {
  return {
    type: 'DID_TRY_AUTO_LOGIN'
  }
};

export const PatientAuthenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(SetLogoutTimer(expiryTime));
    dispatch({
      type: PATIENT_AUTHENTICATE,
      userId: userId,
      token: token
    });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJPdwIdpv_3PXyxheqnMZlvuYOACyGrZo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      } else if (errorId === 'OPERATION_NOT_ALLOWED') {
        message = 'Password sign-in is disabled!'
      } else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        message = "Try again later!"
      }
      throw new Error(message);
    }
   
    const resData = await response.json();
    console.log(resData)
    dispatch(PatientAuthenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
       return async dispatch => {
         const response = await fetch(
           'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJPdwIdpv_3PXyxheqnMZlvuYOACyGrZo',
           {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               email: email,
               password: password,
               returnSecureToken: true
             })
           }
         );
     
         if (!response.ok) {
          const errorResData = await response.json();
          const errorId = errorResData.error.message;
          let message = 'Something went wrong!';
          if (errorId === 'EMAIL_NOT_FOUND') {
            message = 'This email could not be found!';
          } else if (errorId === 'INVALID_PASSWORD') {
            message = 'This password is not valid!';
          }
          throw new Error(message);
        }
         const resData = await response.json();
         console.log(resData);
         dispatch(PatientAuthenticate(resData.localId, resData.idToken,parseInt(resData.expiresIn)*1000));
         const expirationDate =new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
         saveDataToStorage(resData.idToken, resData.localId, expirationDate);
       };
     };

     export const Logout = () => {
      ClearLogoutTimer();
      AsyncStorage.removeItem('patientData');
      return {
        type: LOGOUT
      }
    };
    
    const ClearLogoutTimer = () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    
    const SetLogoutTimer = expirationTime=> {
      return dispatch => {
        timer = setTimeout(() => {
          dispatch(Logout());
        }, expirationTime);
      };
    };
    
     const saveDataToStorage = (token, userId, expirationDate) => {
      AsyncStorage.setItem(
        'patientData', 
          JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString(),
          })
      )

   };