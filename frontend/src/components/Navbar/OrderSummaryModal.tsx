import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  VStack,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
  useBreakpointValue,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

type CartItem = {
  book: {
    pk: number;
    title: string;
    price: number;
  };
  quantity: number;
};

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPrice: number;
  cart: CartItem[];
}

const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({ isOpen, onClose, totalPrice, cart }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    country: '',
    postalCode: '',
    prefecture: '',
    city: '',
    streetAddress: '',
    apartment: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');

  const steps = [
    { title: 'Items & Price', description: 'Review your items and total price.' },
    { title: 'Delivery Address', description: 'Enter your delivery address.' },
    { title: 'Payment Method', description: 'Select a payment method.' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Proceed to payment!');
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Order Summary</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stepper size={stepSize} index={currentStep} orientation="horizontal">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus complete={<Text>✓</Text>} />
                </StepIndicator>
                <Box flexShrink={0} textAlign="center">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          <Box mt={4}>
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <VStack spacing={4}>
                    {cart.map((item) => (
                      <Box key={item.book.pk} p={4} borderWidth="1px" borderRadius="md" width="full">
                        <HStack justifyContent="space-between">
                          <Text fontWeight="bold">{item.book.title}</Text>
                          <Text fontWeight="bold" fontSize="lg">${item.book.price} x {item.quantity}</Text>
                        </HStack>
                      </Box>
                    ))}
                    <Text fontWeight="bold" fontSize="xl">Total Price: ${totalPrice.toFixed(2)}</Text>
                  </VStack>
                </motion.div>
              )}
              {currentStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <VStack spacing={4}>
                    <HStack spacing={4}>
                      <Input
                        placeholder="First name"
                        value={address.firstName}
                        onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                      />
                      <Input
                        placeholder="Last name"
                        value={address.lastName}
                        onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                      />
                    </HStack>
                    <Input
                      placeholder="Country/region"
                      value={address.country}
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    />
                    <Input
                      placeholder="Postal code"
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    />
                    <Input
                      placeholder="Prefecture"
                      value={address.prefecture}
                      onChange={(e) => setAddress({ ...address, prefecture: e.target.value })}
                    />
                    <Input
                      placeholder="City"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    />
                    <Input
                      placeholder="Street address"
                      value={address.streetAddress}
                      onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                    />
                    <Input
                      placeholder="Apartment, suite, etc."
                      value={address.apartment}
                      onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
                    />
                  </VStack>
                </motion.div>
              )}
              {currentStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
                    <Stack direction="column">
                      <Radio value="creditCard">Credit Card</Radio>
                      <Radio value="paypal">PayPal</Radio>
                      <Radio value="bankTransfer">Bank Transfer</Radio>
                    </Stack>
                  </RadioGroup>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={handlePrev} isDisabled={currentStep === 0}>
            Previous
          </Button>
          <Button colorScheme="blue" onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderSummaryModal;
