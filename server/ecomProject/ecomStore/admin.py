

# Register your models here.
from  django.contrib import admin

from .models import Brand, Product, Customer, Cart, CartItem

admin.site.register(Brand)
admin.site.register(Product)
admin.site.register(Customer)
admin.site.register(Cart)
admin.site.register(CartItem)
