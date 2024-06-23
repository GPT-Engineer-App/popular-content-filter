import { Box, Flex, Link, Heading } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Box bg="teal.500" px={4} py={2}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="lg" color="white">
          MyApp
        </Heading>
        <Flex alignItems="center">
          <NavLink to="/" style={{ marginRight: '1rem', color: 'white', textDecoration: 'none' }}>
            Home
          </NavLink>
          <NavLink to="/dashboard" style={{ marginRight: '1rem', color: 'white', textDecoration: 'none' }}>
            Dashboard
          </NavLink>
          <NavLink to="/login" style={{ color: 'white', textDecoration: 'none' }}>
            Login
          </NavLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;