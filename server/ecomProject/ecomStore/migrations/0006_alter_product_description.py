# Generated by Django 5.1.2 on 2025-01-17 06:09

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("ecomStore", "0005_alter_product_price"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="description",
            field=models.CharField(max_length=150),
        ),
    ]
