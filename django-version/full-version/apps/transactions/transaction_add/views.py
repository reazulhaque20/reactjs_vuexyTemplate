from datetime import date
from django.shortcuts import redirect
from django.contrib import messages
from django.views.generic import TemplateView
from web_project import TemplateLayout
from apps.transactions.models import Transaction
from apps.transactions.forms import TransactionForm
from django.contrib.auth.mixins import PermissionRequiredMixin
class TransactionAddView(PermissionRequiredMixin, TemplateView):
    permission_required = ("transactions.add_transaction")

    def get_context_data(self, **kwargs):
        context = TemplateLayout.init(self, super().get_context_data(**kwargs))
        context['current_date'] = date.today().strftime("%Y-%m-%d")
        return context

    def post(self, request):
        form = TransactionForm(request.POST)
        if form.is_valid():
            if not self.transaction_exists(form.cleaned_data):
                form.save()
                messages.success(request, 'Transaction Added')
            else:
                messages.error(request, 'Transaction already exists')
        else:
            messages.error(request, 'Transaction Failed')
        return redirect('transactions')

    def transaction_exists(self, cleaned_data):
        return Transaction.objects.filter(
            customer__iexact=cleaned_data['customer'],
            transaction_date=cleaned_data['transaction_date'],
            due_date=cleaned_data['due_date'],
            total=cleaned_data['total'],
            status=cleaned_data['status']
        ).exists()
