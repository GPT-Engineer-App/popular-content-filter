import { Box, Flex, Link, Heading, Avatar, Menu, MenuButton, MenuList, MenuItem, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { useUser, useNotifications } from '../integrations/supabase/index.js';

const Header = () => {
  const { session, loading, logout } = useSupabaseAuth();
  const userId = session?.user?.id;
  const { data: user, isLoading: userLoading, error: userError } = useUser(userId);
  const { data: notifications, isLoading: notificationsLoading, error: notificationsError } = useNotifications(userId);

  if (loading || userLoading || notificationsLoading) {
    return <Spinner size="xl" />;
  }

  if (userError || notificationsError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {userError?.message || notificationsError?.message}
      </Alert>
    );
  }

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
          {session ? (
            <Menu>
              <MenuButton as={Avatar} src={user?.profile_picture} size="sm" />
              <MenuList>
                <MenuItem>{user?.name}</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <NavLink to="/login" style={{ color: 'white', textDecoration: 'none' }}>
              Login
            </NavLink>
          )}
        </Flex>
      </Flex>
      {notifications?.length > 0 && (
        <Box mt={2}>
          {notifications.map((notification) => (
            <Alert status="info" key={notification.id}>
              <AlertIcon />
              {notification.message}
            </Alert>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Header;