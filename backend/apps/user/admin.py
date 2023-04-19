from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from apps.user.models import (
    User
)
from apps.user.forms import UserChangeForm, UserCreationForm
    
class UserAdmin(BaseUserAdmin):
    form = UserChangeForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ['id', 'uid', 'full_name', 'email', 'is_active']
    fieldsets = [
        ['Auth', {'fields': ['uid', 'email', 'password']}],
        ['Personal info', {'fields': [
            'last_name', 'first_name', 'phone_number'

        ]}],
        ['Settings', {'fields': ['user_permissions', 'groups',
                                 'is_active', 'is_staff', 'is_superuser', ]}],
        ['Important dates', {'fields': ['last_login', 'registered_at']}],
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        [None, {'classes': ['wide'],
                'fields': ['email', 'first_name', 'last_name', 'password1', 'password2']}],
    ]
    search_fields = ['email']
    ordering = ['email']
    readonly_fields = ['uid', 'last_login', 'registered_at']

    
# Now register the new UserAdmin...
admin.site.register(User, UserAdmin)
