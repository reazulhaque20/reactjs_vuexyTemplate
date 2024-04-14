'use strict';

document.addEventListener('DOMContentLoaded', function (e) {
  (function () {
    // Variables for DataTable
    var TransactionDate = $('#transaction-date');
    var DueDate = $('#due-date');
    var select2 = $('.select2');

    if (select2.length) {
      select2.each(function () {
        var $this = $(this);
        $this.wrap('<div class="position-relative"></div>').select2({
          placeholder: 'Select Status',
          dropdownParent: $this.parent()
        });
      });
    }

    // Transaction Date (flatpicker)
    if (TransactionDate) {
      TransactionDate.flatpickr({
        monthSelectorType: 'static',
        altInput: true,
        altFormat: 'M j, Y'
        // dateFormat: 'Y-m-d'
      });
    }

    // DueDate (flatpicker)
    if (DueDate) {
      DueDate.flatpickr({
        monthSelectorType: 'static',
        altInput: true,
        altFormat: 'M j, Y'
        // dateFormat: 'Y-m-d'
      });
    }

    const addTransactionForm = document.getElementById('addTransactionForm');
    if (addTransactionForm) {
      // Add New Customer Form Validation
      const fv = FormValidation.formValidation(addTransactionForm, {
        fields: {
          customer: {
            validators: {
              notEmpty: {
                message: 'Please enter Customer Name'
              }
            }
          },
          status: {
            validators: {
              notEmpty: {
                message: 'Please select a Transaction Status'
              }
            }
          },
          total: {
            validators: {
              notEmpty: {
                message: 'Please fill the amount'
              }
            }
          },
          due_date: {
            validators: {
              notEmpty: {
                message: 'Please select a Due Date'
              },
              callback: {
                message: 'Due Date should be equal to or later than Transaction Date',
                callback: function (input) {
                  const dueDate = input.value;
                  const transactionDate = document.getElementById('transaction-date').value;

                  if (new Date(dueDate) >= new Date(transactionDate)) {
                    return true;
                  }

                  return false;
                }
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap5: new FormValidation.plugins.Bootstrap5({
            eleValidClass: '',
            rowSelector: '.mb-3'
          }),
          submitButton: new FormValidation.plugins.SubmitButton(),

          defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          autoFocus: new FormValidation.plugins.AutoFocus()
        },
        init: instance => {
          instance.on('plugins.message.placed', function (e) {
            if (e.element.parentElement.classList.contains('input-group')) {
              e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
            }
          });
        }
      });
    }

    // update transaction form validation

    const UpdateTransactionForm = document.getElementById('UpdateTransactionForm');
    if (UpdateTransactionForm) {
      const fv = FormValidation.formValidation(UpdateTransactionForm, {
        fields: {
          customer: {
            validators: {
              notEmpty: {
                message: 'Please enter Customer Name'
              }
            }
          },
          status: {
            validators: {
              notEmpty: {
                message: 'Please select a Transaction Status'
              }
            }
          },
          total: {
            validators: {
              notEmpty: {
                message: 'Please fill the amount'
              }
            }
          },
          due_date: {
            validators: {
              notEmpty: {
                message: 'Please select a Due Date'
              }
            }
          },
          transaction_date: {
            validators: {
              notEmpty: {
                message: 'Please select a Transaction Date'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap5: new FormValidation.plugins.Bootstrap5({
            eleValidClass: '',
            rowSelector: '.mb-3'
          }),
          submitButton: new FormValidation.plugins.SubmitButton(),

          defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          autoFocus: new FormValidation.plugins.AutoFocus()
        },
        init: instance => {
          instance.on('plugins.message.placed', function (e) {
            if (e.element.parentElement.classList.contains('input-group')) {
              e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
            }
          });
        }
      });
    }
  })();
});
