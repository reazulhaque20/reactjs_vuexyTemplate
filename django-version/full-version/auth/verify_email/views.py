from django.shortcuts import redirect
from django.contrib import messages
from auth.views import AuthView
from auth.models import Profile
from auth.helpers import send_verification_email
import uuid



class VerifyEmailTokenView(AuthView):
    def get(self, request, token):
        try:
            profile = Profile.objects.filter(email_token=token).first()
            profile.is_verified = True
            profile.email_token = ""
            profile.save()
            if not request.user.is_authenticated:
                # User is not already authenticated
                # Perform the email verification and any other necessary actions
                messages.success(request, "Email verified successfully")
            return redirect("login")
            # Now, redirect to the login page

        except Profile.DoesNotExist:
            messages.error(request, "Invalid token, please try again")
            return redirect("verify-email-page")

class VerifyEmailView(AuthView):
    def get(self, request):
        # Render the login page for users who are not logged in.
        return super().get(request)


class SendVerificationView(AuthView):
    def get(self, request):
        email, message = self.get_email_and_message(request)

        if email:
            token = str(uuid.uuid4())
            user_profile = Profile.objects.filter(email=email).first()
            user_profile.email_token = token
            user_profile.save()
            send_verification_email(email, token)
            messages.success(request, message)
        else:
            messages.error(request, "Email not found in session")

        return redirect("verify-email-page")

    def get_email_and_message(self, request):
        if request.user.is_authenticated:
            email = request.user.profile.email
            message = "Verification email sent successfully"
        else:
            email = request.session.get('email')
            message = "Resend verification email successfully" if email else None

        return email, message
