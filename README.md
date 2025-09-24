# Tutorial: Criando um App React Native com SQLite

Este é um projeto desenvolvido em sala de aula como exercício prático. O tutorial irá guiá-lo na criação de um aplicativo React Native simples com funcionalidades de cadastro e consulta usando SQLite.

## 📱 Pré-requisitos

- Node.js instalado
- Um editor de código (VS Code recomendado)
- Expo Go instalado no seu celular

## 🚀 Passo 1: Criando o Projeto

1. Crie um novo projeto Expo usando o template blank:
```bash
npx create-expo-app --template 
```
Escolha a opção "blank"

Dê um nome ao projeto ex.: "appMenuSqlite"

```bash
cd appMenuSqlite
```

2. Instale as dependências necessárias:
```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install expo-sqlite
```

## 📁 Passo 2: Estrutura do Projeto

Crie a seguinte estrutura de diretórios:
```
appMenuSqlite/
├── screens/
│   ├── CadastroScreen.js
│   └── ConsultaScreen.js
├── db/
│   └── database.js
└── App.js
```

## 💾 Passo 3: Configurando o Banco de Dados

Crie o arquivo `db/database.js`:

```javascript
import * as SQLite from 'expo-sqlite';

let db;

export async function initDB() {
    try {
        if (!db) {
            db = await SQLite.openDatabaseAsync('meubanco.db');
            
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    email TEXT NOT NULL
                );
            `);
        }
    } catch (error) {
        console.error('Erro ao inicializar banco:', error);
        throw error;
    }
}

export async function inserirUsuario(nome, email) {
    try {
        if (!db) await initDB();
        
        const result = await db.runAsync(
            'INSERT INTO usuarios (nome, email) VALUES (?, ?);',
            [nome, email]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir usuario:', error);
        throw error;
    }
}

export async function listarUsuarios() {
    try {
        if (!db) await initDB();
        
        const result = await db.getAllAsync('SELECT * FROM usuarios;');
        return result;
    } catch (error) {
        console.error('Erro ao listar usuarios:', error);
        throw error;
    }
}
```

## 📱 Passo 4: Criando as Telas

### Tela de Cadastro (`screens/CadastroScreen.js`):

```javascript
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { inserirUsuario } from '../db/database';

export default function CadastroScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const enviarDados = async () => {
        if (!nome || !email) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        try {
            await inserirUsuario(nome, email);
            alert('Usuário cadastrado com sucesso!');
            navigation.navigate('Consulta');
        } catch (error) {
            alert('Erro ao cadastrar usuário: ' + error.message);
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
            <View style={styles.buttonContainer}>
                <Button title="Voltar" onPress={() => navigation.goBack()} />
                <Button title="Enviar" onPress={enviarDados} />
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
```

### Tela de Consulta (`screens/ConsultaScreen.js`):

```javascript
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
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Usuários</Text>
            <Button 
                title="Cadastrar Usuario" 
                onPress={() => navigation.navigate('Cadastro')} 
            />
            <FlatList
                data={usuarios}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhum usuário cadastrado</Text>
                }
            />
        </View>
    );
}

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
        textAlign: 'center'
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
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20
    }
});
```

## 🔄 Passo 5: Configurando a Navegação

Atualize o arquivo `App.js`:

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroScreen from './screens/CadastroScreen';
import ConsultaScreen from './screens/ConsultaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Consulta">
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ title: 'Cadastrar Usuário' }}
        />
        <Stack.Screen 
          name="Consulta" 
          component={ConsultaScreen} 
          options={{ title: 'Lista de Usuários' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## 🚀 Passo 6: Executando o Projeto

1. Inicie o projeto:
```bash
npx expo start
```

2. Escaneie o QR code com o aplicativo Expo Go no seu celular

### 🌐 Opções de Conexão

#### Modo Local (padrão)
```bash
npx expo start
```
- Funciona apenas na mesma rede Wi-Fi
- Mais rápido e estável

#### Modo LAN (--lan)
```bash
npx expo start --lan
```
**Quando usar `--lan`:**
- ✅ Quando o modo local não funciona
- ✅ Para conectar dispositivos na mesma rede local
- ✅ Mais rápido que tunnel, mas ainda requer mesma rede

#### Modo Tunnel (--tunnel)
```bash
npx expo start --tunnel
```
**Quando usar `--tunnel`:**
- ✅ Quando você e o dispositivo estão em redes Wi-Fi diferentes
- ✅ Quando há problemas de firewall na rede local
- ✅ Para demonstrar o app para outras pessoas remotamente
- ✅ Quando os outros modos não funcionam

**Nota:** O modo tunnel pode ser mais lento que os outros modos, mas oferece maior compatibilidade de rede.

#### Limpar Cache (--clear)
```bash
npx expo start --clear
```
**Quando usar `--clear`:**
- ✅ Quando há problemas de cache do Expo
- ✅ Quando o app não atualiza após mudanças no código
- ✅ Quando há erros estranhos ou comportamentos inesperados
- ✅ Após atualizar dependências do projeto

**Dica:** Você pode combinar com outros modos:
```bash
npx expo start --tunnel --clear
npx expo start --lan --clear
```

## 📝 Sobre o Projeto

Este projeto foi desenvolvido em sala de aula como exercício prático para aprendizado de:
- React Native com Expo
- Navegação entre telas
- Banco de dados SQLite local
- Operações CRUD (Create, Read, Update, Delete)
- Interface de usuário responsiva

## 📚 Finalidade Educacional

Este projeto é destinado exclusivamente para fins educacionais e demonstração de conceitos básicos de desenvolvimento mobile.

## 📝 Observações

- Este é um exemplo básico que pode ser expandido conforme suas necessidades
- O banco de dados SQLite é local e os dados persistem entre sessões
- Você pode adicionar mais funcionalidades como edição e exclusão de registros
- Considere adicionar validações mais robustas nos formulários
- Para um projeto real, considere usar um backend para persistência dos dados

## 🤝 Contribuição

Sinta-se à vontade para contribuir com melhorias, correções ou novas funcionalidades para fins de aprendizado! 