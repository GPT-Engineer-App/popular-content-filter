import { ChakraProvider, Box, Heading, Text } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h1" size="2xl" mb={4}>
          Hello world!
        </Heading>
        <Text fontSize="xl">
          Welcome to your new React app with Chakra UI and Axios!
        </Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;