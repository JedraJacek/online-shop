import { useState, useEffect } from 'react';
import { ChakraProvider, SimpleGrid, ColorModeScript, extendTheme, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Image, Stack, Text, Box } from '@chakra-ui/react';
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

  const openBookDetails = (book: Book) => {
    setSelectedBook(book);
    setBookDetailsOpen(true);
  };

  const closeBookDetails = () => {
    setSelectedBook(null);
    setBookDetailsOpen(false);
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
        <Modal isOpen={isBookDetailsOpen} onClose={closeBookDetails}>
          <ModalOverlay />
          <ModalContent maxW="800px">
            <ModalHeader>{selectedBook.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={{ base: 1, md: 2 }}>
                <Box alignItems="center">
                  <Image maxW="300px" src={selectedBook.image} alt={selectedBook.title} borderRadius="lg" />
                </Box>
                <Stack spacing={3}>
                  <Text><strong>Author:</strong> {selectedBook.author}</Text>
                  <Text><strong>Country:</strong> {selectedBook.country}</Text>
                  <Text><strong>Language:</strong> {selectedBook.language}</Text>
                  <Text><strong>Description:</strong> {selectedBook.description}</Text>
                  <Text><strong>Pages:</strong> {selectedBook.pages}</Text>
                  <Text><strong>Year:</strong> {selectedBook.year}</Text>
                  <Text><strong>Stock:</strong> {selectedBook.stock}</Text>
                  <Text><strong>Price:</strong> ${selectedBook.price}</Text>
                </Stack>
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" mr={3} onClick={closeBookDetails}>
                Close
              </Button>
              <Button colorScheme="blue" onClick={() => addToCart(selectedBook)}>Add to Cart</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </ChakraProvider>
  );
}

export default App;
