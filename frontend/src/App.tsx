import { useState, useEffect } from 'react';
import { ChakraProvider, SimpleGrid, extendTheme } from '@chakra-ui/react';
import Content from './components/Content/Content';
import Navbar from './components/Navbar/Navbar';
import CartDrawer from './components/Navbar/CartDrawer';
import booksData from './mocks/books_mock.json';

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

type CartItem = {
  book: Book;
  quantity: number;
};

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: `'Roboto', sans-serif`,
        margin: 0,
        padding: 0,
      },
    },
  },
});

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => setBooks(booksData), []);

  const addToCart = (book: Book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.book.pk === book.pk);
      if (existingItem) {
        return prevCart.map((item) =>
          item.book.pk === book.pk ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookPk: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.book.pk !== bookPk));
  };

  const updateQuantity = (bookPk: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.book.pk === bookPk ? { ...item, quantity } : item
      )
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <Navbar openCart={() => setDrawerOpen(true)} />
      <SimpleGrid columns={4} spacing={10}>
        {books.map((book) => (
          <Content key={book.pk} book={book} addToCart={addToCart} />
        ))}
      </SimpleGrid>
      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </ChakraProvider>
  );
}

export default App;
