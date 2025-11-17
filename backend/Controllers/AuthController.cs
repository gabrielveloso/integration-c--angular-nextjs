using Microsoft.AspNetCore.Mvc;

public class LoginAdminDto {
    public string Email { get; set; }
    public string Password { get; set; }
}

public class LoginPhoneDto {
    public string Phone { get; set; }
    public string Otp { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase {
    private readonly InMemorySessionStore _store;
    public AuthController(InMemorySessionStore store) => _store = store;

   

    [HttpPost("login-phone"), HttpOptions("login-phone")]
    public IActionResult LoginPhone([FromBody] LoginPhoneDto dto) {
        if(dto.Phone == "96479285" && dto.Otp == "123456") {
            var sessionId = _store.CreateSession(userId: "user-1", role: "user", ttl: TimeSpan.FromHours(1));
            var cookieOptions = new CookieOptions {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Domain = ".test",
                Path = "/",
                Expires = DateTimeOffset.UtcNow.AddHours(1)
            };
            Response.Cookies.Append("session_id", sessionId, cookieOptions);
            return Ok(new { ok = true });
        }
        return Unauthorized();
    }

    [HttpPost("login-admin"), HttpOptions("login-admin")]
    public IActionResult LoginAdmin([FromBody] LoginAdminDto dto) {
        if(dto.Email == "admin@gmail.com" && dto.Password == "123456") {
            var sessionId = _store.CreateSession(userId: "admin-1", role: "admin", ttl: TimeSpan.FromHours(2));
            var cookieOptions = new CookieOptions {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/",
                Expires = DateTimeOffset.UtcNow.AddHours(2)
            };
            Response.Cookies.Append("session_id", sessionId, cookieOptions);
            return Ok();
        }
        return Unauthorized();
    }


    //get list of admin userts
    [HttpGet("admin-users")]
    public IActionResult GetAdminUsers() {
        var adminUsers = new[] {
            new { Id = "admin-1", Email = "admin@gmail.com" },
            new { Id = "admin-2", Email = "admin2@gmail.com" }
        };
        return Ok(adminUsers);
    }

    [HttpPost("logout")]
    public IActionResult Logout() {
        if(Request.Cookies.TryGetValue("session_id", out var id)) {
            _store.RemoveSession(id);
            Response.Cookies.Delete("session_id", new CookieOptions { Domain = ".test", Path = "/", SameSite = SameSiteMode.None, Secure = true });
        }
        return Ok();
    }
}
