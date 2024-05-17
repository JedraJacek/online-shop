import { useState, useRef } from 'react';
import { Avatar, Box, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const MotionButton = motion(Button);

interface NavbarProps {
  openCart: () => void;
}

export default function Navbar({ openCart }: NavbarProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Box
      bgColor="lightgray"
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="space-between"  
      px={5}  
      py={2}
    >
      <Menu>
        <MenuButton bgColor={'lightgray'} as={Button} p={0} minW={0} >
          <Avatar name='Dominik Wojtysik' opacity={100} />
        </MenuButton>
        <MenuList>
          <MenuItem>My Profile</MenuItem>
          <MenuItem>My Last Purchases</MenuItem>
          <MenuItem>Log Out</MenuItem>
        </MenuList>
      </Menu>
      
      <MotionButton
        ref={btnRef}
        onClick={openCart}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 1 }}
        transition={{
            type: "spring",
            stiffness: 660,
            damping: 20,
            duration: 0.4
        }}
      >
        <ShoppingCart />
      </MotionButton>
    </Box>
  );
}
