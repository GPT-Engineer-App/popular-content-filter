import { Box, Flex, Link, Button, useColorModeValue, Stack, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.900');
  const color = useColorModeValue('black', 'white');

  return (
    <Box bg={bg} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box color={color}>Logo</Box>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Link as={RouterLink} to="/" color={color}>Home</Link>
            <Link as={RouterLink} to="/dashboard" color={color}>Dashboard</Link>
            <Link as={RouterLink} to="/profile" color={color}>Profile</Link>
            <Link as={RouterLink} to="/projects" color={color}>Projects</Link>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;