import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";
import { Colors } from "@/constants/Colors";

interface SubmitButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
}

export function SubmitButton({
  title,
  isLoading = false,
  variant = "primary",
  disabled,
  style,
  ...props
}: SubmitButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "secondary" && styles.secondaryButton,
        (isLoading || disabled) && styles.buttonDisabled,
        style,
      ]}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === "secondary" ? Colors.light.tint : "#fff"}
        />
      ) : (
        <Text
          style={[
            styles.buttonText,
            variant === "secondary" && styles.secondaryButtonText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: Colors.light.tint,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: Colors.light.tint,
  },
});
