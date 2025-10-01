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