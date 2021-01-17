from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_201_CREATED
)

from bucket.models import Buckets, Lists
from bucket.serializers import BucketSerializer, ListSerializer
from bucket import logger


class BucketViewSet(ModelViewSet):
    serializer_class = BucketSerializer
    queryset = Buckets.objects.all()

    def get_queryset(self):
        return Buckets.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data
        try:
            buckets = Buckets.objects.get(bucket_name=data['bucket_name'])
            return Response({'message': 'Bucket already exists'}, status=HTTP_204_NO_CONTENT)
        except Buckets.DoesNotExist:
            serializer = BucketSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Bucket {} is created.'.format(data['bucket_name'])}, status=HTTP_201_CREATED)
            else:
                logger.error(serializer.errors)
                return Response({'message': 'something went wrong'}, status=HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        bucket_name = self.kwargs['bucket_name']
        if not bucket_name:
            return Response({'message': 'bucket_name is required in url.'})
        try:
            data = Buckets.objects.get(bucket_name=bucket_name)
            serializer = BucketSerializer(data)
            return Response(serializer.data, status=HTTP_200_OK)
        except Buckets.DoesNotExist:
            return Response({'message': 'something went wrong'}, status=HTTP_400_BAD_REQUEST)

    def put(self, *args, **kwargs):
        try:
            old_data = Buckets.objects.get(bucket_name=self.kwargs['bucket_name'])
        except Buckets.DoesNotExist:
            return Response({'message': 'Bucket {} does not exists'.format(self.kwargs['bucket_name'])})

        Buckets.objects.filter(bucket_name=self.kwargs['bucket_name']).update(bucket_name=self.request.data['bucket_name'])
        try:
            Lists.objects.filter(bucket_name=self.kwargs['bucket_name']).update(bucket_name=self.request.data['bucket_name'])
        except Lists.DoesNotExist:
            pass
        return Response({'message': 'Bucket is updated.'}, status=HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        try:
            Buckets.objects.get(bucket_name=self.kwargs['bucket_name']).delete()
            return Response({'message': 'Bucket {} is deleted.'.format(self.kwargs['bucket_name'])}, status=HTTP_204_NO_CONTENT)
        except Buckets.DoesNotExist:
            return Response({'message': 'Bucket {} does not exists'.format(self.kwargs['bucket_name'])}, status=HTTP_200_OK)


class ListViewSet(ModelViewSet):
    serializer_class = ListSerializer
    queryset = Lists.objects.all()

    def get_queryset(self):
        bucket_name = self.kwargs['bucket_name']
        return Lists.objects.filter(bucket_name=bucket_name)

    def create(self, request, *args, **kwargs):
        data = request.data
        data['bucket_name'] = self.kwargs['bucket_name']
        try:
            bucket = Buckets.objects.get(bucket_name=data['bucket_name'])
        except Buckets.DoesNotExist:
            return Response({'message': 'Bucket does not exist.'}, status=HTTP_400_BAD_REQUEST)
        serializer = ListSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'List {} is created.'.format(data['list_topic'])}, status=HTTP_201_CREATED)
        else:
            logger.error(serializer.errors)
        return Response({'message': 'something went wrong.'}, status=HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        bucket_name = self.kwargs['bucket_name']
        list_id = self.kwargs['list_id']

        if not bucket_name or not list_id:
            return Response({'message': 'bucket_name or list_topic is missing in url.'})
        try:
            data = Lists.objects.get(bucket_name=bucket_name, id=list_id)
            serializer = ListSerializer(data)
            return Response(serializer.data, status=HTTP_200_OK)
        except Lists.DoesNotExist:
            return Response({'message': 'something went wrong'}, status=HTTP_400_BAD_REQUEST)

    def put(self, *args, **kwargs):
        try:
            old_data = Lists.objects.get(bucket_name=self.kwargs['bucket_name'], id=self.kwargs['list_id'])
        except Lists.DoesNotExist:
            return Response({'message': 'List {} does not exists'.format(self.kwargs['list_topic'])}, status=HTTP_400_BAD_REQUEST)

        Lists.objects.filter(bucket_name=self.kwargs['bucket_name'], id=self.kwargs['list_id']).update(
            status=self.request.data['status'])
        return Response({'message': 'Bucket {} is updated.'.format(self.kwargs['bucket_name'])}, status=HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        try:
            Lists.objects.get(bucket_name=self.kwargs['bucket_name'], id=self.kwargs['list_id']).delete()
            return Response({'message': 'Bucket {} is deleted.'.format(self.kwargs['bucket_name'])}, status=HTTP_204_NO_CONTENT)
        except Lists.DoesNotExist:
            return Response({'message': 'List {} does not exists'.format(self.kwargs['list_topic'])},
                            status=HTTP_200_OK)
