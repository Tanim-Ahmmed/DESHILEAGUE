import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";
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
  label?: string; 
  rules?: any;
  containerStyle?: ViewStyle;
  error?: FieldError;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

export function InputField<T extends FieldValues>({
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
          <View
            style={[
              styles.inputContainer,
              error ? styles.inputErrorBorder : null,
            ]}
          >
            {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

            <TextInput
              style={[
                styles.input,
                leftIcon ? { paddingLeft: 40 } : null,
                rightIcon ? { paddingRight: 40 } : null,
              ]}
              placeholderTextColor="#9ca3af"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...inputProps}
            />

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
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "300",
    marginBottom: 6,
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#434952",
    borderWidth: 1,
    borderColor: "#434952",
    position: "relative",
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  inputErrorBorder: {
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
