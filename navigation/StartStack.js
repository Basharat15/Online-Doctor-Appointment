// import * as  React from 'react';
// import { Platform } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Colors from '../constants/Colors';
// import start, {ScreenOptions as StartScreenOptions} from '../screens/Start';

// const Stack = createStackNavigator()

// const DefaultNavOption = {
//        headerStyle: {
//          backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
//        },
//        headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
//      }

// const StartStack = () =>{
//        return(
//               <Stack.Navigator screenOptions={DefaultNavOption}>
//               <Stack.Screen
//                 name="Start "
//                 component={start}
//                 options={StartScreenOptions}
//               />
//             </Stack.Navigator>
//        )
// };

// export default StartStack;