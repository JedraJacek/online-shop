import React, { useState, useRef } from 'react';
import { Avatar, Box, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ShoppingCart} from 'lucide-react';
import CartDrawer from './CartDrawer';
import ThemeToggle from './ThemeToggle';

const MotionButton = motion(Button);

export default function Navbar() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Box
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="space-between"  
      px={5}  
      py={2}
    >
      <Menu>
        <MenuButton borderRadius={50} as={Button} p={0} minW={0} >
          <Avatar name='Dominik Wojtysik' opacity={100} />
        </MenuButton>
        <MenuList>
          <MenuItem>My Profile</MenuItem>
          <MenuItem>My Last Purchases</MenuItem>
          <MenuItem>Log Out</MenuItem>
        </MenuList>
      </Menu>
      
      <ThemeToggle />
      

      <MotionButton
        ref={btnRef}
        onClick={() => setDrawerOpen(true)}
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

      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </Box>
  );
}
