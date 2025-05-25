import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchHomes = async () => {
  const locations = ["Gurugram", "Delhi", "Noida"];
  const res = await fetch("https://678f678849875e5a1a91b27f.mockapi.io/houses");
  let data = await res.json();

  return data.map((item) => {
    const randomMeters = Math.floor(Math.random() * 100) + 1;
    return {
      ...item,
      location: locations[Math.floor(Math.random() * locations.length)],
      distance: `${randomMeters} m`,
    };
  });
};

export default function HomeList() {
  const router = useRouter();

  const {
    data: homes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["homes"],
    queryFn: fetchHomes,
  });

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/Login");
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (isError) {
    return <Text style={styles.error}>Failed to load homes.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Available Homes</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>

      {/* Home Cards */}
      <FlatList
        data={homes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({ pathname: "/Home-Details", params: item })
            }
          >
            <Image source={{ uri: item.imagerUrl }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.location}</Text>
              <Text numberOfLines={5} style={styles.description}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
  logoutButton: {
    marginLeft: "auto",
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#eee",
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
  },
  distance: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
  error: {
    textAlign: "center",
    marginTop: 40,
    color: "red",
    fontSize: 16,
  },
});
