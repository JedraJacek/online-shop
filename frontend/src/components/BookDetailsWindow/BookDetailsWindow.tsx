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
  Image,
  Stack
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
}

const BookDetailsDrawer: React.FC<BookDetailsDrawerProps> = ({ isOpen, onClose, book }) => {
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
        <DrawerHeader>{book.title}</DrawerHeader>

        <DrawerBody>
          <Image src={book.image} alt={book.title} borderRadius="lg" mb={4} />
          <Stack>
            <Text><strong>Author:</strong> {book.author}</Text>
            <Text><strong>Country:</strong> {book.country}</Text>
            <Text><strong>Language:</strong> {book.language}</Text>
            <Text><strong>Description:</strong> {book.description}</Text>
            <Text><strong>Pages:</strong> {book.pages}</Text>
            <Text><strong>Year:</strong> {book.year}</Text>
            <Text><strong>Stock:</strong> {book.stock}</Text>
            <Text><strong>Price:</strong> ${book.price}</Text>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue">Add to Cart</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BookDetailsDrawer;
