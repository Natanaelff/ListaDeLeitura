import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Book = ({navigation}) => {

    const book = navigation.getParam("book", {
        title: '',
        description: '',
        read: false,
        photo: '',
    });

    const isEdit = navigation.getParam("isEdit", false);

    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState (book.title);
    const [description, setDescripition] = useState (book.description);
    const [read, setRead] = useState (book.read);
    const [photo, setPhoto] = useState(book.photo);

    useEffect (() => {
        
        const data = AsyncStorage.getItem("books").then(data => {
            const book = JSON.parse(data);

            setBooks(book);
        })
    
    }, []);

    const isValid = () => {
        if (title !== undefined && title !== '') {
            return true;
        }
            return false;
    };

    const onSave = async () => {
        
        if (isValid()) {

            if (isEdit) {

                let newBooks = books;

                newBooks.map(item => {
                    if(item.id === book.id) {
                        item.title = title;
                        item.description = description;
                        item.read = read;
                        item.photo = photo;
                    }
                     return item;
                });

                await AsyncStorage.setItem('books',JSON.stringify(newBooks));

            } else {
                const id = Math.random(5000).toString();

                const data = {
                    id,
                    title,
                    description,
                    photo,
                };

                books.push(data);
                await AsyncStorage.setItem('books',JSON.stringify(books));

            }
            
            
            navigation.goBack();

        } else {
            alert('Você ainda não adicionou o Título');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Inclua sua nova tarefa..</Text>
            <TextInput 
                placeholder="Título"
                style={styles.input}
                value={title}
                onChangeText={(text) => {
                    setTitle(text)
                }}
            />  
            <TextInput 
                placeholder="Descrição"
                style={styles.input}
                multiline={true}
                numberOfLines={5}
                value={description}
                onChangeText={(text) => {
                    setDescripition(text)
                }}
            />

            <View style={styles.ViewTouch}>
                <TouchableOpacity style={styles.addButton} onPress={onSave}>
                    <Text style={styles.addText}>{isEdit ? "Atualizar" : "Adicionar"}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {navigation.goBack();}} style={styles.cancelButton}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
      flex: 1,
      padding: 50,
      backgroundColor: "#dfe6e9",
    },

    pageTitle: {
        textAlign: "center",
        fontSize: 30,
        color: "#e74c3c",
        marginBottom: 30,
    },

    input: {
        fontSize: 16,
        borderBottomColor: "#e74c3c",
        borderBottomWidth: 1,
        marginBottom: 20,
    },  

    camera: {
        width: 45,
        height: 45,
        backgroundColor: "#e74c3c",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginBottom: 30,
        
    },

    ViewTouch: {
        alignItems:"center",
        marginVertical:30,
    },

    addButton: {
        backgroundColor: "#e74c3c",
        padding: 20,
        borderRadius: 8,
        marginBottom: 30,
    },  

    addText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },

    cancelButton: {
        backgroundColor: "#95a5a6",
        padding: 15,
        borderRadius: 8,
    },  

    cancelText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
  
    },


});

export default Book;