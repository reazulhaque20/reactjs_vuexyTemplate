from django.db import models

class Transaction(models.Model):
    customer = models.CharField(max_length=150)
    transaction_date = models.DateField()
    due_date = models.DateField()
    total = models.DecimalField(max_digits=10000000000, decimal_places=2)
    status = models.CharField(max_length=20, choices=[("Paid", "Paid"), ("Due", "Due"), ("Canceled", "Canceled")])

    def __str__(self):
        return self.customer
