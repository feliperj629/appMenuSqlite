# Tutorial: Convertendo Menu Stack para Menu Lateral (Drawer)

Este tutorial mostra como converter um projeto React Native com navegação Stack para usar um menu lateral (Drawer Navigator).

## 📋 Pré-requisitos

- Projeto React Native com Expo
- React Navigation já configurado
- Node.js e npm instalados

## 🚀 Passo a Passo

### 1. Instalar Dependências do Drawer Navigator

```bash
npm install @react-navigation/drawer react-native-gesture-handler react-native-reanimated
```

### 2. Instalar Dependências Peer (Obrigatórias)

```bash
npx expo install react-native-safe-area-context react-native-screens react-native-worklets
```

### 3. Configurar react-native-gesture-handler

**Arquivo: `index.js`**

Adicione a importação no topo do arquivo:

```javascript
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
```

### 4. Criar HomeScreen (Opcional)

**Arquivo: `screens/HomeScreen.js`**

Crie uma tela inicial para o aplicativo:

```javascript
import { View, Text, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Home</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Cadastrar Usuario"
                    onPress={() => navigation.navigate('Cadastro')}
                />
                <Button
                    title="Consultar Usuários"
                    onPress={() => navigation.navigate('Consulta')}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Esta é a tela inicial do aplicativo.</Text>
                <Text style={styles.text}>Clique nos botões acima para navegar pelas telas.</Text>
                <Text style={styles.text}>Clique no botão de menu lateral para abrir o menu lateral.</Text>
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
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10
    },
    text: {
        fontSize: 16,
        color: '#000',
        marginTop: 20,
        fontWeight: 'bold'
    },
    textContainer: {
        flexDirection: 'column'
    }
});
```

### 5. Atualizar App.js para usar Drawer Navigator

**Arquivo: `App.js`**

Substitua o conteúdo do arquivo:

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CadastroScreen from './screens/CadastroScreen';
import ConsultaScreen from './screens/ConsultaScreen';
import HomeScreen from './screens/HomeScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            drawerLabel: 'Home',
          }}
        />
        <Drawer.Screen
          name="Consulta"
          component={ConsultaScreen}
          options={{
            title: 'Lista de Usuários',
            drawerLabel: 'Lista de Usuários',
          }}
        />
        <Drawer.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{
            title: 'Cadastrar Usuário',
            drawerLabel: 'Cadastrar Usuário',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```

### 6. Verificar Dependências

Execute o comando para verificar se todas as dependências estão corretas:

```bash
npx expo-doctor
```

Deve retornar: `17/17 checks passed. No issues detected!`

### 7. Testar o Projeto

```bash
npx expo start
```

## 🎯 Como Usar o Menu Lateral

### Abrir o Menu:
- **Deslizar da borda esquerda** da tela
- **Tocar no ícone de menu** (☰) no header

### Navegar:
- Tocar em qualquer item do menu lateral
- O menu fecha automaticamente após a navegação

## 📱 Estrutura Final

```
App.js
├── Drawer.Navigator
│   ├── HomeScreen (tela inicial)
│   ├── ConsultaScreen
│   └── CadastroScreen
```


## ⚠️ Problemas Comuns e Soluções

### Erro "runtime not ready":
- **Causa**: Dependências peer ausentes
- **Solução**: Execute `npx expo install react-native-safe-area-context react-native-screens react-native-worklets`

### Menu não abre:
- **Causa**: `react-native-gesture-handler` não configurado
- **Solução**: Adicione `import 'react-native-gesture-handler';` no topo do `index.js`

### Erro de navegação:
- **Causa**: Nomes de rotas inconsistentes
- **Solução**: Verifique se os nomes das rotas no Drawer correspondem aos usados nas telas

## 📚 Dependências Finais

```json
{
  "dependencies": {
    "@react-navigation/drawer": "^7.5.8",
    "@react-navigation/native": "^7.1.17",
    "@react-navigation/native-stack": "^7.3.26",
    "react-native-gesture-handler": "^2.28.0",
    "react-native-reanimated": "^4.1.2",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "react-native-worklets": "0.5.1"
  }
}
```

## ✅ Resultado Final

Após seguir este tutorial, você terá:
- ✅ Menu lateral funcional
- ✅ Tela inicial (Home) com navegação
- ✅ Navegação entre telas
- ✅ Header personalizado
- ✅ Gestos de swipe para abrir/fechar
- ✅ Compatibilidade com Expo

## 🎉 Conclusão

O projeto agora usa um menu lateral moderno e intuitivo, mantendo toda a funcionalidade original das telas de cadastro e consulta de usuários.

---

**Data de criação**: $(date)  
**Versão**: 1.0  
**Compatibilidade**: Expo SDK 54.0.0, React Navigation 7.x
