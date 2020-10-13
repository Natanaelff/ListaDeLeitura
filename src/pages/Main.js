import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';



const Main = ({navigation}) => {

    const [books, setBooks] = useState([]);

    useEffect (() => {
        
        const data = AsyncStorage.getItem("books").then(data => {
            const book = JSON.parse(data);
            setBooks(book);
        })
    
    }, []);

    const data = [];

    return (
        <View style={styles.container}> 
            <View style={styles.toolBox}>
                <Text style={styles.title}>Lista de tarefas</Text>
                <TouchableOpacity onPress={() => {navigation.navigate("Book")}} style={styles.add}>
                    <Icon name="add" size={14} color={"#fff"} />
                </TouchableOpacity>
            </View>
            <FlatList 
                data={books} 
                keyExtractor={item => item.id} 
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.item}>
                        <Text style={styles.itemText}>{item.title}</Text>
                    </TouchableOpacity>
                )} 
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    }, 

    toolBox: {
        flexDirection: "row",
        marginBottom: 5,
    },
    
    title: {
        fontSize: 16,
        flex: 1,
        color: "#16a085",
    },

    add: {
        width: 22,
        height: 22,
        backgroundColor: "#16a085",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },

    item: {

    },

    itemText: {
        fontSize: 16,

    },
});

export default Main;