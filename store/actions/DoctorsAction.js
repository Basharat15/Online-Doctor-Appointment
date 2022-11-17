import Doctor from "../../models/Doctor";

export const DELETE_DOCTOR = 'DELETE_DOCTOR';
export const CREATE_DOCTOR = 'CREATE_DOCTOR';
export const UPDATE_DOCTOR = 'UPDATE_DOCTOR';
export const SET_DOCTORS = 'SET_DOCTORS';

export const fetchDoctors = () => {
       return async (dispatch, getState) => {
              userId = getState().doctorAuth.userId;
              try {
                     //you can execute any async code here what you want
                     const response = await fetch('https://medicare-2b015-default-rtdb.firebaseio.com/doctors.json', {
                            method: 'GET',
                     });
                     if (!response.ok) {
                            throw new Error('Something went wrong!')
                     }
                     const resData = await response.json();
                     // console.log(resData)
                
                     const loadedDoctors = [];
                     for (const key in resData) {
                            loadedDoctors.push(new Doctor(
                                   key,
                                   resData[key].ownerId,
                                   resData[key].title,
                                   resData[key].category,
                                   resData[key].address,
                                   resData[key].descryption,
                                   resData[key].phonenum,
                                   resData[key].timing,
                                   resData[key].imgUrl,
                                   resData[key].holiday
                            ))      
                     }
                   
                     dispatch({ 
                            type: SET_DOCTORS,
                            doctors: loadedDoctors , 
                            doctorProfile: loadedDoctors.filter(doc => doc.ownerId === userId)
                             
                            });
              } catch (err) {
                     //you  can also send to analytics server
                     throw err;
              }


       };
}

export const deleteDoctor = doctorId => {
       return async (dispatch, getState) => {
              token = getState().doctorAuth.token;
              
              await fetch(
                     `https://medicare-2b015-default-rtdb.firebaseio.com/doctors/${doctorId}.json?auth=${token}`,
                     {
                            method: 'DELETE'
                     }
              );
              console.log(doctorId)
              dispatch({ type: DELETE_DOCTOR, did: doctorId });
       };
};

export const createDoctor = (title, category, address, descryption, phonenum, timing, imgUrl, holiday) => {
       return async (dispatch, getState) => {
              token = getState().doctorAuth.token;
              userId = getState().doctorAuth.userId;
              //you can execute any async code here what you want
              const response = await fetch(`https://medicare-2b015-default-rtdb.firebaseio.com/doctors.json?auth=${token}`, {
                     method: 'POST',
                     headers: {
                            'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({
                            title,
                            category,
                            address,
                            descryption,
                            phonenum,
                            timing,
                            imgUrl,
                            holiday,
                            ownerId:userId
                     })
              });

              const resData = await response.json();
              console.log(resData.name)
              dispatch(
                     {
                            type: CREATE_DOCTOR, doctorData: {
                                   id: resData.name,
                                   title: title,
                                   category: category,
                                   address: address,
                                   descryption: descryption,
                                   phonenum: phonenum,
                                   timing: timing,
                                   imgUrl: imgUrl,
                                   holiday: holiday,
                                   ownerId:userId
                            }
                     }
              );
       }


};

export const updateDoctor = (id, title, category, address, descryption, phonenum, timing, imgUrl, holiday) => {
       return async (dispatch , getState) => {
              token = getState().doctorAuth.token;
              try{
                    const response =   await fetch(`https://medicare-2b015-default-rtdb.firebaseio.com/doctors/${id}.json?auth=${token}`, {
                            method: 'PATCH',
                            headers: {
                                   'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                   title,
                                   category,
                                   address,
                                   descryption,
                                   phonenum,
                                   timing,
                                   imgUrl,
                                   holiday
                            })
                     });
                     const resData = await response.json();
              
              }catch(err){
                     throw new Error ('something went wrong')
              }
              
             
              
              dispatch({
                     type: UPDATE_DOCTOR,
                     did: id,
                     doctorData: {
                            title,
                            category,
                            address,
                            descryption,
                            phonenum,
                            timing,
                            imgUrl,
                            holiday
                     }
              })
       }
};