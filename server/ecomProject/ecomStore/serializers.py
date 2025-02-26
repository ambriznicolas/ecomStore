from rest_framework import serializers
from .models import Product, Brand  # Replace with your model
class BrandSerializer(serializers.ModelSerializer):
    brand_name = serializers.SerializerMethodField()  
    class Meta:
        model = Brand
        fields = ['brand_name']
    def get_brand_name(self, obj):
        return obj.get_brand_name_display()

class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    product = serializers.SerializerMethodField() 
    class Meta:
        model = Product
        fields = '__all__'  # Or specify fields like ['id', 'name', 'price']
    def get_product(self,obj):
        return obj.get_product_display()