import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const parsedUser = JSON.parse(savedUser);

      if (
        parsedUser &&
        (parsedUser.username === loginInput.trim() ||
          parsedUser.email === loginInput.trim()) &&
        parsedUser.password === password
      ) {
        setError("");
        router.replace("/Home");
      } else {
        setError("Invalid username/email or password");
      }
    } catch (e) {
      setError("Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username or Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username/email"
        value={loginInput}
        onChangeText={setLoginInput}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Login" onPress={handleLogin} />

      <View style={styles.signupContainer}>
        <Text style={{ marginRight: 4 }}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 8,
  },
  eyeIcon: {
    padding: 4,
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
  signupContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
