from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^post/(?P<post_id>[0-9]+)/$', views.post, name='post'),
    url(r'^authors$', views.authors, name='authors'),
    url(r'^author/(?P<user_id>[0-9]+)/$', views.author, name='author')
]