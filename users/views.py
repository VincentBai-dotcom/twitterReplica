from django.db.models.query import QuerySet
from django.shortcuts import get_object_or_404, render
from .models import MyUser
from django.contrib.auth.models import Group
from rest_framework import viewsets, permissions, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import MyUserSerializer, RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import action
# Create your views here.

class MyUserViewSet(viewsets.ModelViewSet):
    queryset = MyUser.objects.all().order_by('-date_joined')
    serializer_class = MyUserSerializer
    permission_classes = [permissions.AllowAny]

    @action(methods=['get'], detail=False,
            url_path='username/(?P<username>\w+)',permission_classes = [permissions.IsAuthenticated])
    def get_by_username(self, request, username ):
        user = get_object_or_404(MyUser, username=username)
        return Response(MyUserSerializer(user).data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False,
            url_path='email', permission_classes = [permissions.IsAuthenticated])
    def get_by_email(self, request):
        user = get_object_or_404(MyUser, email=request.data["email"])
        return Response(MyUserSerializer(user).data, status=status.HTTP_200_OK)


# class MultipleFieldLookupMixin(object):
#     def get_object(self):
#         queryset = self.get_queryset()             
#         queryset = self.filter_queryset(queryset)  
#         filter = {}
#         for field in self.lookup_fields:
#             if self.kwargs.get(field, None):  
#                 filter[field] = self.kwargs[field]
#         obj = get_object_or_404(queryset, **filter)  # Lookup the object
#         self.check_object_permissions(self.request, obj)
#         return obj

# class UserList(generics.ListAPIView):
#     queryset = MyUser.objects.all().order_by('-date_joined')
#     serializer_class = MyUserSerializer

# class UserDetail(MultipleFieldLookupMixin, generics.RetrieveAPIView):
#     queryset = MyUser.objects.all()
#     serializer_class = MyUserSerializer
#     lookup_fields = ['pk', 'username']

# class FetchByEmail(APIView):
    
#     def post(self, request):
#         user = get_object_or_404(MyUser, email=request.data["email"])
#         serializer = MyUserSerializer(user)
#         return Response(serializer.data, status=status.HTTP_200_OK)

# class FetchByUsername(generics.RetrieveAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     queryset = MyUser.objects.all()
#     serializer_class = MyUserSerializer
#     lookup_field = ['username']

class RegisterAPI(APIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = ()

    def post(self, request):
        serializer = RegisterSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class RegisterAPI2(generics.RetrieveDestroyAPIView):
#     serializer_class = RegisterSerializer
#     queryset = MyUser.objects.all().order_by('-date_joined')

class BlacklistTokenView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)