import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for storage
const STORAGE_KEYS = {
  NOTES: 'NOTES', // Key for storing notes
};

// Save notes to AsyncStorage
export const saveNotes = async (notes: string[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(notes);
    await AsyncStorage.setItem(STORAGE_KEYS.NOTES, jsonValue);
  } catch (error) {
    console.error('Error saving notes:', error);
  }
};

// Get notes from AsyncStorage
export const getNotes = async (): Promise<string[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.NOTES);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error retrieving notes:', error);
    return null;
  }
};

// Delete all notes from AsyncStorage
export const clearNotes = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.NOTES);
  } catch (error) {
    console.error('Error clearing notes:', error);
  }
};
