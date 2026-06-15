import React, { ReactNode } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/constants/theme';

interface HeaderProps {
  title: string;
  textClassName?: string;
  textColor?: string;
  centered?: boolean;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  showBackButton?: boolean;
  leftText?: string;
  rightText?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  textClassName, 
  textColor = 'white',
  centered = false,
  leftComponent,
  rightComponent,
  showBackButton = false,
  leftText,
  rightText,
  onLeftPress,
  onRightPress,
  onBackPress,
}) => {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  const hasRightContent = !!rightComponent || !!rightText;
  const hasLeftActionContent = !!showBackButton || !!leftComponent || !!leftText;

  return (
    <View style={styles.header}>
      {hasLeftActionContent && (
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity onPress={handleBackPress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          )}

          {leftComponent && <View style={styles.leftCustom}>{leftComponent}</View>}

          {leftText && (
            <TouchableOpacity onPress={onLeftPress}>
              <Text style={[styles.sideText, { color: textColor }]}>{leftText}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {centered ? (
        <View style={styles.titleCenteredContainer}>
          {showBackButton ? (
            <TouchableOpacity onPress={handleBackPress}>
              <Text style={[styles.titleText, { color: textColor }]}>{title}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.titleText, { color: textColor }]}>{title}</Text>
          )}
        </View>
      ) : (
        <View style={styles.titleLeftContainer}>
          {showBackButton ? (
            <TouchableOpacity onPress={handleBackPress}>
              <Text style={[styles.titleText, { color: textColor }]}>{title}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.titleText, { color: textColor }]}>{title}</Text>
          )}
        </View>
      )}

      {hasRightContent && (
        <View style={styles.rightContainer}>
          {rightComponent && <View style={styles.rightCustom}>{rightComponent}</View>}
          {rightText && (
            <TouchableOpacity onPress={onRightPress}>
              <Text style={[styles.sideText, { color: textColor }]}>{rightText}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: '#2c2f36',
  },
  leftContainer: {
    marginRight: 4,
  },
  leftCustom: {
      borderRadius: "100%",
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
  
  },
  titleCenteredContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleLeftContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.secondaryTextColor
  },
  sideText: {
    fontSize: 16,
    fontWeight: '600',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  rightCustom: {
    marginBottom: 4,
  },
});

export default Header;
