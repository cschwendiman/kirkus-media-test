from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=16, unique=True)
    first_name = models.CharField(max_length=16)
    last_name = models.CharField(max_length=16)

    def __str__(self):
        return self.username

class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField('date created')
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title