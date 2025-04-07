from django.shortcuts import render
from uuid import UUID
# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Brand, CartItem, Customer, Cart
from .serializers import ProductSerializer, BrandSerializer, CartItemSerializer
from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView




@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def brand_list(request):
    brands = Brand.objects.all()
    serializer = BrandSerializer(brands, many=True)
    return Response(serializer.data)

class AddToCartView(generics.CreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    def perform_create(self, serializer):
        user = self.request.user
        cart = None

        # Validate product ID
        product_id = self.request.data.get("product")
        if not product_id:
            raise ValidationError({"product": "Product ID is required."})
        
        try:
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            raise ValidationError({"product": "Invalid product ID."})

        quantity = self.request.data.get("quantity", 1)

        # Authenticated user
        if user.is_authenticated:
            try:
                customer = Customer.objects.get(user=user)
            except Customer.DoesNotExist:
                raise ValidationError({"user": "Customer record not found."})
            cart, _ = Cart.objects.get_or_create(customer=customer)
        
        # Guest user
        else:
            cart_id = self.request.data.get("cart_id")
            if not cart_id:
                raise ValidationError({"cart_id": "Cart ID is required for guest users."})
            try:
                cart_uuid = UUID(cart_id)
            except ValueError:
                raise ValidationError({"cart_id": "Invalid cart_id format."})

            cart, _ = Cart.objects.get_or_create(cart_id=cart_uuid, customer=None)

        # Update quantity if item already exists in cart
        existing_item = CartItem.objects.filter(cart=cart, product=product).first()
        if existing_item:
            existing_item.quantity += int(quantity)
            existing_item.save()
            self.instance = existing_item  # So DRF returns it in the response
        else:
            serializer.save(cart=cart, product=product, quantity=quantity)


class GuestCartDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        cart_id = request.query_params.get("cart_id")
        if not cart_id:
            return Response({"error": "cart_id is required"}, status=400)

        try:
            cart_uuid = UUID(cart_id)
        except ValueError:
            return Response({"error": "Invalid cart_id format"}, status=400)

        try:
            cart = Cart.objects.get(cart_id=cart_uuid, customer__isnull=True)
            items = cart.items.all()
            serializer = CartItemSerializer(items, many=True)
            return Response({
                "cart_id": str(cart.cart_id),
                "items": serializer.data
            })
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=404)