from django.db import models


# Create your models here.
class Books(models.Model):
    Title = models.CharField(max_length=100)
    Author = models.CharField(max_length=200)
    Price = models.FloatField()
    Stock = models.IntegerField()
    Image = models.CharField(max_length=2083)
    Pages = models.IntegerField()
    Year = models.IntegerField()
    Description = models.TextField()
    Language = models.CharField(max_length=100)

class Cart(models.Model):
    product_pk = models.ForeignKey(Books, on_delete=models.CASCADE)
    user_pk = models.IntegerField()
    count = models.IntegerField()
