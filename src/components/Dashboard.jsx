import { Box, Heading, Text, Button, VStack, Spinner, Alert, AlertIcon, Input } from '@chakra-ui/react';
import { useTasks, useAddTask, useUpdateTask, useDeleteTask } from '../integrations/supabase/index.js';
import { useState } from 'react';

const Dashboard = () => {
  const { data: tasks, isLoading, error } = useTasks();
  const addTask = useAddTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    addTask.mutate({ title: newTask });
    setNewTask('');
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Dashboard</Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <VStack spacing={4} align="stretch">
          {tasks.map((task) => (
            <Box key={task.id} p={4} borderWidth="1px" borderRadius="lg">
              <Text>{task.title}</Text>
              <Button onClick={() => updateTask.mutate({ ...task, title: 'Updated Task' })}>Edit</Button>
              <Button onClick={() => deleteTask.mutate(task.id)}>Delete</Button>
            </Box>
          ))}
        </VStack>
      )}
      <Box mt={4}>
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <Button onClick={handleAddTask} mt={2}>Add Task</Button>
      </Box>
    </Box>
  );
};

export default Dashboard;