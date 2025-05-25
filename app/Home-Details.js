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

  // Parse distance meters from string like "123 m"
  const distanceMeters = parseInt(distance, 10);

  // Handler for Unlock button
  const handleUnlock = () => {
    Alert.alert("Unlocked!", "You have successfully unlocked the home.");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home Details</Text>
      </View>

  
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
            Unlock
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
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
