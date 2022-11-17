import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, Platform, Image } from 'react-native';
import Colors from '../../constants/Colors';

const DoctorProfileItem = props => {
    return (
        <View style={styles.screen}>
            <View style={styles.imgMainContainer}>
                <View style={styles.imgContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.category}>{props.category}</Text>
                    <Image style={styles.img} source={{ uri: props.imgUrl }} />
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.aboutLabel}>About</Text>
                <Text style={styles.description}>{props.descryption}</Text>
                <Text style={styles.addressLabel}>Location</Text>
                <Text style={styles.address}>{props.address}</Text>
            </View>
            <View style={styles.detailsLabelContainer}>
                <View style={styles.one}>
                    <Text style={styles.detailsLabelText}>Timing</Text>
                </View>
                <View style={styles.one}>
                    <Text style={styles.detailsLabelText}>Contact</Text>
                </View>
                <View style={styles.one}>
                    <Text style={styles.detailsLabelText}>Holiday</Text>
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.two}>
                    <Text style={styles.detailsText}>{props.timing}</Text>
                </View>
                <View style={styles.two}>
                    <Text style={styles.detailsText}>{props.phonenum}</Text>
                </View>
                <View style={styles.two}>
                <Text style={styles.detailsText}>{props.holiday}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                    {props.children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        textAlign: 'center'
    },
    imgMainContainer: {
        height: 270,
        width: '100%',
        backgroundColor: Colors.primary,
        alignItems: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    imgContainer: {
        height: '100%',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        // marginTop:'20%'
        marginTop: '20%',

    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
        // backgroundColor:'blue'
    },
    title: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'RobotoBold',
        // marginTop:5,
        marginLeft: 20,
        marginBottom: 2

    },
    category: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'RobotoRegular',
        marginBottom: 10
    },
    textContainer: {
        height: 125,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // backgroundColor:'red',
        marginTop: 100
    },
    aboutLabel: {
        fontSize: 19,
        color: Colors.primary,
        alignItems: 'flex-start',
        fontFamily: 'RobotoBold',
        marginLeft: '5%',
        marginTop: 10,
    },
    description: {
        fontSize: 14,
        alignItems: "flex-start",
        textAlign: 'center',
        marginLeft: '14%',
        fontFamily: 'Regular',
        color: 'black',
        
    },
    addressLabel: {
        fontSize: 19,
        color: Colors.primary,
        alignItems: 'flex-start',
        fontFamily: 'RobotoBold',
        marginLeft: '5%',
        marginTop: 5,
    },
    address: {
        fontSize: 14,
        alignItems: "flex-start",
        textAlign: 'center',
        marginLeft: '10%',
        fontFamily: 'Regular'

    },
    detailsLabelContainer:{
        height:25,
        width:'100%',
        // backgroundColor:'black',
        flexDirection:'row',
        marginTop:20
    
    },
    one:{
        height:'100%',
        width:'30%',
        // backgroundColor:'green',
        marginLeft:'3%',
        alignItems:'center',
    },
    detailsContainer:{
        height:30,
        width:'100%',
        // backgroundColor:'red',
        flexDirection:'row',
        

    },
    two:{
        height:'100%',
        width:'30%',
        // backgroundColor:'white',
        marginLeft:'3%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        borderWidth:2,
        borderColor:Colors.primary
    },
    detailsLabelText:{
        fontFamily:'RobotoBold',
        fontSize:14,
        padding:2
    },
    detailsText:{
        fontFamily:'RobotoLight',
        color:Colors.accent,
        fontSize:10
    },
    buttonContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:25
    }
});

export default DoctorProfileItem;