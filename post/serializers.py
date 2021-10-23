from rest_framework import serializers
from .models import Comment, Post, Vote

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id","title", "description", "pub_date","last_modified", "author"]

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id","text", "pub_date","last_modified", "author", "parent_comment", "parent_comment"]

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ["id","vote_date", "comment", "post", "user"]