import { Button, ButtonGroup, Card, CardBody, CardFooter, Heading, Stack, Text,Image,} from '@chakra-ui/react'



export default function Content() {
  return (
    <Card maxW='sm'>
  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack >
      <Heading size='md'>Cool book with white pages</Heading>
      <Text color='blue.600' fontSize='2xl'>
        $450
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
  )
}