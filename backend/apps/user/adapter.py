#https://django-allauth.readthedocs.io/en/latest/advanced.html
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.urls import reverse

from allauth.utils import build_absolute_uri
from allauth.account.adapter import DefaultAccountAdapter



class AccountAdapter(DefaultAccountAdapter):

    def get_email_confirmation_url(self, request, emailconfirmation):
        """Constructs the email confirmation (activation) url.

        Note that if you have architected your system such that email
        confirmations are sent outside of the request context `request`
        can be `None` here.
        """
        url = reverse(
            "auth-api:account_confirm_email",
            args=[emailconfirmation.key])
        response = build_absolute_uri(
            request,
            url)
        return response

    def send_confirmation_mail(self, request, emailconfirmation, signup):
        current_site = get_current_site(request)
        activate_url = self.get_email_confirmation_url(
            request,
            emailconfirmation)
        ctx = {
            "activate_url": activate_url,
            "user": emailconfirmation.email_address.user.first_name,
            "current_site": current_site,
            "key": emailconfirmation.key,
        }
        if signup:
            text_body = render_to_string("user/email/email_confirmation_signup.txt", ctx)
            html_body = render_to_string("user/email/email_confirmation_signup.html", ctx)
            msg = EmailMultiAlternatives(
                subject='Please Confirm Your E-mail Address', 
                body=text_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[emailconfirmation.email_address.email],
            )
            msg.attach_alternative(html_body, "text/html")
            msg.send()
        else:
            email_template = 'account/email/email_confirmation'
            self.send_mail(email_template,
                        emailconfirmation.email_address.email,
                        ctx)