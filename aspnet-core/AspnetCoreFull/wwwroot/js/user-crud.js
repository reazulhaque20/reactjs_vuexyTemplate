/**
 * User CRUD JS
 */

'use strict';

// Functions to handle the Delete User Sweet Alerts (Delete Confirmation)
function showDeleteConfirmation(userId) {
  event.preventDefault(); // prevent form submit
  const userName = document.querySelector(`.user-name-full-${userId}`).innerText;
  Swal.fire({
    title: 'Delete User',
    // Show the user the user name to be deleted
    html: `<p class="text-danger">Are you sure you want to delete user ?<br> <span class="fw-medium text-body">${userName}</span></p>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-label-secondary'
    }
  }).then(result => {
    if (result.isConfirmed) {
      const form = document.getElementById(userId + '-deleteForm');
      if (form) {
        submitFormAndSetSuccessFlag(form, 'successFlag');
      } else {
        console.error('Form element not found');
      }
    } else {
      Swal.fire({
        title: 'Cancelled',
        // Show the user that the user has not been deleted.
        html: `<p><span class="fw-medium text-primary">${userName}</span> has not been deleted!</p>`,
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      });
    }
  });
}

// Function to submit the form and set the success flag (Set success flags for delete, create and update)
function submitFormAndSetSuccessFlag(form, flagName) {
  form.submit();
  sessionStorage.setItem(flagName, 'true');
}

(function () {
  // Function to set element attributes (asp-for)
  function setElementAttributes(element, attribute, value) {
    element.setAttribute(attribute, value);
  }

  // Function to set form attributes (route and action)
  function setFormAttributes(form, userId, handler) {
    const routeAttribute = 'asp-route-id';
    setElementAttributes(form, routeAttribute, userId);
    form.action = `/CRUD/UserCRUD?handler=${handler}&id=${userId}`;
  }

  // Sweet Alert Success Function (User Deleted/Created/Updated)
  function showSuccessAlert(message) {
    var name = message[0].toUpperCase() + message.slice(1);
    Swal.fire({
      title: name,
      text: `User ${message} Successfully!`,
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButton: false,
      customClass: {
        confirmButton: 'btn btn-success'
      }
    });
  }

  // Function to check for success flag and display success message
  function checkAndShowSuccessAlert(flagName, successMessage) {
    const flag = sessionStorage.getItem(flagName);
    if (flag === 'true') {
      showSuccessAlert(successMessage);
      sessionStorage.removeItem(flagName);
    }
  }

  // Function to handle the "Edit User" Offcanvas Modal
  const handleEditUserModal = editButton => {
    // Get the user details from the table
    const userId = editButton.id.split('-')[0];
    const userName = document.querySelector(`.user-name-full-${userId}`).innerText;
    const userEmail = document.getElementById(`${userId}-editUser`).parentElement.parentElement.children[3].innerText;
    const isVerified = document.querySelector(`.user-verified-${userId}`).dataset.isVerified;
    const userContactNumber = document.getElementById(`${userId}-editUser`).parentElement.parentElement.children[5]
      .innerText;
    const userSelectedRole = document.getElementById(`${userId}-editUser`).parentElement.parentElement.children[6]
      .innerText;
    const userSelectedPlan = document.getElementById(`${userId}-editUser`).parentElement.parentElement.children[7]
      .innerText;

    // Set the form attributes (route and action)
    const editForm = document.getElementById('editUserForm');
    setFormAttributes(editForm, userId, 'EditOrUpdate');

    // Set the input asp-for attributes (for model binding)
    setElementAttributes(document.getElementById('EditUser_UserName'), 'asp-for', `Users[${userId}].UserName`);
    setElementAttributes(document.getElementById('EditUser_Email'), 'asp-for', `Users[${userId}].Email`);
    setElementAttributes(document.getElementById('EditUser_IsVerified'), 'asp-for', `Users[${userId}].IsVerified`);
    setElementAttributes(
      document.getElementById('EditUser_ContactNumber'),
      'asp-for',
      `Users[${userId}].ContactNumber`
    );
    setElementAttributes(document.getElementById('EditUser_SelectedRole'), 'asp-for', `Users[${userId}].SelectedRole`);
    setElementAttributes(document.getElementById('EditUser_SelectedPlan'), 'asp-for', `Users[${userId}].SelectedPlan`);

    // Set the input values (for value binding)
    document.getElementById('EditUser_UserName').value = userName;
    document.getElementById('EditUser_Email').value = userEmail;
    document.getElementById('EditUser_IsVerified').checked = JSON.parse(isVerified.toLowerCase());
    document.getElementById('EditUser_ContactNumber').value = userContactNumber;
    document.getElementById('EditUser_SelectedRole').value = userSelectedRole.toLowerCase();
    document.getElementById('EditUser_SelectedPlan').value = userSelectedPlan.toLowerCase();
  };

  // Attach event listeners for "Edit User" buttons (pencil icon)
  const editUserButtons = document.querySelectorAll("[id$='-editUser']");
  editUserButtons.forEach(editButton => {
    editButton.addEventListener('click', () => handleEditUserModal(editButton));
  });

  // Check and Call the functions to check and display success messages on page reload (for delete, create and update)
  checkAndShowSuccessAlert('successFlag', 'Deleted');
  checkAndShowSuccessAlert('newUserFlag', 'Created');
  checkAndShowSuccessAlert('editUserFlag', 'Updated');

  // Get the Create for validation
  const createNewUserForm = document.getElementById('createUserForm');

  // Initialize FormValidation for create user form
  const fv = FormValidation.formValidation(createNewUserForm, {
    fields: {
      'NewUser.UserName': {
        validators: {
          notEmpty: {
            message: 'Please enter a user name'
          },
          stringLength: {
            min: 6,
            max: 20,
            message: 'The user name must be more than 6 and less than 20 characters long'
          }
        }
      },
      'NewUser.Email': {
        validators: {
          notEmpty: {
            message: 'Please enter an email address'
          },
          emailAddress: {
            message: 'Please enter a valid email address'
          },
          stringLength: {
            max: 50,
            message: 'The email address must be less than 50 characters long'
          }
        }
      },
      'NewUser.ContactNumber': {
        validators: {
          notEmpty: {
            message: 'Please enter a contact number'
          },
          phone: {
            country: 'US',
            message: 'Please enter a valid phone number'
          },
          stringLength: {
            min: 12,
            message: 'The contact number must be 10 characters long'
          }
        }
      },
      'NewUser.SelectedRole': {
        validators: {
          notEmpty: {
            message: 'Please select a role'
          }
        }
      },
      'NewUser.SelectedPlan': {
        validators: {
          notEmpty: {
            message: 'Please select a plan'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        eleValidClass: 'is-valid',
        rowSelector: function (field, ele) {
          return '.mb-3';
        }
      }),
      submitButton: new FormValidation.plugins.SubmitButton({
        // Specify the selector for your submit button
        button: '[type="submit"]'
      }),
      // Submit the form when all fields are valid
      // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  })
    .on('core.form.valid', function () {
      // if fields are valid then
      submitFormAndSetSuccessFlag(createNewUserForm, 'newUserFlag');
    })
    .on('core.form.invalid', function () {
      // if fields are invalid
      return;
    });

  // For phone number input mask with cleave.js (US phone number)
  const phoneMaskList = document.querySelectorAll('.phone-mask');
  if (phoneMaskList) {
    phoneMaskList.forEach(function (phoneMask) {
      new Cleave(phoneMask, {
        phone: true,
        phoneRegionCode: 'US'
      });
    });
  }

  // Get the Edit form validation
  const editUserForm = document.getElementById('editUserForm');

  // Initialize FormValidation for edit user form
  const fv2 = FormValidation.formValidation(editUserForm, {
    fields: {
      'user.UserName': {
        validators: {
          notEmpty: {
            message: 'Please enter a user name'
          },
          stringLength: {
            min: 6,
            max: 20,
            message: 'The user name must be more than 6 and less than 20 characters long'
          }
        }
      },
      'user.Email': {
        validators: {
          notEmpty: {
            message: 'Please enter an email address'
          },
          emailAddress: {
            message: 'Please enter a valid email address'
          },
          stringLength: {
            max: 50,
            message: 'The email address must be less than 50 characters long'
          }
        }
      },
      'user.ContactNumber': {
        validators: {
          notEmpty: {
            message: 'Please enter a contact number'
          },
          phone: {
            country: 'US',
            message: 'Please enter a valid phone number'
          },
          stringLength: {
            min: 12,
            message: 'The contact number must be 10 characters long'
          }
        }
      },
      'user.SelectedRole': {
        validators: {
          notEmpty: {
            message: 'Please select a role'
          }
        }
      },
      'user.SelectedPlan': {
        validators: {
          notEmpty: {
            message: 'Please select a plan'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        eleValidClass: 'is-valid',
        rowSelector: function (field, ele) {
          return '.mb-3';
        }
      }),
      submitButton: new FormValidation.plugins.SubmitButton({
        // Specify the selector for your submit button
        button: '[type="submit"]'
      }),
      // Submit the form when all fields are valid
      // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  })
    .on('core.form.valid', function () {
      // if fields are valid then
      submitFormAndSetSuccessFlag(editUserForm, 'editUserFlag');
    })
    .on('core.form.invalid', function () {
      // if fields are invalid
      return;
    });
})();

// User DataTable initialization
$(document).ready(function () {
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // User List DataTable Initialization (For User CRUD Page)
  $('#userTable').DataTable({
    order: [[1, 'desc']],
    displayLength: 7,
    dom:
      // Datatable DOM positioning
      '<"ms-3 me-4 d-flex flex-wrap flex-column flex-sm-row py-4 py-sm-0"' +
      '<"d-flex align-items-center me-auto"l>' +
      '<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex flex-sm-row align-items-center justify-content-md-end ms-n2 ms-md-2 flex-wrap flex-sm-nowrap"fB>' +
      '>t' +
      '<"row mx-4"' +
      '<"col-sm-12 col-md-6"i>' +
      '<"col-sm-12 col-md-6 pb-3 ps-0"p>' +
      '>',
    lengthMenu: [7, 10, 15, 20],
    language: {
      searchPlaceholder: 'Search..',
      search: '',
      lengthMenu: '_MENU_'
    },
    // Buttons with Dropdown
    buttons: [
      {
        extend: 'collection',
        className: 'btn btn-label-secondary dropdown-toggle mx-3',
        text: '<i class="ti ti-screen-share me-2"></i>Export',
        buttons: [
          {
            extend: 'print',
            title: 'Users Data',
            text: '<i class="ti ti-printer me-2" ></i>Print',
            className: 'dropdown-item',
            customize: function (win) {
              //customize print view for dark
              $(win.document.body)
                .css('color', config.colors.headingColor)
                .css('border-color', config.colors.borderColor)
                .css('background-color', config.colors.body);

              $(win.document.body)
                .find('table')
                .addClass('compact')
                .css('color', 'inherit')
                .css('border-color', 'inherit')
                .css('background-color', 'inherit');

              // Center the title "Users Data"
              $(win.document.body).find('h1').css('text-align', 'center');
            },
            exportOptions: {
              columns: [1, 2, 3, 4, 5, 6, 7],
              format: {
                body: function (data, row, column, node) {
                  if (column === 1) {
                    var $content = $(data);
                    // Extract the value of data-user-name attribute (User Name)
                    var userName = $content.find('[class^="user-name-full-"]').text();
                    return userName;
                  } else if (column === 3) {
                    // Extract the value of data-is-verified attribute (Is Verified)
                    var isVerified = /data-is-verified="(.*?)"/.exec(data)[1];
                    return isVerified === 'True' ? 'Verified' : 'Not Verified';
                  }
                  return data;
                }
              }
            }
          },
          {
            extend: 'csv',
            title: 'Users',
            text: '<i class="ti ti-file-text me-2" ></i>Csv',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4, 5, 6, 7],
              format: {
                body: function (data, row, column, node) {
                  if (column === 1) {
                    var $content = $(data);
                    // Extract the value of data-user-name attribute (User Name)
                    var userName = $content.find('[class^="user-name-full-"]').text();
                    return userName;
                  } else if (column === 3) {
                    // Extract the value of data-is-verified attribute (Is Verified)
                    var isVerified = /data-is-verified="(.*?)"/.exec(data)[1];
                    return isVerified === 'True' ? 'Verified' : 'Not Verified';
                  }
                  return data;
                }
              }
            }
          },
          {
            extend: 'excel',
            title: 'Users',
            text: '<i class="ti ti-file-spreadsheet me-1"></i>Excel',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4, 5, 6, 7],
              format: {
                body: function (data, row, column, node) {
                  if (column === 1) {
                    var $content = $(data);
                    // Extract the value of data-user-name attribute (User Name)
                    var userName = $content.find('[class^="user-name-full-"]').text();
                    return userName;
                  } else if (column === 3) {
                    // Extract the value of data-is-verified attribute (Is Verified)
                    var isVerified = /data-is-verified="(.*?)"/.exec(data)[1];
                    return isVerified === 'True' ? 'Verified' : 'Not Verified';
                  }
                  return data;
                }
              }
            }
          },
          {
            extend: 'pdf',
            title: 'Users',
            text: '<i class="ti ti-file-code-2 me-2"></i>Pdf',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4, 5, 6, 7],
              format: {
                body: function (data, row, column, node) {
                  if (column === 1) {
                    var $content = $(data);
                    // Extract the value of data-user-name attribute (User Name)
                    var userName = $content.find('[class^="user-name-full-"]').text();
                    return userName;
                  } else if (column === 3) {
                    // Extract the value of data-is-verified attribute (Is Verified)
                    var isVerified = /data-is-verified="(.*?)"/.exec(data)[1];
                    return isVerified === 'True' ? 'Verified' : 'Not Verified';
                  }
                  return data;
                }
              }
            }
          },
          {
            extend: 'copy',
            title: 'Users',
            text: '<i class="ti ti-copy me-2" ></i>Copy',
            className: 'dropdown-item',
            exportOptions: {
              columns: [1, 2, 3, 4, 5, 6, 7],
              format: {
                body: function (data, row, column, node) {
                  if (column === 1) {
                    var $content = $(data);
                    // Extract the value of data-user-name attribute (User Name)
                    var userName = $content.find('[class^="user-name-full-"]').text();
                    return userName;
                  } else if (column === 3) {
                    // Extract the value of data-is-verified attribute (Is Verified)
                    var isVerified = /data-is-verified="(.*?)"/.exec(data)[1];
                    return isVerified === 'True' ? 'Verified' : 'Not Verified';
                  }
                  return data;
                }
              }
            }
          }
        ]
      },
      {
        // For Create User Button (Add New User)
        text: '<i class="ti ti-plus me-0 me-md-2 ti-xs"></i><span class="d-none d-md-inline-block">Add New User</span>',
        className: 'add-new btn btn-primary',
        attr: {
          'data-bs-toggle': 'offcanvas',
          'data-bs-target': '#createUserOffcanvas'
        }
      }
    ],
    responsive: true,
    // For responsive popup
    rowReorder: {
      selector: 'td:nth-child(2)'
    },
    // For responsive popup button and responsive priority for user name
    columnDefs: [
      {
        // For Responsive Popup Button (plus icon)
        className: 'control',
        searchable: false,
        orderable: false,
        responsivePriority: 2,
        targets: 0,
        render: function (data, type, full, meta) {
          return '';
        }
      },
      {
        // For Id
        targets: 1,
        responsivePriority: 4
      },
      {
        // For User Name
        targets: 2,
        responsivePriority: 3
      },
      {
        // For Email
        targets: 3,
        responsivePriority: 9
      },
      {
        // For Is Verified
        targets: 4,
        responsivePriority: 5
      },
      {
        // For Contact Number
        targets: 5,
        responsivePriority: 7
      },
      {
        // For Role
        targets: 6,
        responsivePriority: 6
      },
      {
        // For Plan
        targets: 7,
        responsivePriority: 8
      },
      {
        // For Actions
        targets: -1,
        searchable: false,
        orderable: false,
        responsivePriority: 1
      }
    ],
    responsive: {
      details: {
        display: $.fn.dataTable.Responsive.display.modal({
          header: function (row) {
            var data = row.data();
            var $content = $(data[2]);
            // Extract the value of data-user-name attribute (User Name)
            var userName = $content.find('[class^="user-name-full-"]').text();
            return 'Details of ' + userName;
          }
        }),
        type: 'column',
        renderer: function (api, rowIdx, columns) {
          var data = $.map(columns, function (col, i) {
            // Exclude the last column (Action)
            if (i < columns.length - 1) {
              return col.title !== ''
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }
            return '';
          }).join('');

          return data ? $('<table class="table"/><tbody />').append(data) : false;
        }
      }
    }
  });
});

// For Modal to close on edit button click
var editUserOffcanvas = $('#editUserOffcanvas');

// Event listener for the "Edit" offcanvas opening
editUserOffcanvas.on('show.bs.offcanvas', function () {
  // Close any open modals
  $('.modal').modal('hide');
});

// Filter Form styles to default size after DataTable initialization
setTimeout(() => {
  $('.dataTables_filter .form-control').removeClass('form-control-sm');
  $('.dataTables_length .form-select').removeClass('form-select-sm');
  $('.dt-buttons').addClass('d-flex align-items-center');
  $('#userTable_length').addClass('mt-0 mt-md-3');
}, 300);
