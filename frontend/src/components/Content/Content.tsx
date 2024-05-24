import { Button, ButtonGroup, Card, CardBody, CardFooter, Heading, Stack, Text, Image, Tooltip} from '@chakra-ui/react';

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

interface ContentProps {
  book: Book;
  addToCart: (book: Book) => void;
  openBookDetails: (book: Book) => void;
}

function Content({ book, addToCart, openBookDetails }: ContentProps) {
  return (
    <Card maxW='sm'>
      <CardBody onClick={() => openBookDetails(book)} cursor="pointer">
        <Image
          src={book.image}
          alt={book.title}
          borderRadius='lg'
        />
        <Stack>
          <Heading size='md'>{book.title}</Heading>
          <Text color='blue.600' fontSize='2xl'>
            ${book.price}
          </Text>
        </Stack>
      </CardBody>

      <CardFooter>
        <ButtonGroup spacing='2'>
          <Tooltip label="Go to payment page" size={"sm"} openDelay={1000}>
            <Button variant='solid' colorScheme='blue'>
              Buy now
            </Button>
          </Tooltip>
          <Tooltip label='Add item to cart' fontSize={"sm"} openDelay={1000}>
            <Button variant='ghost' colorScheme='blue' onClick={() => {
              addToCart(book);
            }}>
              Add to cart
            </Button>
          </Tooltip>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default Content;
