import React, { useState, useEffect } from 'react';
import { TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { initDatabase, insertTask, getTasks, Task } from '@/database/db';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');
  const colorScheme = useColorScheme() ?? 'light';

  useEffect(() => {
    const setup = async () => {
      try {
        await initDatabase();
        await loadTasks();
      } catch (error) {
        console.error('Error during setup:', error);
      }
    };
    setup();
  }, []);

  const loadTasks = async () => {
    try {
      const loadedTasks = await getTasks();
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const addTask = async () => {
    if (taskText.trim()) {
      try {
        const id = await insertTask(taskText);
        setTasks([...tasks, { id, text: taskText, completed: false }]);
        setTaskText('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const toggleTask = async (id: number) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
      // Here you would also update the database
      // await updateTask(id, { completed: !task.completed });
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      // Here you would also delete from the database
      // await deleteTaskFromDb(id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <ThemedView style={styles.taskItem}>
      <TouchableOpacity 
        style={styles.taskRow} 
        onPress={() => toggleTask(item.id)}
      >
        <ThemedView style={[
          styles.checkbox,
          item.completed && styles.checkboxChecked,
          { borderColor: Colors[colorScheme].icon }
        ]}>
          {item.completed && (
            <IconSymbol
              name="checkmark"
              size={16}
              color={Colors[colorScheme].background}
            />
          )}
        </ThemedView>
        <ThemedText style={[
          styles.taskText,
          item.completed && styles.taskTextCompleted
        ]}>
          {item.text}
        </ThemedText>
        <TouchableOpacity 
          onPress={() => deleteTask(item.id)}
          style={styles.deleteButton}
        >
          <IconSymbol
            name="trash.fill"
            size={20}
            color={Colors[colorScheme].icon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">My Task Manager</ThemedText>
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              color: Colors[colorScheme].text,
              borderColor: Colors[colorScheme].icon,
              backgroundColor: Colors[colorScheme].background,
            },
          ]}
          placeholder="Add a new task"
          placeholderTextColor={Colors[colorScheme].icon}
          value={taskText}
          onChangeText={setTaskText}
        />
        <ThemedButton 
          title="Add"
          onPress={addTask}
        />
      </ThemedView>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  taskItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 12,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  taskText: {
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
});
