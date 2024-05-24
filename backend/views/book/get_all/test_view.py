from django.test import TestCase
from backend.models import Books 

class BookGetAllTests(TestCase):
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

  def test_should_return_one_book(self):
    response = self.client.get('/books/')

    self.assertEqual(response.status_code, 200) # should return 200
    self.assertEqual(len(response.data), 2) # should return 1 book

    self.assertEqual(response.data[0]['title'], "Fairy tales") #
    self.assertEqual(response.data[0]['pk'], 1) 

  def tearDown(self):
    pass