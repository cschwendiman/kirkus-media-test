from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse

from .models import Post, User


def index(request):
    # Display recent 10 posts
    recent_posts = Post.objects.order_by('-created_at')[:5]
    context = {
        'recent_posts': recent_posts,
    }
    return render(request, 'index.html', context)

def post(request, post_id):
    # Display individual post
    post = get_object_or_404(Post, pk=post_id)
    return render(request, 'post.html', {'post': post})

def authors(request):
    # Display list of all authors
    authors = User.objects.all()
    return render(request, 'authors.html', {'authors': authors})

def author(request, user_id):
    # Display individual author's info and their posts
    author = get_object_or_404(User, pk=user_id)
    return render(request, 'author.html', {'author': author})