import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import theme from '@/constants/theme'


interface HeaderWithBackProps {
  title: string
  textClassName?: string
}

const HeaderWithBack: React.FC<HeaderWithBackProps> = ({
  title,
  textClassName = 'font-Urbanist600',
}) => {
  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back()
    }
  }

  return (
    <TouchableOpacity onPress={handleBackPress}>
      <View style={styles.container}>
        <View style={styles.iconsStyle}>
          <Ionicons name="chevron-back" size={24} color={theme.secondaryTextColor} />
        </View>

        <Text className={textClassName} style={{ color: theme.secondaryTextColor, fontSize: 18, marginLeft:8, fontWeight:'800'  }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c2f36',
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconsStyle:{
    borderRadius: "100%",
    marginLeft:22,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.cardBorder,
    borderWidth: 1,
    backgroundColor: '#24292D',
    shadowColor:"#A1A4A8" ,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  }
})

export default HeaderWithBack
