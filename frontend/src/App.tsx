import { useState } from 'react';
import './App.css';
import {ChakraProvider,SimpleGrid} from "@chakra-ui/react";
import Content from './components/Content/Content'; 

function App() {
  return (
       <ChakraProvider>

        <SimpleGrid columns={4} spacing={100}>
        <Content/>
        <Content/>
        <Content/>
        <Content/>
        </SimpleGrid>


       </ChakraProvider>
  )
}

export default App;
