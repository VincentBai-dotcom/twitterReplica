from musegeeks.settings import AUTH_PASSWORD_VALIDATORS
from django.db import models
from django.db.models import F
# Create your models here.
class Post(models.Model):
    title           = models.CharField(max_length=120)
    description     = models.TextField(max_length=1000)
    pub_date        = models.DateTimeField(verbose_name="pulibshed date",auto_now_add=True)
    last_modified   = models.DateTimeField(verbose_name="last modified date",auto_now=True)
    author          = models.ForeignKey("users.MyUser", on_delete=models.CASCADE)

    def _str_(self):
        return self.title

class Comment(models.Model):
    text            = models.TextField(max_length=1000)
    pub_date        = models.DateTimeField(verbose_name="pulibshed date", auto_now_add=True)
    last_modified   = models.DateTimeField(verbose_name="last modified date",auto_now=True) 
    parent_comment  = models.ForeignKey("self", on_delete=models.CASCADE, blank = True, null= True)
    parent_post     = models.ForeignKey(Post, on_delete=models.CASCADE, blank = True, null= True)
    author          = models.ForeignKey("users.MyUser", on_delete=models.CASCADE)

    def _str_(self):
        return self.text

class Vote(models.Model):
    vote_date   = models.DateTimeField(verbose_name="pulibshed date", auto_now_add=True)
    user        = models.ForeignKey("users.MyUser", on_delete=models.CASCADE)
    post        = models.ForeignKey(Post, related_name="post_votes", on_delete=models.CASCADE, blank = True, null= True)
    comment     = models.ForeignKey(Comment, related_name="post_votes", on_delete=models.CASCADE, blank = True, null= True)

    class Meta:
        unique_together = (('user', 'post'),('user','comment'))