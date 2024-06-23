import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Alert, AlertIcon } from '@chakra-ui/react';
import { useSupabaseAuth, SupabaseAuthUI } from '../integrations/supabase/auth.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  if (session) {
    navigate('/');
  }

  return (
    <Box p={4}>
      <SupabaseAuthUI />
      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default Login;