import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color="#ffffff" />
          </TouchableOpacity>

          {/* Trophy + Bracket Icon */}
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="trophy"
              size={50}
              color="#FFB800"
              style={{ marginBottom: 8 }}
            />
            <MaterialCommunityIcons
              name="bracket-outline"
              size={40}
              color="#cccccc"
            />
          </View>

          {/* Success Message */}
          <Text style={styles.message}>
            Your tournament has been{"\n"}created successfully!!
          </Text>

          {/* Button */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Go Back To Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#2c2c2c",
    borderRadius: 16,
    padding: 24,
    width: "80%",
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 6,
  },
  iconWrapper: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  message: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 22,
  },
  confirmButton: {
    backgroundColor: "#FFB800",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  confirmButtonText: {
    color: "#2c2c2c",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SuccessModal;
