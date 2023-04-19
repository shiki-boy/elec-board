from rest_framework import serializers

from apps.util.utils import custom_get_object_or_404


class UIDField(serializers.Field):

    def __init__(self, *args, **kwargs):
        self.model = kwargs.pop('model')
        self.field = kwargs.pop('field', None) 
        super().__init__(*args, **kwargs)

    def to_representation(self, obj):
        value = getattr(obj, self.field) if self.field else obj.uid
        return value

    def to_internal_value(self, data):
        return custom_get_object_or_404(self.model, uid=data, message=f"No such {self.model.__name__}")
