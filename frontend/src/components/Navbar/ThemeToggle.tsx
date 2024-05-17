import { useColorMode } from "@chakra-ui/react";
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionButton = motion.button;

const ThemeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <MotionButton
      onClick={toggleColorMode}
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
      {colorMode === "light" ? <Sun /> : <Moon />}
    </MotionButton>
  );
};

export default ThemeToggle;
