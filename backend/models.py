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
    product_pk = models.ForeignKey(Books, on_delete=models.CASCADE)
    user_pk = models.IntegerField()
    count = models.IntegerField()
