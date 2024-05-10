import { useState } from 'react';
import {ChakraProvider,SimpleGrid} from "@chakra-ui/react";
import Content from './components/Content/Content'; 
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
       <ChakraProvider>
        <Navbar></Navbar>
          <SimpleGrid columns={4} spacing={50}>
            <Content/>
            <Content/>
            <Content/>
            <Content/>
          </SimpleGrid>
       </ChakraProvider>
  )
}

export default App;
