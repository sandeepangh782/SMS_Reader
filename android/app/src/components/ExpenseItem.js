import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList, Image } from 'react-native';


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



const TagSelectorModal = ({ visible, onClose, onSelectTag, currentTag }) => {
  const [customTag, setCustomTag] = useState('');

  const handleSelectPredefinedTag = (tag) => {
    onSelectTag(tag);
    onClose();
  };

  const handleSubmitCustomTag = () => {
    if (customTag.trim()) {
      onSelectTag(customTag.trim());
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
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Tag</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

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

            <Text style={styles.sectionTitle}>Predefined Tags</Text>
            <FlatList
              data={PREDEFINED_TAGS}
              numColumns={2}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.predefinedTag,
                    currentTag === item && styles.selectedTag
                  ]}
                  onPress={() => handleSelectPredefinedTag(item)}
                >
                  <Text style={[
                    styles.predefinedTagText,
                    currentTag === item && styles.selectedTagText
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

const ExpenseItem = ({ amount, description, date, bank, onPress, tag, onTagChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const bankLogos = {
    HDFC: require('../assests/hdfc.png'),
    ICICI: require('../assests/icici.png'),
    SBI: require('../assests/sbi.png'),
    KOTAK: require('../assests/kotak.png'),
    AXIS: require('../assests/axis.png'),
  };
  const defaultLogo = require('../assests/image.png');

  const getBankLogo = (bank) => {
    return bankLogos[bank] || defaultLogo;
  };

  return (
    <TouchableOpacity
      onPress={onPress}>
      
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.amount}>{amount}</Text>
        <View style={styles.bank_logo_tagbank}>
        <Image source={getBankLogo(bank)} style={styles.bank_logo} />
        <View style={styles.tag_bank}>
          <Text style={styles.bank}>{bank}</Text>
          <TouchableOpacity 
            onPress={() => setIsModalVisible(true)}
            style={styles.tag}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>

      <TagSelectorModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectTag={(newTag) => {
            onTagChange(newTag);
            setIsModalVisible(false);
          }}
          currentTag={tag}
      />
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#222222',
    padding: 1,
    borderRadius: 15,
    marginVertical: 8,
    borderWidth: 1,           
    borderColor: '#454545', 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  tag_bank: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    color: '#ffffff',
    marginVertical: 3,
    fontSize: 18,
    fontWeight: '600',
  },
  date: {
    color: '#9e9e9e',
    fontSize: 14,
  },
  amount: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tag: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  tagInput: {
    minWidth: 80,
    textAlign: 'center',
    color: '#ffffff',
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#454545',
    marginLeft: 0,
    marginTop: 5,
    marginBottom: 10,
  },
  bank: {
    color: '#9e9e9e',
    fontSize: 14,
    paddingBottom: 8,
  },
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
 
  tagListContainer: {
  flex: 1,
  maxHeight: 300, 
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
  tagText: {
    color: '#ffffff',
    fontSize: 12,
  },
  bank_logo_tagbank: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bank_logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default ExpenseItem;