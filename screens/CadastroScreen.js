import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { inserirUsuario, atualizarUsuario } from '../db/database';

export default function CadastroScreen({ navigation, route }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioId, setUsuarioId] = useState(null);

    // useEffect - Função para enviar e atualizar os dados do usuário no banco de dados
    useEffect(() => {
        if (route?.params?.usuario && route?.params?.modoEdicao) {
            const usuario = route.params.usuario;
            setNome(usuario.nome);
            setEmail(usuario.email);
            setTelefone(usuario.telefone);
            setUsuarioId(usuario.id);
            setModoEdicao(true);
        }
    }, [route?.params]);

    // Função para enviar e atualizar os dados do usuário no banco de dados
    const enviarDados = async () => {
        if (!nome || !email || !telefone) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        try {
            if (modoEdicao) {
                await atualizarUsuario(usuarioId, nome, email, telefone);
                alert('Usuário atualizado com sucesso!');
            } else {
                await inserirUsuario(nome, email, telefone);
                alert('Usuário cadastrado com sucesso!');
            }
            navigation.navigate('Consulta');
        } catch (error) {
            alert(`Erro ao ${modoEdicao ? 'atualizar' : 'cadastrar'} usuário: ` + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome"
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu email"
                keyboardType="email-address"
            />
            <Text style={styles.label}>Telefone:</Text>
            <TextInput
                style={styles.input}
                value={telefone}
                onChangeText={setTelefone}
                placeholder="Digite seu telefone"
                keyboardType="phone-pad"
            />
            <View style={styles.buttonContainer}>
                <Button title="Voltar" onPress={() => navigation.goBack()} />
                <Button title={modoEdicao ? "Atualizar" : "Cadastrar"} onPress={enviarDados} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, justifyContent: 'center' },
    label: { fontSize: 18, marginBottom: 5 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    }
});