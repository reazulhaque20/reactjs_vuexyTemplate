using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using AspnetCoreFull.Data;
using AspnetCoreFull.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace AspnetCoreFull.Pages.CRUD
{
  // The UserCRUDModel class is a Razor PageModel class that defines the logic for all CRUD operations
  public class UserCRUDModel : PageModel
  {
    // The UserContext class is a DbContext class that defines the database context
    private readonly UserContext _context;

    // The UserCRUDModel constructor accepts a UserContext object as a parameter

    public UserCRUDModel(UserContext context)
    {
      // Assign the UserContext object to the _context field
      _context = context;
    }

    [BindProperty]
    // The NewUser property is a User object that is used to store data from the form
    public User NewUser { get; set; }

    // The Users property is a List of User objects that is used to store all users from the database
    public List<User> Users { get; set; }

    // The AvailableRolesSelectList property is a SelectList object that is used to store a list of available roles
    public SelectList AvailableRolesSelectList { get; set; }

    // The AvailablePlansSelectList property is a SelectList object that is used to store a list of available plans
    public SelectList AvailablePlansSelectList { get; set; }


    // The TotalUserCount property is an integer that is used to store the total user count
    public int TotalUserCount { get; set; }

    // The VerifiedUserCount property is an integer that is used to store the count of verified users
    public int VerifiedUserCount { get; set; }

    // The UnverifiedUserCount property is an integer that is used to store the count of unverified users
    public int UnverifiedUserCount { get; set; }

    // The DuplicateUserCount property is an integer that is used to store the count of duplicate user names
    public int DuplicateUserCount { get; set; }

    public async Task OnGetAsync()
    {
      // Load all users from the database
      Users = await _context.User.ToListAsync();

      // Create select lists for available roles and plans
      AvailableRolesSelectList = new SelectList(GetAvailableRoles());
      AvailablePlansSelectList = new SelectList(GetAvailablePlans());

      // Calculate the count of duplicate user names
      DuplicateUserCount = Users.GroupBy(u => u.UserName).Sum(g => g.Count() - 1);

      // Get the total user count
      TotalUserCount = Users.Count;

      // Get the count of verified users
      VerifiedUserCount = Users.Count(u => u.IsVerified);

      // Get the count of unverified users
      UnverifiedUserCount = Users.Count(u => !u.IsVerified);
    }
    // The OnPostAsync method is called when the Create User form is submitted
    public async Task<IActionResult> OnPostAsync()
    {
      if (NewUser.UserName != null && NewUser.Email != null)
      {
        // Add a new user to the database
        _context.User.Add(NewUser);
        await _context.SaveChangesAsync();
        return RedirectToPage();
      }

      return Page();
    }

    // The OnPostEditOrUpdateAsync method is called when the Edit User form is submitted
    public async Task<IActionResult> OnPostEditOrUpdateAsync(int id)
    {
      var userToUpdate = await _context.User.FindAsync(id);
      if (userToUpdate == null)
      {
        return NotFound();
      }

      // Update user properties based on form data
      string isVerifiedString = Request.Form["user.IsVerified"];
      userToUpdate.IsVerified = (isVerifiedString == "on") ? true : false;

      // Update the user in the database and save changes
      await TryUpdateModelAsync(userToUpdate, "user", u => u.UserName, u => u.Email, u => u.IsVerified, u => u.ContactNumber, u => u.SelectedRole, u => u.SelectedPlan);
      await _context.SaveChangesAsync();
      return RedirectToPage();
    }

    // The OnPostDeleteAsync method is called when the Delete User form is submitted
    public async Task<IActionResult> OnPostDeleteAsync(int id)
    {
      var user = await _context.User.FindAsync(id);

      if (user != null)
      {
        // Remove the user from the database
        _context.User.Remove(user);
        await _context.SaveChangesAsync();
      }

      return RedirectToPage();
    }

    // Define a list of available roles
    private List<string> GetAvailableRoles()
    {
      List<string> availableRoles = new List<string>
            {
                "subscriber",
                "editor",
                "maintainer",
                "author",
                "admin"
            };

      return availableRoles;
    }

    // Define a list of available plans
    private List<string> GetAvailablePlans()
    {
      List<string> availablePlans = new List<string>
            {
                "basic",
                "enterprise",
                "company",
                "team"
            };

      return availablePlans;
    }
  }
}
