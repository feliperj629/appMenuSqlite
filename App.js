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