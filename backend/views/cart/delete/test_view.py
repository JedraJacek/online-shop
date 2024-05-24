from django.test import TestCase
from django.test.client import RequestFactory
from backend.models import Books, Cart

class CartDeleteTest(TestCase):
  def setUp(self):
    # Create some sample books for testing

    Books.objects.create(
      author="Hans Christian Andersen",
      country="Denmark",
      image="https://unsplash.com/photos/CXYPfveiuis",
      language="Danish",
      description="https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
      pages=784,
      title="Fairy tales",
      year=1836,
      stock=345,
      price=12.50
    )

    Books.objects.create(
      author="Chinua Achebe",
      country="Nigeria",
      image="https://unsplash.com/photos/9DaOYUYnOls",
      language="English",
      description="https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
      pages=209,
      title="Things Fall Apart",
      year=1958,
      stock=23,
      price=19.99
    )

    Cart.objects.create(user_pk=1,product_pk=1,count=1)
    Cart.objects.create(user_pk=1,product_pk=2,count=3)

  def test_should_delete_position(self):
    response = self.client.post('/cart/delete/',data={"product_pk":1,"user_pk":1})

    self.assertEqual(response.status_code, 200) # should return 200

  def test_should_not_delete_position(self):
    response = self.client.post('/cart/delete/',data={"product_pk":1,"user_pk":999})
    self.assertEqual(response.status_code, 404) # should return 404

    response = self.client.post('/cart/delete/',data={"product_pk":3,"user_pk":1})
    self.assertEqual(response.status_code, 404) # should return 404


  def tearDown(self):
    pass