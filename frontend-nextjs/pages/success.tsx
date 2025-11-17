import { useRouter } from "next/router";
import "./auth.css";

export default function SuccessScreen() {
  const router = useRouter();
  const { status } = router.query;

  const isSuccess = status === "ok";

  return (
    <div className="container">
      {isSuccess ? (
        <>
          <h1>Verification successful!</h1>
          <p>Redirecting to dashboard...</p>
          <button onClick={() => router.push("/logout")}>
            Go to dashboard
          </button>
        </>
      ) : (
        <>
          <h1>Verification failed</h1>
          <p>Please try again.</p>
          <button onClick={() => router.push("/")}>Retry</button>
        </>
      )}
    </div>
  );
}
