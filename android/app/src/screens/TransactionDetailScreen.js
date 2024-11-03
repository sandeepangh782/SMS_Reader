import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TagSelector from '../components/TagSelector';

const TransactionDetailScreen = ({ route }) => {
  const { transaction } = route.params;
  const navigation = useNavigation();
  const [tag, setTag] = useState(transaction.tag);
  const [isTagSelectorVisible, setTagSelectorVisible] = useState(false); 

  const handleTagSelect = (selectedTag) => {
    setTag(selectedTag);
    setTagSelectorVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Amount Section */}
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{transaction.amount}</Text>
        <View style={styles.tagContainer}>
        <TouchableOpacity
          style={styles.tagContainer}
          onPress={() => setTagSelectorVisible(true)}
        >
          <Text style={styles.tagText}>{tag}</Text>
        </TouchableOpacity>
        </View>
      </View>

      {/* Transaction Details */}
      <View style={styles.detailsContainer}>
        {/* From Account */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>BANK</Text>
          <View style={styles.detailContent}>
            <Text style={styles.detailText}>{transaction.bank}</Text>
          </View>
        </View>

        {/* Date */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>ON</Text>
          <View style={styles.detailContent}>
            <Text style={styles.detailText}>
              {new Date(transaction.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: '2-digit'
              })}
            </Text>
          </View>
        </View>

        {/* Paid To */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>PAID TO</Text>
          <View style={styles.detailContent}>
            <Text style={styles.detailText}>{transaction.description}</Text>
          </View>
        </View>
      </View>

      {/* Additional Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Account in Nov 2024</Text>
          <Text style={styles.chevron}>.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>More Details</Text>
          <Text style={styles.chevron}>.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Add transaction to group</Text>
        </TouchableOpacity>
      </View>

      {/* Notes Section */}
      <View style={styles.notesContainer}>
        <View style={styles.notesHeader}>
          <Text style={styles.notesLabel}>NOTES</Text>
          <TouchableOpacity>
            <Text style={styles.addReceiptText}>ADD RECEIPT</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.notesPlaceholder}>
          Something about this transaction you would like to recall later?
        </Text>
      </View>
      <TagSelector
        tag_detail = {tag}      
        visible={isTagSelectorVisible}
        onSelectTag={handleTagSelect}
        onClose={() => setTagSelectorVisible(false)}
        
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  amountContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  amount: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '600',
    marginBottom: 16,
  },
  tagContainer: {
    backgroundColor: '#1C1C1E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  detailsContainer: {
    marginTop: 24,
  },
  detailRow: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1E',
  },
  detailLabel: {
    color: '#8E8E93',
    width: 80,
    fontSize: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailText: {
    color: '#fff',
    fontSize: 16,
  },
  optionsContainer: {
    marginTop: 16,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1C1C1E',
    marginBottom: 1,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  chevron: {
    color: '#8E8E93',
    fontSize: 16,
  },
  notesContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
  },
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  notesLabel: {
    color: '#8E8E93',
    fontSize: 12,
  },
  addReceiptText: {
    color: '#0A84FF',
    fontSize: 12,
  },
  notesPlaceholder: {
    color: '#8E8E93',
    fontSize: 16,
  },
  tagContainer: {
    backgroundColor: '#1C1C1E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TransactionDetailScreen;