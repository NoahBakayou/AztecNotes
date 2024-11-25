import React, { useState, useCallback } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display'; // Import Markdown Renderer
import { useFocusEffect } from '@react-navigation/native';
import { getNotes } from '../utils/storage';

const HomeScreen: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);

  // Fetch notes every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchNotes = async () => {
        const storedNotes = await getNotes();
        if (storedNotes) {
          setNotes(storedNotes);
        }
      };

      fetchNotes();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SafeAreaView style={styles.noteItem}>
            <Markdown style={markdownStyles}>{item}</Markdown> {/* Render Markdown */}
          </SafeAreaView>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  noteItem: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
});

// Custom Markdown styles
const markdownStyles = {
  heading1: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  heading2: { fontSize: 20, fontWeight: 'bold', color: '#444' },
  paragraph: { fontSize: 16, color: '#555' },
  listItem: { fontSize: 16, color: '#555' },
};

export default HomeScreen;
