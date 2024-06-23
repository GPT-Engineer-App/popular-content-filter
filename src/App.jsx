import { ChakraProvider, Box } from "@chakra-ui/react";
import MostWatchedContent from './components/MostWatchedContent';

function App() {
  return (
    <ChakraProvider>
      <Box textAlign="center" py={10} px={6}>
        <MostWatchedContent />
      </Box>
    </ChakraProvider>
  );
}

export default App;