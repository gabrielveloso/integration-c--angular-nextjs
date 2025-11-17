using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class SessionController : ControllerBase
{
    private readonly InMemorySessionStore _store;
    public SessionController(InMemorySessionStore store) => _store = store;

    [HttpGet("me"), HttpOptions("me")]
    public IActionResult Me()
    {
        Request.Cookies.TryGetValue("session_id", out var sid);
        Console.WriteLine($"Received session_id cookie: {sid}");
        var session = _store.GetSession(sid);
        if (session == null) return Unauthorized();
        return Ok(new { userId = session.UserId, role = session.Role });
    }
}
