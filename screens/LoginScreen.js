// screens/LoginScreen.js
import { useRouter } from 'expo-router';
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { auth } from '../firebase';

import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [request, response, promptAsync] = useIdTokenAuthRequest({
    clientId: '1079201234083-kp42u1r16tir3tq52e8ouaobijur4bbm.apps.googleusercontent.com',
  });
  

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication?.idToken) {
        const credential = GoogleAuthProvider.credential(response.authentication.idToken);
  
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            const user = userCredential.user;
            Alert.alert('Bienvenido', user.email);
            router.replace({
              pathname: '/home',
              params: { email: user.email },
            });
          })
          .catch((error) => {
            Alert.alert('Error', error.message);
          });
      } else {
        console.warn('⚠️ Login con Google exitoso pero no se recibió idToken:', response);
      }
    }
  }, [response]);
  
  
  
  

  const handleLoginEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logueado con:', user.email);
        Alert.alert('Éxito', `Bienvenido ${user.email}`);

        router.replace({
          pathname: '/home',
          params: { email: user.email },
        });
      })
      .catch(error => {
        console.log('Error en login:', error.message);
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Iniciar sesión" onPress={handleLoginEmail} />

      <View style={{ height: 20 }} />

      <Button
        title="Iniciar sesión con Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F1F1F1',
    marginBottom: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
