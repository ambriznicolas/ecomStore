# Generated by Django 5.1.2 on 2025-04-07 21:14

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("ecomStore", "0016_rename_cid_cart_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cart",
            name="cart_id",
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
        ),
    ]
