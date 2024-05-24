import React, { useState, useEffect } from 'react';
import { ChakraProvider, SimpleGrid, ColorModeScript, useToast } from '@chakra-ui/react';
import Content from './components/Content/Content';
import Navbar from './components/Navbar/Navbar';
import CartDrawer from './components/Navbar/CartDrawer';
import OrderSummaryModal from './components/Navbar/OrderSummaryModal';
import booksData from './mocks/books_mock.json';
import customTheme from './theme';

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

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModalAfterUpdate, setOpenModalAfterUpdate] = useState(false);
  const toast = useToast();

  useEffect(() => setBooks(booksData), []);

  useEffect(() => {
    if (openModalAfterUpdate) {
      if (cart.length > 0) {
        setIsModalOpen(true);
      } else {
        toast({
          title: 'Cart is empty.',
          description: "Please add items to your cart before proceeding to payment.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      setOpenModalAfterUpdate(false);
    }
  }, [cart, openModalAfterUpdate, toast]);

  const addToCart = (book: Book, callback?: () => void) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.book.pk === book.pk);
      const updatedCart = existingItem
        ? prevCart.map((item) =>
            item.book.pk === book.pk ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevCart, { book, quantity: 1 }];
      
      if (callback) {
        callback();
      }

      return updatedCart;
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

  const handleBuyNow = (book: Book) => {
    addToCart(book, () => {
      setDrawerOpen(true);
      setOpenModalAfterUpdate(true);
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ChakraProvider theme={customTheme}>
      <ColorModeScript initialColorMode="light" />
      <Navbar openCart={() => setDrawerOpen(true)} />
      <SimpleGrid columns={4} spacing={10}>
        {books.map((book) => (
          <Content 
            key={book.pk} 
            book={book} 
            addToCart={(book) => addToCart(book)} 
            handleBuyNow={handleBuyNow} 
          />
        ))}
      </SimpleGrid>
      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        openModal={() => setOpenModalAfterUpdate(true)}
      />
      <OrderSummaryModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        totalPrice={cart.reduce((total, item) => total + item.book.price * item.quantity, 0)} 
        cart={cart} 
      />
    </ChakraProvider>
  );
}

export default App;
