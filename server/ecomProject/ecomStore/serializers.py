from rest_framework import serializers
from .models import Product, Brand, CartItem  # Replace with your model
class BrandSerializer(serializers.ModelSerializer):
    brand_name = serializers.SerializerMethodField()  
    class Meta:
        model = Brand
        fields = ['brand_name']
    def get_brand_name(self, obj):
        return obj.get_brand_name_display()

class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(required=False)
    product = serializers.SerializerMethodField() 
    # images_url = serializers.SerializerMethodField()  
    class Meta:
        model = Product
        fields = '__all__'  # Or specify fields like ['id', 'name', 'price']
    def get_product(self,obj):
        return obj.get_product_display()
    
    # def get_images_url(self, obj):
    #     request = self.context.get('request')  # Get request context for full URL
    #     if obj.images:
    #         return request.build_absolute_uri(obj.images.url)  # Returns full URL
    #     return None
class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem 
        fields = '__all__'