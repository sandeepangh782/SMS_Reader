import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, FlatList } from 'react-native';

const PREDEFINED_TAGS = [
  'Personal',
  'Food',
  'Transport',
  'Shopping',
  'Entertainment',
  'Subscription',
  'Investment',
  'Bills',
  'Health',
  'Education'
];

const TagSelector = ({ visible, onSelectTag, onClose, tag_detail }) => {
  const [customTag, setCustomTag] = useState('');
  const [selectedTag, setSelectedTag] = useState(tag_detail); // Track selected predefined tag

  const handleSelectPredefinedTag = (tag) => {
    setSelectedTag(tag); // Update selectedTag state
    onSelectTag(tag);
    onClose();
  };

  const handleSubmitCustomTag = () => {
    if (customTag.trim()) {
      onSelectTag(customTag.trim());
      setSelectedTag(customTag.trim()); // Update selectedTag with custom tag
      onClose();
      setCustomTag('');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header with close icon */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Tag</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Custom tag input section */}
          <View style={styles.customTagSection}>
            <TextInput
              style={styles.customTagInput}
              value={customTag}
              onChangeText={setCustomTag}
              placeholder="Enter custom tag..."
              placeholderTextColor="#666"
              maxLength={20}
            />
            <TouchableOpacity
              style={[
                styles.customTagButton,
                !customTag.trim() && styles.customTagButtonDisabled
              ]}
              onPress={handleSubmitCustomTag}
              disabled={!customTag.trim()}
            >
              <Text style={styles.customTagButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          {/* Predefined tags section */}
          <Text style={styles.sectionTitle}>Predefined Tags</Text>
          <FlatList
            data={PREDEFINED_TAGS}
            numColumns={2}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.predefinedTag,
                  selectedTag === item && styles.selectedTag
                ]}
                onPress={() => handleSelectPredefinedTag(item)}
              >
                <Text style={[
                  styles.predefinedTagText,
                  selectedTag === item && styles.selectedTagText
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#222222',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  customTagSection: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  customTagInput: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    color: '#ffffff',
    marginRight: 10,
  },
  customTagButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 10,
    minWidth: 70,
    alignItems: 'center',
  },
  customTagButtonDisabled: {
    backgroundColor: '#333',
  },
  customTagButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#9e9e9e',
    fontSize: 16,
    marginBottom: 10,
  },
  predefinedTag: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    flex: 1,
    alignItems: 'center',
  },
  selectedTag: {
    backgroundColor: '#007AFF',
  },
  predefinedTagText: {
    color: '#ffffff',
    fontSize: 14,
  },
  selectedTagText: {
    fontWeight: 'bold',
  },
});

export default TagSelector;
