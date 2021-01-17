from django.urls import path
from django.conf.urls import url
from bucket.views import BucketViewSet, ListViewSet


urlpatterns = [
    url(r'^bucket/$', BucketViewSet.as_view({'get': 'list', 'post': 'create'})),
    url(r'^bucket/(?P<bucket_name>[\w-]+)/$', BucketViewSet.as_view({'get': 'retrieve'})),
    url(r'^bucket/(?P<bucket_name>[\w-]+)/$', BucketViewSet.as_view({'put': 'put'})),
    url(r'^bucket/(?P<bucket_name>[\w-]+)/$', BucketViewSet.as_view({'delete': 'delete'})),

    url(r'^bucket/(?P<bucket_name>[\w-]+)/list/$', ListViewSet.as_view({'get': 'list', 'post': 'create'})),
    url(r'^bucket/(?P<bucket_name>[\w-]+)/list/(?P<list_id>[\w-]+)/$', ListViewSet.as_view({'get': 'retrieve'})),
    url(r'^bucket/(?P<bucket_name>[\w-]+)/list/(?P<list_id>[\w-]+)/$', ListViewSet.as_view({'put': 'put'})),
    url(r'^bucket/(?P<bucket_name>[\w-]+)/list/(?P<list_id>[\w-]+)/$', ListViewSet.as_view({'delete': 'delete'})),
]
