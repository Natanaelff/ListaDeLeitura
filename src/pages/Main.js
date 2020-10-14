import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';



const Main = ({navigation}) => {

    const [books, setBooks] = useState([]);

    useEffect (() => {
        
        const data = AsyncStorage.getItem("books").then(data => {
            const book = JSON.parse(data);
            setBooks(book);
        })
    
    }, []);

    const onNewSave = () => {
        navigation.navigate('Book');
    };

    const onBookEdit = (bookId) => {
       const book = books.find(item => item.id === bookId)
       navigation.navigate('Book', {book: book, isEdit: true});
    };

    const onBookDelete = async (bookId) => {
        const newBooks = books.filter(item => item.id !== bookId);
        await AsyncStorage.setItem("books", JSON.stringify(newBooks));
        setBooks(newBooks);
    }

    const onBookRead = async (bookId) => {
        const newBooks = books.map(item => {
            if(item.id === bookId) {
                item.read = !item.read; // false -> true / true -> false
            }
             return item;
             
        });
            await AsyncStorage.setItem("books", JSON.stringify(newBooks));
            setBooks(newBooks);

    }

    return (
        <View style={styles.container}> 
            <View style={styles.toolBox}>
                <Text style={styles.title}>Lista de Tarefas</Text>
                <TouchableOpacity onPress={onNewSave} style={styles.add}>
                    <Icon name="add" size={30} color={"#fff"} />
                </TouchableOpacity>
            </View>
            <FlatList 
                data={books} 
                keyExtractor={item => item.id} 
                renderItem={({item}) => (
                    <View style={styles.viewContainer}>
                        <TouchableOpacity style={styles.item} onPress={() => onBookRead(item.id)}>
                            <Text style={[styles.itemText, item.read ? styles.read : styles.itemText]}>{item.title}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.edit} onPress={() => onBookEdit(item.id)}>
                            <Icon name="create" size={25} color={"#3498db"} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.delete} onPress={() => onBookDelete(item.id)}>
                            <Icon name="delete" size={25} color={"#2c3e50"} />
                        </TouchableOpacity>
                    </View>
                )} 
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingTop: 40,
        backgroundColor: "#f0ee87",
    }, 

    toolBox: {
        flexDirection: "row",
        marginBottom: 25,
    },
    
    title: {
        fontSize: 30,
        flex: 1,
        color: "#16a085",
    },

    add: {
        width: 40,
        height: 40,
        backgroundColor: "#16a085",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },

    viewContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#d7dd75",
    },

    item: {
        flex: 1,
    },

    edit: {
        marginVertical: 15,
    },

    delete: {
        marginVertical: 15,
    },

    read: {
        textDecorationLine: "line-through",
        color: "#c44569",
    },

    itemText: {
        fontSize: 25,
        color: "#000",
        marginVertical: 15,
    },
});

export default Main;