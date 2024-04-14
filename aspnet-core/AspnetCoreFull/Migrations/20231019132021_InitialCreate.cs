using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspnetCoreFull.Migrations
{
  /// <inheritdoc />
  public partial class InitialCreate : Migration
  {
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
          name: "User",
          columns: table => new
          {
            Id = table.Column<int>(type: "INTEGER", nullable: false)
                  .Annotation("Sqlite:Autoincrement", true), // Autoincrement is for auto incrementing primary keys of users
            UserName = table.Column<string>(type: "TEXT", nullable: false),
            Email = table.Column<string>(type: "TEXT", nullable: false),
            IsVerified = table.Column<bool>(type: "INTEGER", nullable: false),
            ContactNumber = table.Column<string>(type: "TEXT", nullable: false),
            SelectedRole = table.Column<string>(type: "TEXT", nullable: false),
            SelectedPlan = table.Column<string>(type: "TEXT", nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_User", x => x.Id);
          });
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "User");
    }
  }
}
