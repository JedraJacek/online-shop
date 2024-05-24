import { useState, useEffect } from 'react';
import { ChakraProvider, SimpleGrid, ColorModeScript, extendTheme, useToast } from '@chakra-ui/react';
import Content from './components/Content/Content';
import Navbar from './components/Navbar/Navbar';
import CartDrawer from './components/Navbar/CartDrawer';
import BookDetailsDrawer from './components/BookDetailsDrawer/BookDetailsDrawer';
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

const customTheme = extendTheme({
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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBookDetailsOpen, setBookDetailsOpen] = useState(false);
  const toast = useToast();

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

    toast({
      title: 'Added item to cart',
      description: "Your item is in the cart.",
      status: 'success',  
      duration: 2000,
      isClosable: true,
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

  const openBookDetails = (book: Book) => {
    setSelectedBook(book);
    setBookDetailsOpen(true);
  };

  return (
    <ChakraProvider theme={customTheme}>
      <ColorModeScript initialColorMode="light" />
      <Navbar openCart={() => setDrawerOpen(true)} />
      <SimpleGrid columns={4} spacing={10}>
        {books.map((book) => (
          <Content key={book.pk} book={book} addToCart={addToCart} openBookDetails={openBookDetails} />
        ))}
      </SimpleGrid>
      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      {selectedBook && (
        <BookDetailsDrawer
          isOpen={isBookDetailsOpen}
          onClose={() => setBookDetailsOpen(false)}
          book={selectedBook}
          addToCart={addToCart}
        />
      )}
    </ChakraProvider>
  );
}

export default App;
