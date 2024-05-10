# Generated by Django 4.2.11 on 2024-04-26 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_rename_author_books_author_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Adresses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('line1', models.CharField(max_length=200)),
                ('line2', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('zip_code', models.CharField(max_length=200)),
                ('user_pk', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('login', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=300)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
            ],
        ),
    ]
