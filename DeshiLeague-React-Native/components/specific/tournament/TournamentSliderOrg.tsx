import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import theme from '@/constants/theme';

interface SliderItem {
  id: string;
  title: string;
  status: string;
  image: string;
}

interface TournamentSliderProps {
  data: SliderItem[];
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

const { width: screenWidth } = Dimensions.get('window');

const TournamentSliderOrg: React.FC<TournamentSliderProps> = ({
  data,
  autoScroll = true,
  autoScrollInterval = 4000,
}) => {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScrollTimer, setAutoScrollTimer] = useState<NodeJS.Timeout | any>(null);

  const cardWidth = screenWidth - 40; 
  const cardSpacing = 10; 
  const totalCardWidth = cardWidth + cardSpacing;

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('live') || lowerStatus.includes('playing')) {
      return '#4CAF50';
    } else if (lowerStatus.includes('upcoming') || lowerStatus.includes('scheduled')) {
      return '#2196F3';
    } else if (lowerStatus.includes('start soon') || lowerStatus.includes('starting soon')) {
      return '#FF9800';
    } else if (lowerStatus.includes('completed') || lowerStatus.includes('finished')) {
      return '#9E9E9E';
    } else {
      return '#607D8B';
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / totalCardWidth);
    setCurrentIndex(Math.max(0, Math.min(index, data.length - 1)));
  };

  const startAutoScroll = () => {
    if (autoScroll && data.length > 1 && !autoScrollTimer) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % data.length;
          scrollViewRef.current?.scrollTo({
            x: nextIndex * totalCardWidth,
            animated: true,
          });
          return nextIndex;
        });
      }, autoScrollInterval);
      setAutoScrollTimer(timer);
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollTimer) {
      clearInterval(autoScrollTimer);
      setAutoScrollTimer(null);
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [autoScroll, data.length]);

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * totalCardWidth,
      animated: true,
    });
    setCurrentIndex(index);
  };

  const handleCardPress = (id: string) => {
    router.push(`/organizers/my-tournaments/details/${id}/` as any);
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onTouchStart={stopAutoScroll}
        onTouchEnd={startAutoScroll}
        snapToInterval={totalCardWidth}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContainer}
      >
        {data.map((item, index) => {
          const statusColor = getStatusColor(item.status);
          
          return (
            <View 
              key={item.id} 
              style={[
                styles.cardWrapper,
                { 
                  width: cardWidth,
                  marginLeft: index === 0 ? 20 : 0,
                  marginRight: cardSpacing,
                }
              ]}
            >
              <TouchableOpacity 
                style={styles.card}
                onPress={() => handleCardPress(item.id)}
              >
                <View style={styles.cardContent}>
                  <Image 
                    source={{ uri: item.image }} 
                    style={styles.backgroundImage}
                    resizeMode="cover" 
                  />
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.externalStatusContainer}>
                  <Text style={styles.externalStatusText}>{item.status}</Text>
                  <View style={[
                    styles.statusDot,
                    { backgroundColor: statusColor }
                  ]} />
                </View>
              </TouchableOpacity>
            </View>  
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 6,
    paddingRight: 20,
  },
  cardWrapper: {},
  card: {
    height: 200, // Increased height to accommodate full image
  },
  cardContent: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#1a1a1a', // Changed background color
    justifyContent: 'center', // Center the image
    alignItems: 'center', // Center the image
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    minWidth: '100%', // Ensure minimum width
    minHeight: '100%', // Ensure minimum height
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  textContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  title: {
    color: theme.primaryTextColor,
    fontSize: 13,
    marginVertical: 6,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  teamText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  vsText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 12,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  externalStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#33373E',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#555',
    alignSelf: 'flex-start',
    maxWidth: '70%',
  },
  externalStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.primaryTextColor,
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default TournamentSliderOrg;