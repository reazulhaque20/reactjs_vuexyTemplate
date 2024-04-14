using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AspnetCoreFull.Models;

namespace AspnetCoreFull.Data
{
  public class UserContext : DbContext
  {
    public UserContext(DbContextOptions<UserContext> options)
        : base(options)
    {
    }

    public DbSet<AspnetCoreFull.Models.User> User { get; set; } = default!;
  }
}
