import AppointmentClass from "../../models/Appointments";
import {APPOINTMENT,SET_APPOINTMENT,DELETE_APPOINTMENT, DELETE_DOCTOR_APPOINTMENT} from '../actions/AppointmentAction'

const initialState = {
       appointments: [],
       doctorAppointments:[]
};

export default (state = initialState, action) => {
       switch(action.type){ 
              case SET_APPOINTMENT:
              return {
                     appointments: action.appointments,
                     doctorAppointments: action.doctorAppointments,
                     // availableDoctors: action.doctors,   
                     }
              case APPOINTMENT:
                     const newAppointments = new AppointmentClass(
                     action.Id,
                     action.ownerId,
                     action.id,
                     action.docTitle,
                     action.docCategory,
                     action.docImageUrl,
                     action.name, 
                     action.age, 
                     action.problem, 
                     action.phoneNum, 
                     action.time, 
                     action.date
                     );
                      
                     return {
                     ...state,
                     appointments: state.appointments.concat(newAppointments),
                     doctorAppointments:state.doctorAppointments.concat(newAppointments )
                     };
                     case DELETE_APPOINTMENT:
                            return{
                                ...state,
                                appointments: state.appointments.filter(
                                       appointment => appointment.Id !== action.apmtId
                                ) ,        
                            };
                            case DELETE_DOCTOR_APPOINTMENT:
                                   return{
                                       ...state,
                                       doctorAppointments: state.doctorAppointments.filter(
                                          appointment => appointment.Id !== action.apmtId
                                   ) ,       
                                   };
                     }
                     return state;
              }




