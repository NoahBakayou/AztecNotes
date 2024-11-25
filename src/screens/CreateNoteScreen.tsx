import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';

const CreateNoteScreen = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);

  const startRecording = async () => {
    try {
      // Request permissions
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Denied', 'You must grant microphone permissions to record audio.');
        return;
      }
  
      // Set audio mode to allow recording in silent mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true, // Enables recording in silent mode
      });
  
      // Prepare and start recording
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
  
      setRecording(recording);
      console.log('Recording started');
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };
  

  const stopRecording = async () => {
    try {
      if (!recording) return;

      // Stop recording
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setAudioUri(uri);

      console.log('Recording stopped and saved to:', uri);

      // Pass audio URI to transcription logic
      handleTranscription(uri);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const handleTranscription = async (audioFilePath: string | null) => {
    if (!audioFilePath) return;

    setLoading(true);
    try {
      // Replace this with your Whisper transcription logic
      const transcriptionResult = "Sample transcription from Whisper";
      setTranscription(transcriptionResult);

      // Save transcription as a note (use your AsyncStorage logic here)
      console.log('Transcription:', transcriptionResult);
    } catch (error) {
      console.error('Transcription failed:', error);
      Alert.alert('Error', 'Failed to transcribe audio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Note</Text>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
        disabled={loading}
      />
      {loading && <Text>Transcribing...</Text>}
      {transcription ? <Text style={styles.transcription}>{transcription}</Text> : null}
      {audioUri && <Text>Audio File Saved at: {audioUri}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transcription: {
    marginTop: 16,
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default CreateNoteScreen;
