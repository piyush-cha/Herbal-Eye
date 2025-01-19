import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ChatModal({ visible, onClose, plantName, language }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
    };

    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Here you would integrate with Gemini API for chat responses
      // For now, we'll simulate a response
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: `Information about ${plantName} will be provided in ${language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : 'Marathi'}`,
          sender: 'bot',
        };
        setChatHistory(prev => [...prev, botResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Chat error:', error);
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble,
      item.sender === 'user' ? styles.userMessage : styles.botMessage
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Chat about {plantName}</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Chat Messages */}
          <FlatList
            data={chatHistory}
            renderItem={renderMessage}
            keyExtractor={item => item.id.toString()}
            style={styles.chatContainer}
            inverted={false}
          />

          {/* Input Area */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type your message..."
                multiline
              />
              <TouchableOpacity 
                onPress={sendMessage}
                style={styles.sendButton}
                disabled={isLoading}
              >
                <Feather 
                  name={isLoading ? "loader" : "send"} 
                  size={24} 
                  color="#fff" 
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});