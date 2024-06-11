import * as SQLite from 'expo-sqlite';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { DataSource } from 'typeorm';
import { TaskRepository } from './repositories/TaskRepository';
import { Task } from './entities/task-entity';
import { Text, View } from 'react-native';

interface DatabaseConnectionContextData {
  taskRepository: TaskRepository;
  connection: DataSource | null;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData
);

export const DatabaseConnectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connection, setConnection] = useState<DataSource | null>(null);

  const connect = useCallback(async () => {
    try {
      const createdConnection = new DataSource({
        type: 'expo',
        database: 'tasks.db',
        driver: SQLite,
        entities: [Task],
        synchronize: true,
      });
      setConnection(await createdConnection.initialize());
    } catch (error) {
      console.error('Failed to connect to the database:', error);
    }
  }, []);

  useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);

  if (!connection) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <DatabaseConnectionContext.Provider value={{ taskRepository: new TaskRepository(connection), connection }}>
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);
  if (!context) {
    throw new Error('useDatabaseConnection must be used within a DatabaseConnectionProvider');
  }
  return context;
}
