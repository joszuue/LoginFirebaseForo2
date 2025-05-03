import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';

export default function HomeScreen({ route }) {
  const { email } = route.params || {};
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  useEffect(() => {
    // Verificar si hay usuario autenticado
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });

    // Limpieza de suscripción
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.replace('/login');
      })
      .catch(error => {
        console.log('Error cerrando sesión:', error.message);
        Alert.alert('Error', error.message);
      });
  };

  // Mostrar cargando mientras verifica
  if (userLoggedIn === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Si no está logueado
  if (!userLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.noAccessText}>❌ No tienes acceso. Debes iniciar sesión.</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => router.replace('/login')}>
          <Text style={styles.loginText}>Ir al Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Si está logueado
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido/a</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.subtitle}>Proyecto creado con React Native y Firebase</Text>

      <View style={styles.integrantesContainer}>
        <Text style={styles.integrantesTitle}>Integrantes del equipo:</Text>
        <Text style={styles.integrante}>Ramos Jiménez, Jairo Dennis - RJ172021</Text>
        <Text style={styles.integrante}>Villegas Hernández, José Manuel - VH201183</Text>
        <Text style={styles.integrante}>Vásquez Rodríguez, Denis Josué - VR222731</Text>
        <Text style={styles.integrante}>Velásquez Rodríguez, Jorge Alberto - VR210280</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
  },
  integrantesContainer: {
    marginTop: 20,
    marginBottom: 50,
  },
  integrantesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  integrante: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    color: '#444',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    position: 'absolute',
    bottom: 30,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noAccessText: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#3971FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
