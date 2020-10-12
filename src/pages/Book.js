import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Book = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Inclua sua nova tarefa..</Text>
            <TextInput 
                placeholder="Título"
                style={styles.input}
            />  
            <TextInput 
                placeholder="Descrição"
                style={styles.input}
                multiline={true}
                numberOfLines={5}
            />

            <View style={styles.ViewTouch}>
                <TouchableOpacity style={styles.camera}>
                    <Icon name="photo-camera" size={25} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addText}>Adicionar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton}>
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
    },

    pageTitle: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 20,
    },

    input: {
        fontSize: 16,
        borderBottomColor: "#e74c3c",
        borderBottomWidth: 1,
        marginBottom: 10,
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
    },

    addButton: {
        backgroundColor: "#e74c3c",
        padding: 10,
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
        padding: 10,
        borderRadius: 8,
    },  

    cancelText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
  
    },


});

export default Book;