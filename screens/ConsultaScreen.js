import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { listarUsuarios } from '../db/database';

export default function ConsultaScreen({ navigation }) {
    const [usuarios, setUsuarios] = useState([]);

    const carregarUsuarios = async () => {
        try {
            const listaUsuarios = await listarUsuarios();
            setUsuarios(listaUsuarios);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    };

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.telefone}>{item.telefone}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Cadas Usuários</Text>
            <Button
                title="Cadastrar Usuario"
                onPress={() => navigation.navigate('Cadastro')}
            />


            <View style={styles.buttonContainer}>
                <Text style={styles.titulo}>Lista de Usuários Cadastrados com SQLite</Text>
                <FlatList
                    data={usuarios}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Nenhum usuário cadastrado</Text>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    buttonContainer: {
        marginBottom: 20
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 20
    },
    itemContainer: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 2
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    email: {
        fontSize: 16,
        color: '#666'
    },
    telefone: {
        fontSize: 16,
        color: '#666'
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20
    }
});