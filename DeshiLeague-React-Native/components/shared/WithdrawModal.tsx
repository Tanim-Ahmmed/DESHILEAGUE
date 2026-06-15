// components/shared/WithdrawModal.tsx
import React, { useState, useEffect } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface WithdrawModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
      }).start();
    } else {
      scaleAnim.setValue(0.8);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.8,
      duration: 150,
      useNativeDriver: true,
    }).start(onClose);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
          <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
            <Text style={{ color: "#aaa", fontSize: 18 }}>✕</Text>
          </TouchableOpacity>

          <View style={styles.errorCircle}>
            <Text style={styles.errorX}>✕</Text>
          </View>

          <Text style={styles.modalTitle}>
            Are you sure you want to {"\n"} withdraw your participation?
          </Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.withdrawButton]}
              onPress={onConfirm}
            >
              <Text style={styles.withdrawText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
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
  modalContainer: {
    width: "80%",
    backgroundColor: "#2b2b2b",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  closeIcon: { position: "absolute", top: 10, right: 12 },
  errorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  errorX: { color: "red", fontSize: 28, fontWeight: "bold" },
  modalTitle: { color: "#fff", fontSize: 15, textAlign: "center", marginBottom: 25 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#EAB50F",
    backgroundColor: "#2b2b2b",
    borderRadius: 24,
  },
  withdrawButton: {
    backgroundColor: "#EAB50F",
    shadowColor: "#EAB50F",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 24,
  },
  cancelText: { color: "#EAB50F", fontWeight: "bold" },
  withdrawText: { color: "#1a1a1a", fontWeight: "bold" },
});

export default WithdrawModal;
