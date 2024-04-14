using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspnetCoreFull.Models
{
  public class User
  {
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public bool IsVerified { get; set; }
    public string ContactNumber { get; set; }

    // Role selection (Choose one role from the list)
    public string SelectedRole { get; set; }

    // Exclude AvailablePlans from database modeling
    [NotMapped]
    public List<string> AvailableRoles { get; set; }

    // Plan selection (Choose one plan from the list)
    public string SelectedPlan { get; set; }

    // Exclude AvailablePlans from database modeling
    [NotMapped]
    public List<string> AvailablePlans { get; set; }
  }
}
