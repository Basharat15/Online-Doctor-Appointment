import DOCTORS from "../../data/dummy-data";
import Doctor from "../../models/Doctor";
import { CREATE_DOCTOR, DELETE_DOCTOR, SET_DOCTORS,  UPDATE_DOCTOR  } from "../actions/DoctorsAction";

const initialState = {
       availableDoctors: [],
       doctorProfile:[],

};

export default (state= initialState, action) => {
       switch(action.type){ 
              case SET_DOCTORS:
                     return {
                            doctorProfile: action.doctorProfile,
                            availableDoctors: action.doctors,
                            
                     }
              case CREATE_DOCTOR:
                     const newDoctor = new Doctor(
                     action.doctorData.id,
                      action.doctorData.ownerId, 
                      action.doctorData.title, 
                      action.doctorData.category, 
                      action.doctorData.address, 
                      action.doctorData.descryption, 
                      action.doctorData.phonenum, 
                      action.doctorData.timing,
                      action.doctorData.imgUrl,
                      action.doctorData.holiday
                      );
              
                      return {
                             ...state,
                             availableDoctors: state.availableDoctors.concat(newDoctor),
                             doctorProfile: state.doctorProfile.concat(newDoctor),
                      };
              case UPDATE_DOCTOR:
                     const doctorIndex = state.doctorProfile.findIndex(
                            doc => doc.id === action.did
                            );
                     const updatedDoctor = new Doctor(
                            action.did, 
                            state.doctorProfile[doctorIndex].ownerId,
                            action.doctorData.title,
                            action.doctorData.category,
                            action.doctorData.address,
                            action.doctorData.descryption,
                            action.doctorData.phonenum,
                            action.doctorData.timing,
                            action.doctorData.imgUrl,
                            action.doctorData.holiday

                            );
                     const updatedDoctorProfile = [...state.doctorProfile];
                     updatedDoctorProfile[doctorIndex] = updatedDoctor;
                     const availableDoctorsIndex =  state.availableDoctors.findIndex(
                            doc => doc.id === action.did
                            );
                     const updatedavailableDoctors = [...state.availableDoctors];
                     updatedavailableDoctors[availableDoctorsIndex] = updatedDoctor;
                     return{
                            ...state,
                            availableDoctors: updatedavailableDoctors,
                            doctorProfile: updatedDoctorProfile
                     }
              case DELETE_DOCTOR:
              return{
                  ...state,
                  doctorProfile: state.doctorProfile.filter(
                         doctor => doctor.id !== action.did
                  ) ,  
                  availableDoctors: state.availableDoctors .filter(
                     doctor => doctor.id !== action.did
              ) ,       
              }
       }
       return state;
};