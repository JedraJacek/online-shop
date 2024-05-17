from django.db import models

class Books(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=200)
    price = models.FloatField()
    stock = models.IntegerField()
    image = models.CharField(max_length=2083)
    pages = models.IntegerField()
    year = models.IntegerField()
    description = models.TextField()
    language = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

class Cart(models.Model):
    product_pk = models.ForeignKey(Books, on_delete=models.CASCADE, db_column="product_pk")
    user_pk = models.IntegerField()
    count = models.IntegerField()

class Users(models.Model):
    login = models.EmailField()
    password = models.CharField(max_length=300)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

class Adresses(models.Model):
    line1 = models.CharField(max_length=200)
    line2 = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    zip_code = models.CharField(max_length=200)
    user_pk = models.IntegerField()