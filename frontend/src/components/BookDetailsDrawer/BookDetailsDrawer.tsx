import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Button,
  Text,
  Image,
  Stack,
  Link,
  Box
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

interface BookDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
  addToCart: (book: Book) => void;
}

const BookDetailsDrawer: React.FC<BookDetailsDrawerProps> = ({ isOpen, onClose, book, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="top"
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{book.title}</DrawerHeader>

        <DrawerBody>
          <Flex>
            <Box flex={1}>
              <Image maxW="300px" src={book.image} alt={book.title} borderRadius="lg" />
            </Box>
            <Stack flex={3} spacing={3}>
              <Text><strong>Author:</strong> {book.author}</Text>
              <Text><strong>Country:</strong> {book.country}</Text>
              <Text><strong>Language:</strong> {book.language}</Text>
              <Text><strong>Description:</strong> <Link><a href={book.description} target="_blank">{book.description}</a></Link></Text>
              <Text><strong>Pages:</strong> {book.pages}</Text>
              <Text><strong>Year:</strong> {book.year}</Text>
              <Text><strong>Stock:</strong> {book.stock}</Text>
              <Text><strong>Price:</strong> ${book.price}</Text>
            </Stack>
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={handleAddToCart}>Add to Cart</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BookDetailsDrawer;
