from django.db.models import query, Q
from django.shortcuts import render
from .models import Comment, Post, Vote
from .serializers import PostSerializer, CommentSerializer, VoteSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-pub_date')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    authentication_classes = []

    @action(methods=['get'], detail=True, url_path='vote',)
    def get_vote_number(self, request, pk = None):
        post = self.get_object()
        vote = Vote.objects.filter(post = post.id).count()
        return Response({"vote": vote}, status=status.HTTP_200_OK)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-pub_date')
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    authentication_classes = []

    @action(methods=['get'], detail=True, url_path='vote',)
    def get_vote_number(self, request, pk = None):
        post = self.get_object()
        vote = Vote.objects.filter(post = post.id).count()
        return Response({"vote": vote}, status=status.HTTP_200_OK)

class VoteViewSet(viewsets.ModelViewSet):
    serializer_class = VoteSerializer
    queryset = Vote.objects.all().order_by('-vote_date')
    authentication_classes = []

    def get_queryset(self):
        user = self.request.query_params.get('user')
        post = self.request.query_params.get('post')
        comment = self.request.query_params.get('comment')
        if post and user:
            queryset = Vote.objects.filter(user = user, post = post)
            return queryset
        if comment and user:
            queryset = Vote.objects.filter(user = user, comment = comment)
            return queryset
        if user:
            queryset = Vote.objects.filter(user = user)
            return queryset
        if post:
            queryset = Vote.objects.filter(post = post)
            return queryset
        if comment:
            queryset = Vote.objects.filter(comment = comment)
            return queryset
        return self.queryset
        


