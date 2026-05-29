import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import PedidosScreen from './src/screens/PedidosScreen';
import FormPedidoScreen from './src/screens/FormPedidoScreen';
import DetalhePedidoScreen from './src/screens/DetalhePedidoScreen';
import MensagensScreen from './src/screens/MensagensScreen';
import PerfilScreen from './src/screens/PerfilScreen';

const Stack = createNativeStackNavigator();

const roxoPrincipal = '#9B6DFF';
const fundoApp = '#EEE5FF';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={roxoPrincipal} />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: roxoPrincipal,
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: '900',
              color: '#FFFFFF',
            },
            headerBackTitleVisible: false,
            contentStyle: {
              backgroundColor: fundoApp,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'EstudaJunto' }}
          />

          <Stack.Screen
            name="Pedidos"
            component={PedidosScreen}
            options={{ title: 'Comunidade' }}
          />

          <Stack.Screen
            name="Formulario"
            component={FormPedidoScreen}
            options={{ title: 'Cadastro' }}
          />

          <Stack.Screen
            name="Detalhe"
            component={DetalhePedidoScreen}
            options={{ title: 'Detalhes' }}
          />

          <Stack.Screen
            name="Mensagens"
            component={MensagensScreen}
            options={{ title: 'Mensagens' }}
          />

          <Stack.Screen
            name="Perfil"
            component={PerfilScreen}
            options={{ title: 'Perfil' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}