import { ChakraProvider, Box } from "@chakra-ui/react";
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MostWatchedContent from './components/MostWatchedContent';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Box textAlign="center" py={10} px={6}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><MostWatchedContent /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;