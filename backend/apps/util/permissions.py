from rest_framework import permissions


class IsApplicant(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_applicant


class IsReviewer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_reviewer
