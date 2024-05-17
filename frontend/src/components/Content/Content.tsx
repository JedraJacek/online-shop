import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text, Image } from '@chakra-ui/react';
import React from 'react';

function Content({ book }) {
  return (
    <Card maxW='sm'>
      <CardBody>
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
          <Button variant='solid' colorScheme='blue'>
            Buy now
          </Button>
          <Button variant='ghost' colorScheme='blue'>
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default Content;
