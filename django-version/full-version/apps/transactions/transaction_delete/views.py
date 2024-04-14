from django.shortcuts import redirect, get_object_or_404
from django.views.generic import DeleteView
from django.contrib import messages
from apps.transactions.models import Transaction
from django.contrib.auth.mixins import PermissionRequiredMixin

class TransactionDeleteView(PermissionRequiredMixin, DeleteView):

    permission_required = ("transactions.delete_transaction")

    def get(self, request, pk):
        transaction = get_object_or_404(Transaction, id=pk)
        transaction.delete()
        messages.success(request, 'Transaction Deleted')
        return redirect('transactions')
