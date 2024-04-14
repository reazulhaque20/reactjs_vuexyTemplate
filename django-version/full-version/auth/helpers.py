from django.core.mail import EmailMessage
from django.conf import settings

def send_email(subject, email, message):
    try:
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [email]
        email = EmailMessage(subject, message, email_from, recipient_list)
        email.send()
    except Exception as e:
        print(f"Failed to send email: {e}")

def send_verification_email(email, token):
    subject = "Verify your email"
    verification_url = f"http://127.0.0.1:8000/verify/email/{token}"  # Update with the actual URL
    message = f"Hi,\n\nPlease verify your email using this link: {verification_url}"
    send_email(subject, email, message)

def send_password_reset_email(email, token):
    subject = "Reset your password"
    password_reset_url = f"http://127.0.0.1:8000/reset_password/{token}"  # Update with the actual URL
    message = f"Hi,\n\nPlease reset your password using this link: {password_reset_url}"
    send_email(subject, email, message)
