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

### 4. Atualizar App.js para usar Drawer Navigator

**Arquivo: `App.js`**

Substitua o conteúdo do arquivo:

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroScreen from './screens/CadastroScreen';
import ConsultaScreen from './screens/ConsultaScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator para as telas de cadastro
function CadastroStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cadastro"
        component={CadastroScreen}
        options={{ title: 'Cadastrar Usuário' }}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator para as telas de consulta
function ConsultaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Consulta"
        component={ConsultaScreen}
        options={{ title: 'Lista de Usuários' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Consulta"
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
          name="Consulta"
          component={ConsultaStack}
          options={{
            title: 'Lista de Usuários',
            drawerLabel: 'Lista de Usuários',
          }}
        />
        <Drawer.Screen
          name="Cadastro"
          component={CadastroStack}
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

### 5. Verificar Dependências

Execute o comando para verificar se todas as dependências estão corretas:

```bash
npx expo-doctor
```

Deve retornar: `17/17 checks passed. No issues detected!`

### 6. Testar o Projeto

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
│   ├── ConsultaStack
│   │   └── ConsultaScreen
│   └── CadastroStack
│       └── CadastroScreen
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
