import Header from "@/components/common/Header";
import HireRequestCard from "@/components/player/HireRequestCard";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const HireRequestsPage = () => {
  const router = useRouter();
  const requests = [
    {
      id: "1",
      image: "https://i.ibb.co.com/gL2fFy4k/e1fbe46ebcf595e1ec6da1f4d00b8886403d0335-1.jpg",
      title: "Tournament A",
      location: "Dhaka Stadium",
      date: "20 Aug, 2025",
      manager: "Rafiq",
      offer: 200,
    },
    {
      id: "2",
      image: "https://i.ibb.co.com/gL2fFy4k/e1fbe46ebcf595e1ec6da1f4d00b8886403d0335-1.jpg",
      title: "Tournament B",
      location: "Chittagong Arena",
      date: "25 Aug, 2025",
      manager: "Sakib",
      offer: 250,
    },
    {
      id: "3",
      image: "https://i.ibb.co.com/gL2fFy4k/e1fbe46ebcf595e1ec6da1f4d00b8886403d0335-1.jpg",
      title: "Tournament C",
      location: "Sylhet Stadium",
      date: "28 Aug, 2025",
      manager: "Tanvir",
      offer: 180,
    },
  ];

  return (
    <View style={styles.container}>      
      <Header  leftComponent={<Ionicons name="chevron-back" size={24} color="white" onPress={() => router.back()}/> } title="Hire Request"/>
      <View style={{ paddingHorizontal: 12, }}>
        <Text style={{ color: "#B0B0B0", fontSize: 16 }}>
          You have{" "}
          <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
            {requests.length} new
          </Text>{" "}
          requests today
        </Text>
      </View>

      {/* Hire Requests List */}
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HireRequestCard
            image={item.image}
            title={item.title}
            location={item.location}
            date={item.date}
            manager={item.manager}
            offer={item.offer}
            onAccept={() => console.log("Accepted", item.id)}
            onReject={() => console.log("Rejected", item.id)}
            onChat={() => console.log("Chat with", item.manager)}
          />
        )}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
};

export default HireRequestsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2D34",
  },
});
