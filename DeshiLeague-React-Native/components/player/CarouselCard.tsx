// components/dashboard/CarouselCard.tsx
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface CarouselItem {
  id: string;
  image: string;
  title: string;
  countdown: string;
  date: string;
}

interface Props {
  data: CarouselItem[];
}

const { width } = Dimensions.get("window");

const CarouselCard: React.FC<Props> = ({ data }) => {
  const cardWidth = width * 0.9;
  const router = useRouter();

  const renderItem = ({ item }: { item: CarouselItem }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.card, { width: cardWidth }]}
      onPress={() => router.push(`/(tabs)/dashboard/tournament/${item.id}`)}
    >
      <ImageBackground source={{ uri: item.image }} style={styles.image} imageStyle={{ borderRadius: 12 }}>
        {/* Overlay dark gradient */}
        <View style={styles.overlay} />

        {/* Tournament Title */}
        <View style={styles.centerContent}>
          <Text style={styles.title}>{item.title}</Text>
        </View>

        {/* Bottom Strip */}
        <View style={styles.bottomBar}>
          <View style={styles.countdown}>
            <Ionicons name="hourglass-outline" size={22} color="#fff" />
            <Text style={styles.bottomText}>{item.countdown}</Text>
          </View>
          <Text style={styles.bottomText}>{item.date}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={{ alignItems: "center" }}>
      <Carousel
        loop
        width={cardWidth}
        height={200}
        autoPlay
        data={data}
        scrollAnimationDuration={800}
        renderItem={renderItem}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 40,
        }}
      />
    </View>
  );
};

export default CarouselCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
    justifyContent: "space-between",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: "center",
  },
  countdown: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  bottomText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
