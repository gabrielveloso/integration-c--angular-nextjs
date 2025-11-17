import { useRouter } from "next/router";
import "./auth.css";

export default function VerifyScreen() {
  const router = useRouter();

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.push("/");
  };

  return (
    <div>
      <header>
        <nav className="bg-black text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={() => logout()} className="logout-button">
            Logout
          </button>
        </nav>
      </header>
      <div className="container">
        <h1>Welcome to dashboard</h1>
        <p>You have successfully logged in.</p>

        <button
          className="w-12"
          onClick={() => (window.location.href = "http://user.test:4201")}
        >
          Go to app
        </button>
      </div>
    </div>
  );
}
