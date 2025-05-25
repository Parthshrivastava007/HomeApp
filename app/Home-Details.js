import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeDetails() {
  const router = useRouter();
  const {
    latitude,
    longitude,
    location,
    description,
    createdAt,
    distance,
    imagerUrl,
  } = useLocalSearchParams();

  const distanceMeters = parseInt(distance, 10);

  const handleUnlock = () => {
    Alert.alert("Unlocked!", "You have successfully unlocked the home.");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {imagerUrl ? (
          <Image source={{ uri: imagerUrl }} style={styles.image} />
        ) : null}

        <Text style={styles.location}>
          {location} ({latitude}, {longitude})
        </Text>

        <Text style={styles.description}>{description}</Text>

        <Text style={styles.fadedText}>
          Distance: {distance}
          {"\n"}Created At: {createdAt}
        </Text>

        {distanceMeters > 30 && (
          <Text style={styles.warningText}>
            You are too far to unlock the home
          </Text>
        )}

        {/* Unlock Button */}
        <TouchableOpacity
          style={[
            styles.unlockButton,
            distanceMeters <= 30
              ? styles.unlockButtonEnabled
              : styles.unlockButtonDisabled,
          ]}
          onPress={handleUnlock}
          disabled={distanceMeters > 30}
        >
          <Text
            style={[
              styles.unlockButtonText,
              distanceMeters > 30 && { color: "#aaa" },
            ]}
          >
            Unlock Home
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#eee",
  },
  location: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
  },
  fadedText: {
    fontSize: 13,
    color: "#999",
    lineHeight: 20,
    marginBottom: 20,
  },
  warningText: {
    color: "red",
    fontSize: 14,
    marginBottom: 12,
    fontWeight: "500",
  },
  unlockButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  unlockButtonEnabled: {
    backgroundColor: "#007bff",
  },
  unlockButtonDisabled: {
    backgroundColor: "#ddd",
  },
  unlockButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
