using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
// using AspnetCoreStarter.Data;
// using AspnetCoreStarter.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

// Add services to the container.
builder.Services.AddRazorPages();

// builder.Services.AddDbContext<UserContext>(options =>
// {
//   options.UseSqlite(builder.Configuration.GetConnectionString("UserContext") ?? throw new InvalidOperationException("Connection string 'UserContext' not found."));
// }, ServiceLifetime.Scoped);

var app = builder.Build();

// using (var scope = app.Services.CreateScope())
// {
//   var services = scope.ServiceProvider;

//   SeedData.Initialize(services);
// }

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
  app.UseExceptionHandler("/Error");
  // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
  app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
