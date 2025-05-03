# Foro 2: Login Firebase

Ramos Jiménez, Jairo Dennis – RJ172021

Villegas Hernández, José Manuel – VH201183

Vásquez Rodríguez, Denis Josué – VR222731

Velásquez Rodríguez, Jorge Alberto – VR210280


# LoginFirebaseApp

Aplicación desarrollada con **React Native**, **Expo**, y **Firebase**, que permite a los usuarios iniciar sesión utilizando correo/contraseña o autenticación con Google.

---

## 📱 Funcionalidades

- Login con correo electrónico y contraseña (Firebase Auth)
- Login con cuenta de Google (Google OAuth 2.0)
- Redirección a pantalla de bienvenida después del login
- Logout funcional

---

## 📂 Estructura de archivos clave

### `/screens/LoginScreen.js`

Pantalla principal de autenticación:

- `signInWithEmailAndPassword` para login con correo.
- `expo-auth-session` + `GoogleAuthProvider` para login con Google.
- Redirección con `useRouter()` hacia `/home`.

---

### `/firebase.js`

Configuración de Firebase:

- Inicializa la app de Firebase.
- Exporta `auth` para usarlo globalmente.

---

### `/app/home.js` o `/app/home/index.js`

Pantalla de bienvenida:

- Muestra mensaje: `Bienvenido/a (correo electrónico)`.
- Botón para cerrar sesión y redirigir a `/login`.

---




