import { useState, useEffect } from 'react';
import { ChakraProvider, SimpleGrid, ColorModeScript } from '@chakra-ui/react';
import Content from './components/Content/Content';
import Navbar from './components/Navbar/Navbar';
import booksData from './mocks/books_mock.json';
import theme from './theme';

type Book = {
  pk: number;
  author: string;
  country: string;
  image: string;
  language: string;
  description: string;
  pages: number;
  title: string;
  year: number;
  stock: number;
  price: number;
};

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => setBooks(booksData), []);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
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
