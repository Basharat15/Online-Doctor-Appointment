import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import Color from '../../constants/Colors'

const CardItem = props => {
    return (
        <View style={styles.Carditem}>
            <View style={styles.itemData}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.title}>{props.category}</Text>
                
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Carditem: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 11,
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#888',
        margin: 15
    },
    itemData: {
        flexDirection: 'row',
        marginBottom: 3
    },
    qauntity: {
        fontFamily: 'Bold',
        fontSize: 15,
        color: Color.primary
    },
    Amount: {
        fontFamily: 'Regular',
        fontSize: 15,
        color: '#888',

    },
    title: {
        fontFamily: 'Regular',
        fontSize: 15,
        color: 'black'
    }
});
export default CardItem;
