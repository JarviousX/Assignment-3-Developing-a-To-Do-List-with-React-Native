/**
 * University of Oklahoma To-Do List App
 * React Native Assignment 3
 * 
 * Features:
 * - FlatList for displaying todo items
 * - Modal for adding new todos
 * - Delete functionality
 * - OU branding and colors
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const AppContent = () => {
  const insets = useSafeAreaInsets();
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: 'Complete React Native Assignment', completed: false },
    { id: '2', text: 'Study for Mobile Development Exam', completed: false },
    { id: '3', text: 'Submit project to GitHub', completed: false },
  ]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');
  const [isLandscape, setIsLandscape] = useState(false);

  // Track orientation changes
  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    updateLayout();
    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription?.remove();
  }, []);

  // OU Colors
  const colors = {
    crimson: '#841617', // OU Crimson
    cream: '#FDF5DC',   // OU Cream
    white: '#FFFFFF',
    black: '#000000',
    gray: '#666666',
    lightGray: '#E5E5E5',
  };

  const addTodo = () => {
    if (newTodoText.trim() === '') {
      Alert.alert('Error', 'Please enter a todo item');
      return;
    }

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoText('');
    setModalVisible(false);
  };

  const deleteTodo = (id: string) => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setTodos(todos.filter(todo => todo.id !== id)),
        },
      ]
    );
  };

  const deleteAllTodos = () => {
    if (todos.length === 0) {
      Alert.alert('No Todos', 'There are no todos to delete.');
      return;
    }
    
    Alert.alert(
      'Delete All Todos',
      'Are you sure you want to delete ALL todos? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: () => setTodos([]),
        },
      ]
    );
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const renderTodoItem = ({ item }: { item: TodoItem }) => (
    <View style={[styles.todoItem, isLandscape && styles.todoItemLandscape]}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => toggleTodo(item.id)}
      >
        <View style={[
          styles.checkbox,
          item.completed && styles.checkboxCompleted
        ]}>
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[
          styles.todoText,
          item.completed && styles.todoTextCompleted
        ]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTodo(item.id)}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
        {/* Top safe area filled in crimson so header covers the very top under the status bar/notch */}
        <View style={{ height: insets.top, backgroundColor: colors.crimson }} />
        <StatusBar barStyle="light-content" backgroundColor={colors.crimson} />
      
      {/* Header with OU Logo */}
      <View style={[styles.header, isLandscape && styles.headerLandscape]}>
        <View style={[styles.logoContainer, isLandscape && styles.logoContainerLandscape]}>
          <Image 
            source={require('./Oklahoma_Sooners_logo.svg.png')} 
            style={[styles.logoImage, isLandscape && styles.logoImageLandscape]}
            resizeMode="contain"
          />
        </View>
        <View style={[styles.headerTextContainer, isLandscape && styles.headerTextContainerLandscape]}>
          <Text style={[styles.headerTitle, isLandscape && styles.headerTitleLandscape]}>To-Do List</Text>
          <Text style={[styles.headerSubtitle, isLandscape && styles.headerSubtitleLandscape]}>University of Oklahoma</Text>
        </View>
      </View>

      {/* Todo List */}
      <View style={[styles.todoContainer, isLandscape && styles.todoContainerLandscape]}>
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id}
          style={styles.todoList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No todos yet!</Text>
              <Text style={styles.emptySubtext}>Tap the + button to add your first todo</Text>
            </View>
          }
        />
      </View>

      {/* Delete All Button */}
      <TouchableOpacity
        style={[styles.deleteAllButton, isLandscape && styles.deleteAllButtonLandscape]}
        onPress={deleteAllTodos}
      >
        <Text style={styles.deleteAllButtonText}>🗑️</Text>
      </TouchableOpacity>

      {/* Add Button */}
      <TouchableOpacity
        style={[styles.addButton, isLandscape && styles.addButtonLandscape]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal for Adding New Todo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Todo</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.textInput}
              placeholder="Enter your todo item..."
              placeholderTextColor={colors.gray}
              value={newTodoText}
              onChangeText={setNewTodoText}
              multiline
              autoFocus
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.addTodoButton]}
                onPress={addTodo}
              >
                <Text style={styles.addTodoButtonText}>Add Todo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF5DC', // OU Cream
  },
  header: {
    backgroundColor: '#841617', // OU Crimson
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  logoContainer: {
    width: 75, // Slightly smaller for more compact header
    height: 75,
    backgroundColor: '#FDF5DC',
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12, // Reduced spacing
    marginTop: 5,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  logoImage: {
    width: 60, // Adjusted for smaller container
    height: 60,
  },
  headerTitle: {
    fontSize: 26, // Slightly smaller
    fontWeight: 'bold',
    color: '#FDF5DC',
    marginBottom: 3, // Reduced spacing
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 15, // Slightly smaller
    color: '#FDF5DC',
    opacity: 0.9,
    fontWeight: '500',
  },
  todoContainer: {
    flex: 1,
    paddingHorizontal: 24, // Increased padding for better spacing
    paddingTop: 24, // Increased top padding
    paddingBottom: 20, // Increased bottom padding
  },
  todoList: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 80, // Extra bottom padding to prevent content from being too close to FAB
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18, // Increased padding for better touch targets
    marginBottom: 12, // Increased spacing between items
    borderRadius: 12, // Slightly more rounded
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0', // Subtle border
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 26, // Slightly larger for better touch target
    height: 26,
    borderWidth: 2,
    borderColor: '#841617',
    borderRadius: 13,
    marginRight: 16, // Increased spacing
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#841617',
  },
  checkmark: {
    color: '#FDF5DC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoText: {
    flex: 1,
    fontSize: 17, // Slightly larger for better readability
    color: '#000000',
    fontWeight: '500',
    lineHeight: 22, // Better line height
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#666666',
  },
  deleteButton: {
    padding: 12, // Increased touch target
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#F8F8F8', // Subtle background
  },
  deleteButtonText: {
    fontSize: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 24, // Increased from 30 for better spacing
    right: 24, // Increased from 30 for better spacing
    width: 64, // Slightly larger
    height: 64,
    backgroundColor: '#841617',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 10,
  },
  addButtonText: {
    fontSize: 30,
    color: '#FDF5DC',
    fontWeight: 'bold',
  },
  deleteAllButton: {
    position: 'absolute',
    bottom: 96, // Positioned above the Add button (64 + 24 + 8 gap)
    right: 24,
    width: 64,
    height: 64,
    backgroundColor: '#FDF5DC', // OU Cream background
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3, // OU Red border
    borderColor: '#841617', // OU Crimson border
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 10,
  },
  deleteAllButtonText: {
    fontSize: 32,
    color: '#841617', // OU Crimson for trash icon
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#841617',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666666',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#F9F9F9',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#E5E5E5',
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
  },
  addTodoButton: {
    backgroundColor: '#841617',
  },
  addTodoButtonText: {
    color: '#FDF5DC',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
  // Landscape-specific styles
  headerLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainerLandscape: {
    width: 55, // Slightly larger for landscape
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
    marginBottom: 0,
    marginTop: 0,
  },
  logoImageLandscape: {
    width: 45, // Adjusted for landscape
    height: 45,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerTextContainerLandscape: {
    alignItems: 'flex-start',
  },
  headerTitleLandscape: {
    fontSize: 24,
    marginBottom: 2,
  },
  headerSubtitleLandscape: {
    fontSize: 14,
  },
  addButtonLandscape: {
    bottom: 24,
    right: 44, // Moved further from right edge to avoid camera area
    width: 56, // Slightly larger for landscape
    height: 56,
    borderRadius: 28,
  },
  deleteAllButtonLandscape: {
    bottom: 88, // Positioned above Add button in landscape
    right: 44,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  todoContainerLandscape: {
    paddingHorizontal: 40, // More padding on sides in landscape
    paddingLeft: 60, // Extra left padding to avoid camera cutout
  },
  todoItemLandscape: {
    maxWidth: '80%', // Limit width in landscape
    alignSelf: 'flex-start', // Align to left to avoid camera area
  },
});

export default App;