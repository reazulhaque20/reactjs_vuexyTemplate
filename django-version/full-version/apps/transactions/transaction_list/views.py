from django.views.generic import TemplateView
from django.db.models import Sum
from web_project.template_helpers.theme import TemplateHelper
from web_project import TemplateLayout
from apps.transactions.models import Transaction
from web_project.template_tags.theme import has_permission


class TransactionListView(TemplateView):

    def get_context_data(self, **kwargs):
        context = TemplateLayout.init(self, super().get_context_data(**kwargs))
        transactions = self.get_annotated_transactions()
        # Update the context
        context.update(
            {
                "transactions": transactions,
                "transactions_count": Transaction.objects.count(),
                "due_count": self.get_total_due(),
                "paid_count": self.get_total_paid(),
                "canceled_count": self.get_total_canceled(),
                'has_permission': has_permission
            }
        )
        TemplateHelper.map_context(context)
        return context

    def get_annotated_transactions(self):
        # Get all transactions and order them by ID
        return Transaction.objects.all().order_by('id')
    def get_total_due(self):
            total_due_amount = Transaction.objects.filter(status='Due').aggregate(total_due=Sum('total'))
            return float(total_due_amount['total_due']) if total_due_amount['total_due']  is not None else 0.0

    def get_total_paid(self):
        # Calculate the total sum of 'total' field for 'Paid' transactions
        total_paid_amount = Transaction.objects.filter(status='Paid').aggregate(total_paid=Sum('total'))
        return float(total_paid_amount['total_paid']) if total_paid_amount['total_paid']  is not None else 0.0

    def get_total_canceled(self):
        total_canceled_amount = Transaction.objects.filter(status='Canceled').aggregate(total_canceled=Sum('total'))
        return float(total_canceled_amount['total_canceled']) if total_canceled_amount['total_canceled']  is not None else 0.0
