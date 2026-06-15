import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SelectInputProps {
  label: string;
  options: string[] | number[];
  selected: string | number;
  onSelect: (value: any) => void;
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  selected,
  onSelect,
  placeholder = "Select option",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Main Button */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text
          style={[
            styles.dropdownText,
            !selected || selected === placeholder ? styles.placeholderText : null,
          ]}
        >
          {selected || placeholder}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#888"
        />
      </TouchableOpacity>

      {/* Dropdown List */}
      {isOpen && (
        <View style={styles.dropdownList}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.toString()}
              style={styles.dropdownItem}
              onPress={() => {
                onSelect(opt);
                setIsOpen(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 6,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
     borderRadius: 10,
    backgroundColor: "#434952",
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
    overflow: "hidden",
  },
  dropdownText: {
    color: "#ffffff",
    fontSize: 16,
  },
  placeholderText: {
    color: "#888",
  },
  dropdownList: {
    backgroundColor: "#434952",
    borderRadius: 8,
    marginTop: 4,
    overflow: "hidden",
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  dropdownItemText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default SelectInput;
