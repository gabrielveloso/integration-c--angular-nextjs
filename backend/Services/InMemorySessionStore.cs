using System.Collections.Concurrent;

public record SessionInfo(string SessionId, string UserId, string Role, DateTime Expires);

public class InMemorySessionStore {
    private readonly ConcurrentDictionary<string, SessionInfo> _sessions = new();

    public string CreateSession(string userId, string role, TimeSpan ttl) {
        var id = Guid.NewGuid().ToString("N");
        Console.WriteLine($"Creating session {id} for user {userId} with role {role}");
        var s = new SessionInfo(id, userId, role, DateTime.UtcNow.Add(ttl));
        _sessions[id] = s;
        return id;
    }

    public SessionInfo? GetSession(string sessionId) {
        if (sessionId == null) return null;
        if (_sessions.TryGetValue(sessionId, out var s)) {
            if (s.Expires > DateTime.UtcNow) return s;
            _sessions.TryRemove(sessionId, out _);
        }
        return null;
    }

    public void RemoveSession(string sessionId) => _sessions.TryRemove(sessionId, out _);
}
