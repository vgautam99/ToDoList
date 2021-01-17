from rest_framework.serializers import ModelSerializer

from bucket.models import Buckets, Lists


class BucketSerializer(ModelSerializer):
    class Meta:
        model = Buckets
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.bucket_name = validated_data.get('bucket_name')
        instance.save()
        return instance


class ListSerializer(ModelSerializer):
    class Meta:
        model = Lists
        fields = '__all__'
