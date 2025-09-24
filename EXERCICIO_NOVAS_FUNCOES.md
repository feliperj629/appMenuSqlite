# 📋 Passo a Passo: Implementar Botões de Alterar e Excluir

Este guia mostra como adicionar funcionalidades de edição e exclusão de usuários no seu app React Native.

## 🎯 Objetivo
Adicionar botões "Editar" e "Deletar" na lista de usuários para permitir modificação e remoção de registros.

---

## 📝 PASSO 1: Atualizar o Banco de Dados

### 1.1 Adicionar funções no `db/database.js`

```javascript
// Adicionar estas funções no final do arquivo database.js

/**
 * ATUALIZAR USUÁRIO EXISTENTE
 * Modifica os dados de um usuário específico
 */
export async function atualizarUsuario(id, nome, email, telefone) {
    try {
        if (!db) await initDB();

        const result = await db.runAsync(
            'UPDATE usuarios SET nome = ?, email = ?, telefone = ? WHERE id = ?;',
            [nome, email, telefone, id]
        );
        return result;
    } catch (error) {
        console.error('Erro ao atualizar usuario:', error);
        throw error;
    }
}

/**
 * DELETAR USUÁRIO
 * Remove um usuário específico do banco de dados
 */
export async function deletarUsuario(id) {
    try {
        if (!db) await initDB();

        const result = await db.runAsync(
            'DELETE FROM usuarios WHERE id = ?;',
            [id]
        );
        return result;
    } catch (error) {
        console.error('Erro ao deletar usuario:', error);
        throw error;
    }
}
```

---

## 📝 PASSO 2: Atualizar a Tela de Cadastro para Suportar Edição

### 2.1 Modificar imports no `screens/CadastroScreen.js`

```javascript
// ALTERAR esta linha:
import React, { useState } from 'react';

// PARA:
import React, { useState, useEffect } from 'react';

// ALTERAR esta linha:
import { inserirUsuario } from '../db/database';

// PARA:
import { inserirUsuario, atualizarUsuario } from '../db/database';
```

### 2.2 Atualizar a função do componente

```javascript
// ALTERAR esta linha:
export default function CadastroScreen({ navigation }) {

// PARA:
export default function CadastroScreen({ navigation, route }) {
```

### 2.3 Adicionar estados para modo de edição

```javascript
// ADICIONAR após os estados existentes:
const [modoEdicao, setModoEdicao] = useState(false);
const [usuarioId, setUsuarioId] = useState(null);
```

### 2.4 Adicionar useEffect para detectar edição

```javascript
// ADICIONAR após os estados:
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
```

### 2.5 Atualizar função enviarDados

```javascript
// SUBSTITUIR a função enviarDados existente por:
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
```

### 2.6 Atualizar botão

```javascript
// ALTERAR esta linha:
<Button title="Enviar" onPress={enviarDados} />

// PARA:
<Button 
    title={modoEdicao ? "Atualizar" : "Cadastrar"} 
    onPress={enviarDados} 
/>
```

---

## 📝 PASSO 3: Atualizar a Tela de Consulta

### 3.1 Modificar imports no `screens/ConsultaScreen.js`

```javascript
// ALTERAR esta linha:
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

// PARA:
import { View, Text, StyleSheet, FlatList, Button, Alert, TouchableOpacity } from 'react-native';

// ALTERAR esta linha:
import { listarUsuarios } from '../db/database';

// PARA:
import { listarUsuarios, deletarUsuario } from '../db/database';
```

### 3.2 Adicionar funções de ação

```javascript
// ADICIONAR após a função carregarUsuarios:

const confirmarDeletar = (id, nome) => {
    Alert.alert(
        'Confirmar Exclusão',
        `Tem certeza que deseja deletar o usuário "${nome}"?`,
        [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Deletar', style: 'destructive', onPress: () => deletarUsuarioConfirmado(id) }
        ]
    );
};

const deletarUsuarioConfirmado = async (id) => {
    try {
        await deletarUsuario(id);
        alert('Usuário deletado com sucesso!');
        carregarUsuarios();
    } catch (error) {
        alert('Erro ao deletar usuário: ' + error.message);
    }
};

const editarUsuario = (usuario) => {
    navigation.navigate('Cadastro', { 
        usuario: usuario,
        modoEdicao: true 
    });
};
```

### 3.3 Adicionar useEffect para atualização automática

```javascript
// ADICIONAR após o useEffect existente:
useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        carregarUsuarios();
    });
    return unsubscribe;
}, [navigation]);
```

### 3.4 Atualizar renderItem

```javascript
// SUBSTITUIR a função renderItem existente por:
const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.telefone}>{item.telefone}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => editarUsuario(item)}
            >
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => confirmarDeletar(item.id, item.nome)}
            >
                <Text style={styles.buttonText}>Deletar</Text>
            </TouchableOpacity>
        </View>
    </View>
);
```

### 3.6 Atualizar estrutura da interface

```javascript
// SUBSTITUIR o return da ConsultaScreen por:
return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Lista de Usuários</Text>
        <Button
            title="Cadastrar Usuario"
            onPress={() => navigation.navigate('Cadastro')}
        />

        <FlatList 
            style={styles.flatList}
            data={usuarios}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={
                <Text style={styles.emptyText}>Nenhum usuário cadastrado</Text>
            }
            showsVerticalScrollIndicator={true}
        />
    </View>
);
```

### 3.5 Atualizar estilos

```javascript
// SUBSTITUIR todos os estilos existentes por:
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5'
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
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoContainer: {
        flex: 1
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 2
    },
    telefone: {
        fontSize: 16,
        color: '#666'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10
    },
    editButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5
    },
    deleteButton: {
        backgroundColor: '#f44336',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20
    },
    flatList: {
        marginTop: 10
    }
});
```

---

## 🧪 PASSO 4: Testar as Funcionalidades

### 4.1 Teste de Edição
1. Cadastre um usuário
2. Na lista, clique em "Editar"
3. Modifique os dados
4. Clique em "Atualizar"
5. Verifique se os dados foram alterados

### 4.2 Teste de Exclusão
1. Na lista, clique em "Deletar"
2. Confirme a exclusão no alert
3. Verifique se o usuário foi removido da lista

---

## ✅ Resultado Final

Após seguir todos os passos, você terá:

- ✅ Botão "Editar" (azul) em cada usuário da lista
- ✅ Botão "Deletar" (vermelho) em cada usuário da lista
- ✅ Confirmação antes de deletar
- ✅ Tela de cadastro que funciona tanto para criar quanto editar
- ✅ Atualização automática da lista após operações

## 🎯 Funcionalidades Implementadas

- **CREATE**: Cadastrar novos usuários
- **READ**: Listar todos os usuários
- **UPDATE**: Editar usuários existentes
- **DELETE**: Remover usuários

Agora seu app tem operações CRUD completas! 🎉

---

## 💡 Dicas Extras

### 🎨 Melhorias de Interface
- Adicione `style={styles.flatList}` no FlatList para melhor espaçamento
- Use `showsVerticalScrollIndicator={true}` para mostrar indicador de rolagem
- Considere adicionar ícones nos botões para melhor UX
- Use cores consistentes em todo o app

### 🔧 Melhorias de Funcionalidade
- Adicione validação de email no formato correto
- Implemente busca/filtro de usuários
- Adicione confirmação antes de editar também

### 📱 Melhorias de Performance
- Use `useCallback` para otimizar funções
- Implemente paginação para listas grandes
- Adicione loading states durante operações

### 🛡️ Melhorias de Segurança
- Valide todos os inputs do usuário
- Use prepared statements (já implementado)
- Adicione tratamento de erros mais robusto
