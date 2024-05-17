import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
  Box,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast
} from '@chakra-ui/react';

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

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (bookPk: number) => void;
  updateQuantity: (bookPk: number, quantity: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, removeFromCart, updateQuantity }) => {
  const toast = useToast();

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Shopping Cart</DrawerHeader>
        
        <DrawerBody>
          {cart.length === 0 ? (
            <Text>No items in the cart.</Text>
          ) : (
            cart.map((item) => (
              <Box key={item.book.pk} mb={4}>
                <Text>{item.book.title}</Text>
                <Text>${item.book.price}</Text>
                <HStack>
                  <NumberInput
                    value={item.quantity}
                    min={1}
                    max={item.book.stock}
                    onChange={(valueString) => updateQuantity(item.book.pk, parseInt(valueString))}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Button colorScheme="red" onClick={() => {
                    removeFromCart(item.book.pk);
                    toast({
                      title: 'Item removed.',
                      description: "The item has been removed from your cart.",
                      status: 'error',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}>
                    Remove
                  </Button>
                </HStack>
              </Box>
            ))
          )}
        </DrawerBody>

        <DrawerFooter>
          <Box width="full" display="flex" justifyContent="space-between">
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={() => alert('Continue to payment!')}>
              Buy
            </Button>
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
