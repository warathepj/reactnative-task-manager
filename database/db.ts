import { Platform } from 'react-native';

// Define the Task type
export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

// Web storage implementation
class WebStorage {
  private tasks: Task[] = [];
  private nextId = 1;

  async init(): Promise<boolean> {
    return true;
  }

  async addTask(text: string): Promise<number> {
    const id = this.nextId++;
    this.tasks.push({ id, text, completed: false });
    return id;
  }

  async getTasks(): Promise<Task[]> {
    return [...this.tasks];
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<boolean> {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updates };
      return true;
    }
    return false;
  }
}

// Native storage implementation
class NativeStorage {
  private db: any;

  constructor() {
    if (Platform.OS !== 'web') {
      const SQLite = require('expo-sqlite');
      this.db = SQLite.openDatabase('tasks.db');
    }
  }

  async init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, completed BOOLEAN DEFAULT 0)',
          [],
          () => resolve(true),
          (_, error: any) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  async addTask(text: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO tasks (text, completed) VALUES (?, 0)',
          [text],
          (_, { insertId }) => resolve(insertId),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  async getTasks(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM tasks',
          [],
          (_, { rows: { _array } }) => resolve(_array.map(row => ({
            ...row,
            completed: Boolean(row.completed)
          }))),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'UPDATE tasks SET completed = ? WHERE id = ?',
          [updates.completed ? 1 : 0, id],
          () => resolve(true),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }
}

// Create and export the appropriate storage instance
const storage = Platform.OS === 'web' ? new WebStorage() : new NativeStorage();

// Export the public API
export const initDatabase = () => storage.init();
export const insertTask = (text: string) => storage.addTask(text);
export const getTasks = () => storage.getTasks();
export const updateTask = (id: number, updates: Partial<Task>) => storage.updateTask(id, updates);
