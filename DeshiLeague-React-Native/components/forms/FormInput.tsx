import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

interface FormInputProps<T extends FieldValues>
  extends Omit<TextInputProps, "style"> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rules?: any;
  containerStyle?: ViewStyle;
  error?: FieldError;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  rules,
  containerStyle,
  error,
  rightIcon,
  leftIcon,
  ...inputProps
}: FormInputProps<T>) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={[styles.inputWrapper, error && styles.inputError]}>
            {/* Inner shadow (top) */}
            <LinearGradient
              colors={["rgba(0,0,0,0.5)", "transparent"]}
              style={styles.innerShadow}
              pointerEvents="none"
            />

            {/* Left Icon */}
            {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

            <TextInput
              style={[
                styles.input,
                leftIcon ? { paddingLeft: 40 } : null,
                rightIcon ? { paddingRight: 40 } : null,
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...inputProps}
            />

            {/* Right Icon */}
            {rightIcon && (
              <View style={styles.rightIconContainer}>{rightIcon}</View>
            )}
          </View>
        )}
      />

      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 10,
    color: "#ffffff",
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#434952",
    height: 44,
    overflow: "hidden",
  },
  innerShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6, 
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#FFFFFF80",
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#ff4444",
  },
  leftIconContainer: {
    position: "absolute",
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIconContainer: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginTop: 4,
  },
});
