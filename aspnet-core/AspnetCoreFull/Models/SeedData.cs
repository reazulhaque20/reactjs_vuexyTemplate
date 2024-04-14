using System;
using System.Linq;
using AspnetCoreFull.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AspnetCoreFull.Models
{
  public static class SeedData
  {
    public static void Initialize(IServiceProvider serviceProvider)
    {
      using (var context = new UserContext(
          serviceProvider.GetRequiredService<DbContextOptions<UserContext>>()))
      {
        // Check if there is already data in the database
        if (context.User.Any())
        {
          return; // Database has been seeded
        }

        // Seed some sample data
        var users = new User[]
        {
        new User
        {
            Id = 1,
            UserName = "John Doe",
            Email = "john.doe@example.com",
            IsVerified = true,
            ContactNumber = "+1 (123) 456-7890",
            SelectedRole = "admin",
            AvailableRoles = new List<string> { "subscriber", "editor", "maintainer", "author", "admin" },
            SelectedPlan = "enterprise",
            AvailablePlans = new List<string> { "basic", "enterprise", "company", "team" }
        },
        new User
        {
            Id = 2,
            UserName = "Jane Smith",
            Email = "jane.smith@example.com",
            IsVerified = false,
            ContactNumber = "+1 (987) 654-3210",
            SelectedRole = "author",
            AvailableRoles = new List<string> { "subscriber", "editor", "maintainer", "author", "admin" },
            SelectedPlan = "company",
            AvailablePlans = new List<string> { "basic", "enterprise", "company", "team" }
        },
        new User
        {
            Id = 3,
            UserName = "Alice Johnson",
            Email = "alice.johnson@example.com",
            IsVerified = true,
            ContactNumber = "+1 (555) 555-5555",
            SelectedRole = "editor",
            AvailableRoles = new List<string> { "subscriber", "editor", "maintainer", "author", "admin" },
            SelectedPlan = "basic",
            AvailablePlans = new List<string> { "basic", "enterprise", "company", "team" }
        },
        new User
        {
            Id = 4,
            UserName = "Bob Wilson",
            Email = "bob.wilson@example.com",
            IsVerified = false,
            ContactNumber = "+1 (777) 777-7777",
            SelectedRole = "subscriber",
            AvailableRoles = new List<string> { "subscriber", "editor", "maintainer", "author", "admin" },
            SelectedPlan = "team",
            AvailablePlans = new List<string> { "basic", "enterprise", "company", "team" }
        },
        new User
        {
            Id = 5,
            UserName = "Eva Brown",
            Email = "eva.brown@example.com",
            IsVerified = true,
            ContactNumber = "+1 (999) 999-9999",
            SelectedRole = "author",
            AvailableRoles = new List<string> { "subscriber", "editor", "maintainer", "author", "admin" },
            SelectedPlan = "basic",
            AvailablePlans = new List<string> { "basic", "enterprise", "company", "team" }
        },
        // Add more user data as needed below...
        };

        context.User.AddRange(users);
        context.SaveChanges();
      }
    }
  }
}
