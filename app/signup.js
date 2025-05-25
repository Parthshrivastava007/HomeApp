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

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleSignup = async () => {
    if (!username.trim() || !email.trim() || !password) return;
    if (!isValidEmail(email)) return;

    const user = { username, email, password };

    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setSuccessMessage("User created successfully!");

      setTimeout(() => {
        setSuccessMessage("");
        router.replace("/login");
      }, 1500);
    } catch (error) {
      console.error("Failed to save user", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a New Account</Text>

      <TextInput
        style={[
          styles.input,
          emailTouched && !isValidEmail(email) && styles.invalidInput,
        ]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        onBlur={() => setEmailTouched(true)}
      />
      {emailTouched && !isValidEmail(email) && (
        <Text style={styles.errorText}>Please enter a valid email address</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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

      <Button title="Sign Up" onPress={handleSignup} />

      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 16,
  },
  invalidInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginTop: -12,
    marginBottom: 12,
    marginLeft: 4,
  },
  successText: {
    color: "green",
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
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
});
