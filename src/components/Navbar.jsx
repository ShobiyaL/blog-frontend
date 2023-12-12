import React from 'react';
import {
  Box,
  Flex,
  HStack,
  useToast,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Spacer,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  AddIcon,
} from '@chakra-ui/icons';
import { GrChapterAdd } from 'react-icons/gr';
import { SiReaddotcv } from 'react-icons/si';

import { IoIosAddCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import { CgProfile } from 'react-icons/cg';
import {
  MdLocalShipping,
  MdLogout,
  MdOutlineAdminPanelSettings,
} from 'react-icons/md';

//Link comp in the navbar(products,cart)
const NavLink = ({ path, children }) => {
  // console.log(children);
  return (
    <Link
      as={ReactLink}
      to={path}
      px='2'
      py='2'
      rounded='md'
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.100', 'gray.900'),
      }}
    >
      {children}
    </Link>
  );
};
const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  console.log(userInfo);
  const dispatch = useDispatch();
  const toast = useToast();

  let logoutHandler = () => {
    dispatch(logout());
    toast({ description: 'logged out.', status: 'success', isClosable: true });
  };
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px='5'>
      <Flex h='16' alignItems='center' justifyContent='space-between'>
        <IconButton
          size='md'
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack>
          <Link
            as={ReactLink}
            to='/'
            rounded='md'
            px='2'
            py='2'
            _hover={{
              textDecoration: 'none',
              bg: useColorModeValue('gray.100', 'gray.900'),
            }}
          >
            <Flex alignItems='center'>
              <Icon as={SiReaddotcv} h='6' w='6' color='orange.300' />
              <NavLink path='/'>
                <Text fontWeight='medium' mb={0} fontSize={25}>
                  Blogs
                </Text>
              </NavLink>
            </Flex>
          </Link>
          <HStack as='nav' spacing='4' display={{ base: 'none', md: 'flex' }}>
            <Tooltip label='create new blog.' placement='right-end'>
              <IconButton
                as={ReactLink} // or NavLink from your routing library
                to='/create-blog'
                aria-label='Create new blog'
                icon={<IoIosAddCircleOutline size={40} />}
              />
            </Tooltip>
          </HStack>
        </HStack>
        <Flex alignItems='center'>
          <NavLink>
            <Icon
              as={colorMode === 'light' ? MoonIcon : SunIcon}
              alignSelf='center'
              onClick={() => toggleColorMode()}
            />
          </NavLink>
          {userInfo ? (
            <Menu>
              <MenuButton px='4' py='2' transition='all 0.3s' as={Button}>
                {userInfo.userData.name}
                <ChevronDownIcon />
              </MenuButton>
              <MenuList position='sticky' top='0' zIndex='1000'>
                <MenuItem as={ReactLink} to='/profile'>
                  <CgProfile />
                  <Text ml='2'>Profile</Text>
                </MenuItem>
                <MenuItem as={ReactLink} to='/blogs'>
                  <GrChapterAdd />
                  <Text ml='2'>Your blogs</Text>
                </MenuItem>
                <MenuDivider />

                <MenuItem onClick={logoutHandler}>
                  <MdLogout />
                  <Text ml='2'>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                as={ReactLink}
                to='/login'
                p='2'
                fontSize='sm'
                fontWeight={400}
              >
                Sign In
              </Button>
              <Button
                as={ReactLink}
                to='/register'
                p='2'
                m='2'
                fontSize='sm'
                fontWeight={600}
                _hover={{ color: 'black' }}
                bg='#E0144C'
                color='white'
                display={{ base: 'none', md: 'inline-flex' }}
              >
                Sign Up
              </Button>
            </>
          )}
          {/* // <Button
          //   as={ReactLink}
          //   to='/login'
          //   p='2'
          //   fontSize='md'
          //   fontWeight={600}
          // >
          //   Login
          // </Button>
          // <Button
          //   as={ReactLink}
          //   to='/register'
          //   p='2'
          //   m='2'
          //   fontSize='sm'
          //   fontWeight={600}
          //   _hover={{ color: 'black' }}
          //   bg='#E0144C'
          //   color='white'
          //   display={{ base: 'none', md: 'inline-flex' }}
          // >
          //   Sign Up
          // </Button> */}
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb='4' display={{ md: 'none' }}>
          <Stack as='nav' spacing='4'>
            <NavLink path='/create-blog'>
              <IoIosAddCircleOutline size={25} />
            </NavLink>

            <NavLink key='sign up' path='/register'>
              Sign Up
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
