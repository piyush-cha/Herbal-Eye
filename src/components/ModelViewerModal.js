import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PlantModelViewer from './PlantModelViewer';

export default function ModelViewerModal({ visible, onClose, modelUrl }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <PlantModelViewer modelUrl={modelUrl} />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

