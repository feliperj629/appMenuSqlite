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