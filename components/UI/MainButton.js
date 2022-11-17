import React  from 'react';
import {Text,TouchableOpacity,View,StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const MainButton = props => {
return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
    <View style={{...styles.button,...props.style}}>
     <Text style={styles.buttonText}>{props.children}</Text>
    </View>
    </TouchableOpacity>
);
};
const styles = StyleSheet.create({
button:{ 
    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:25,
    backgroundColor:Colors.accent, 
    alignItems:'center' 
},
buttonText:{
    fontSize:17,
    color:'white'
}
});
export default MainButton;
