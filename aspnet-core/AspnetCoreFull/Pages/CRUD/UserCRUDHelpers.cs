using System;
using System.Linq;
using AspnetCoreFull.Models;

namespace AspnetCoreFull.Helpers
{
  public class UserCRUDHelpers
  {

    public static string FormatUSPhoneNumber(string phoneNumber)
    {
      if (!string.IsNullOrEmpty(phoneNumber))
      {
        string cleanedNumber = new string(phoneNumber.Where(char.IsDigit).ToArray());

        if (cleanedNumber.Length >= 10)
        {
          return string.Format("+1 ({0}) {1}-{2}", cleanedNumber.Substring(0, 3), cleanedNumber.Substring(3, 3), cleanedNumber.Substring(6, 4));
        }
        else
        {
          return phoneNumber;
        }
      }
      return phoneNumber;
    }

    public static string GenerateUserAvatar(User user)
    {
      var random = new Random();
      var states = new[] { "success", "danger", "warning", "info", "dark", "primary", "secondary" };
      var randomIndex = (user.Id < 1 || user.Id > 6) ? random.Next(0, states.Length) : user.Id;
      randomIndex = Math.Max(0, Math.Min(randomIndex, states.Length - 1));
      var selectedState = states[randomIndex];
      var nameParts = user.UserName.Split(' ');
      var initials = "NA";

      if (nameParts.Length == 1)
      {
        if (nameParts[0].Length >= 1)
        {
          initials = nameParts[0].Substring(0, 1);
        }
      }
      else if (nameParts.Length >= 2)
      {
        string firstInitial = nameParts[0].Length >= 1 ? nameParts[0].Substring(0, 1) : "";
        string secondInitial = nameParts[1].Length >= 1 ? nameParts[1].Substring(0, 1) : "";
        initials = firstInitial + secondInitial;
      }

      var avatarHtml = $@"
<div class=""d-flex align-items-center"">
<div class=""avatar avatar-sm me-3 d-none d-sm-block"">
<span class=""avatar-initial rounded-circle bg-label-{selectedState}"">{initials}</span>
</div>
<a href=""/Apps/Users/View/Account"" class=""user-name-full-{user.Id} fw-medium text-capitalize text-wrap text-body"">{user.UserName}</a>
</div>";

      return avatarHtml;
    }
  }
}
