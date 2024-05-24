from django.test import TestCase
from django.test.client import RequestFactory
from backend.models import Books 

class BookGetTests(TestCase):
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


  def test_should_return_book(self):
    response = self.client.get('/book/1')

    self.assertEqual(response.status_code, 200) # should return 200
    self.assertEqual(len(response.data), 1) # should return only 1 book

  def test_shoul_not_return_book(self):
    response = self.client.get('/book/9999999')

    self.assertEqual(response.status_code, 404) # should return 200


  def tearDown(self):
    pass