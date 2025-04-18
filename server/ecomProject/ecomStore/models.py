from django.db import models
import uuid
from django.utils import timezone

# Create your models here.
class Brand(models.Model):
    BRANDS = [
        ("CR","Cleto Reyes"),
        ("FR", "Fairtex"),
        ("TW",  "Twins"),
        ("YK", "Yokkao")
    ]
    brand_id = models.IntegerField(primary_key=True)
    brand_name = models.CharField(max_length=15, choices=BRANDS)

    def __str__ (self):
        return self.get_brand_name_display()
# Define a function that generates the upload path based on the brand
def product_upload_to(instance, filename):
    # You can use the `instance` parameter to access model fields like `brand`
    brand_folder = instance.brand  # This will create folder names like 'cleto-reyes', 'fairtex'
    
    # Ensure the brand is in a suitable format (e.g., lowercase, spaces replaced with hyphens, etc.)
    # The filename will be the original file name
    return f'products/{brand_folder}/{filename}'  # Images saved in 'media/products/brand_name/filename'
class Product (models.Model):
    PRODUCTS = [
        ("BG", "Boxing Gloves") 
    ]

    product_id = models.IntegerField(primary_key=True)
    product = models.CharField(choices=PRODUCTS, default="Input a product")
    description = models.CharField(max_length=150)
    colors = models.CharField(max_length=20, default="Input a color")
    price = models.DecimalField(max_digits=5, decimal_places=2)
    brand= models.ForeignKey(Brand, on_delete=models.CASCADE, related_name="products")
    number_of_purchases = models.IntegerField(default=0)
    images= models.ImageField(upload_to=product_upload_to)
    # quantity - models.IntegerField(max_length=1000)



    def __str__ (self):
        return f"{self.get_product_display()} - {self.brand.get_brand_name_display()} - {self.colors}"

    # Boxing Gloves ID's

    # CR
    # 11 - 15

    # FR
    # 21 - 26

    # TW
    # 31 - 37

    # YK
    # 41 - 45

import phonenumbers
from django.core.exceptions import ValidationError
class Customer (models.Model):

    # Validate phone number
    def format_phone_number(number: str, country: str = "US") -> str:
        try:
            parsed_number = phonenumbers.parse(number, country)
            if phonenumbers.is_valid_number(parsed_number):
                return phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.E164)
            else:
                raise ValidationError("Invalid phone number")
        except phonenumbers.NumberParseException:
            return ValidationError("Invalid input")

    # Example phone number is valid
    print(format_phone_number("830-773-9403", "US"))  # Output: +15551234567


    customer_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(default="First name (optional)")
    last_name = models.CharField(default="Last name")
    email = models.CharField(max_length=50)
    # pass 
    address = models.CharField(max_length=100)
    country_or_region = models.CharField(max_length=20)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=20)
    phone = models.CharField(max_length=20, unique=True, validators=[format_phone_number])


    
class Cart(models.Model):
    id = models.AutoField(primary_key=True)  # default primary key
    cart_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # objects= CartManager()

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")  # Links to Cart
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # The product added
    quantity = models.PositiveIntegerField(default=1)  # Quantity of the product

    # def total_price():
    #     total_price = sum(item.product.price * item.quantity for item in cart..all())





    




