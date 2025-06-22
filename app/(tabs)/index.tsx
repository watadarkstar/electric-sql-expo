import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useShape } from '@electric-sql/react';

type ToDo = {
  id: number
  text: string
  done: boolean
  created_at: number
}


export default function HomeScreen() {
  const { data: todos } = useShape<ToDo>({
    url: `${process.env.EXPO_PUBLIC_ELECTRIC_URL}/v1/shape`,
    params: {
      table: 'todos',
      source_id: process.env.EXPO_PUBLIC_ELECTRIC_SOURCE_ID,
      secret: process.env.EXPO_PUBLIC_ELECTRIC_SECRET,
    }
  })
  
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      // setTodos([
      //   ...todos,
      //   { id: Date.now(), text: input.trim(), done: false },
      // ]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    // setTodos(todos.map(todo =>
    //   todo.id === id ? { ...todo, done: !todo.done } : todo
    // ));
  };


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Expo Elecrtic TODO App</ThemedText>
      </ThemedView>
      <ThemedView style={styles.todoInputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Add a new task..."
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>Add</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.todoListContainer}>
        {todos.map(todo => (
          <TouchableOpacity
            key={todo.id}
            style={styles.todoItem}
            onPress={() => toggleTodo(todo.id)}
            activeOpacity={0.7}
          >
            <ThemedText
              style={{
                textDecorationLine: todo.done ? 'line-through' : 'none',
                color: todo.done ? '#888' : '#222',
              }}
            >
              {todo.text}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  todoInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1D3D47',
    color: '#fff',
    borderRadius: 6,
    borderWidth: 0,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  todoListContainer: {
    gap: 8,
    marginBottom: 16,
  },
  todoItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#e0f7fa',
    marginBottom: 4,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
