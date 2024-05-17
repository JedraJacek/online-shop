import { useState, useEffect } from 'react';
import { ChakraProvider, SimpleGrid } from '@chakra-ui/react';
import Content from './components/Content/Content';
import Navbar from './components/Navbar/Navbar';
import booksData from './mocks/books_mock.json';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(booksData);
  }, []);

  return (
    <ChakraProvider>
      <Navbar />
      <SimpleGrid columns={4} spacing={10}>
        {books.map((book) => (
          <Content key={book.pk} book={book} />
        ))}
      </SimpleGrid>
    </ChakraProvider>
  );
}

export default App;
