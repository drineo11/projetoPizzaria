import React, {useContext} from "react"
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
    const { signOut } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
           <Text style={styles.title}>Novo Pedido</Text>
           <TextInput
            placeholder="Numero da Mesa"
            placeholderTextColor="#f0f0f0"
            style={styles.input}
            keyboardType="numeric"
           />

           <TouchableOpacity style={styles.button}>
               <Text style={styles.buttonText}>Abrir Mesa</Text>
            </TouchableOpacity>
           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#1d1d2e',

    },
    title:{
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input:{
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: '#fff',
    },
    button:{
        width: '90%',
        height: 40,
        backgroundColor: '#3FFFA3',
        borderRadius: 4,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
      
    },
    buttonText:{
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold',
    },
    
})