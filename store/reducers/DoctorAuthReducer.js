import { DOCTOR_AUTHENTICATE, DID_TRY_AUTO_LOGIN, LOGOUT} from '../actions/DoctorAuthAction';

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DOCTOR_AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin:true,
      };
      case DID_TRY_AUTO_LOGIN:
        return {
            ...state,
            didTryAutoLogin:true,
        }
        case LOGOUT:
    return {
        ...initialState,
        didTryAutoLogin:true
    }
    default:
      return state;
  }
};
