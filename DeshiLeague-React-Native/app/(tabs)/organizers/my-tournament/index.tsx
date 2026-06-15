import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import theme from "@/constants/theme";
import { FormInput } from "@/components/forms";
import { useForm } from "react-hook-form";

const MyTournamentPage: React.FC = () => {
  const router = useRouter();
  const { control } = useForm();
  const [search, setSearch] = useState("");

  const [tournaments, setTournaments] = useState([
    {
      id: "1",
      title: "Cricket Championship A",
      date: "01 July 2025",
      status: "Completed",
      attended: false,
      image: "https://i.ibb.co.com/5hdt8xBW/Screenshot-2025-08-23-131443.png",
    },
    {
      id: "2",
      title: "Cricket Championship B",
      date: "15 July 2025",
      status: "Upcoming",
      attended: false,
      image: "https://i.ibb.co.com/5hdt8xBW/Screenshot-2025-08-23-131443.png",
    },
    {
      id: "3",
      title: "Cricket Championship C",
      date: "10 July 2025",
      status: "Live",
      attended: true,
      image:
        "https://i.ibb.co.com/gL2fFy4k/e1fbe46ebcf595e1ec6da1f4d00b8886403d0335-1.jpg",
    },
  ]);

  const toggleAttended = (id: string) => {
    setTournaments((prev) =>
      prev.map((t) => (t.id === id ? { ...t, attended: !t.attended } : t))
    );
  };

  const statusOrder = ["Upcoming", "Live", "Completed"];

  const sortedTournaments = tournaments
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .sort(
      (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
    );

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 10 }}>
        <FormInput
          control={control}
          name="search"
          label=""
          placeholder="Search tournaments"
          placeholderTextColor={theme.secondaryTextColor}
          leftIcon={
            <Ionicons
              name="search"
              size={20}
              color={theme.secondaryTextColor}
            />
          }
        />
      </View>

      {/* Tournament List */}
      <ScrollView
        style={{ marginTop: 16 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10 }}
      >
        {sortedTournaments.map((tournament, index) => (
          <View
            key={tournament.id}
            style={[styles.cardWrapper, index === 0 && { marginTop: 20 }]}
          >
            {/* Checkbox */}
            <TouchableOpacity
              onPress={() => toggleAttended(tournament.id)}
              style={styles.checkboxWrapper}
            >
              <View
                style={[
                  styles.checkbox,
                  tournament.attended && {
                    backgroundColor: "#ffffffff",
                    borderColor: "#000000ff",
                  },
                ]}
              >
                {tournament.attended && (
                  <Ionicons name="checkmark" size={14} color={theme.black} />
                )}
              </View>
              <Text style={styles.attendedLabel}>Attended</Text>
            </TouchableOpacity>

            {/* Banner */}
            <TouchableOpacity
              onPress={() => router.push(`/managers/my-tournament/details/${tournament.id}`)}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: tournament.image }}
                style={styles.cardImage}
                resizeMode="cover"
              />
            </TouchableOpacity>

            {/* Info Section */}
            <View style={styles.infoWrapper}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>{tournament.title}</Text>
                <Text style={styles.cardDate}>{tournament.date}</Text>
              </View>

              {/* Status Tag */}
              <View
                style={[
                  styles.statusTag,
                  tournament.status === "Live" && styles.liveStatusTag,
                ]}
              >
                <Text style={styles.statusText}>{tournament.status}</Text>
                {tournament.status === "Live" && (
                  <View style={styles.liveDot} />
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyTournamentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  cardWrapper: {
    borderRadius: 12,
    marginBottom: 20,
    elevation: 6,
    paddingTop: 20,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
  },
  checkboxWrapper: {
    position: "absolute",
    top: -20,
    right: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: "#434952",
    borderColor: theme.borderPrimary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
    shadowColor: "#181818ff",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
 
  attendedLabel: {
    fontSize: 11,
    color: theme.primaryTextColor,
  },
  infoWrapper: {
    padding: 10,
  },
  titleRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.primaryTextColor,
  },
  cardDate: {
    fontSize: 12,
    color: theme.primaryTextColor,
  },
  statusTag: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 2,
    marginTop: 6,
    backgroundColor: theme.primaryCardColor,
    shadowColor: theme.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "500",
    color: theme.primaryTextColor,
  },
  liveStatusTag: {
    paddingRight: 6,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 10,
    backgroundColor: "#4CD042",
    marginLeft: 6,
  },
});
