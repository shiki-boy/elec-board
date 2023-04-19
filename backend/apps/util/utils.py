from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework.exceptions import NotFound

def custom_get_object_or_404(Model, message='No', **kwargs ):
    """ Returns 404 with custom message """
    try:
        return Model.objects.get(**kwargs)
    except Model.DoesNotExist:
        raise NotFound(detail=message)


def send_email(subject, recipient_email, from_email, text_template_path, html_template_path, merge_data):
    text_body = render_to_string(text_template_path, merge_data)
    html_body = render_to_string(html_template_path, merge_data)
    msg = EmailMultiAlternatives(
        subject=subject,
        body=text_body,
        from_email=from_email,
        to=recipient_email,
    )
    msg.attach_alternative(html_body, "text/html")
    msg.send()
