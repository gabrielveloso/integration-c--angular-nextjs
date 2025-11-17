import { useRouter } from "next/router";
import { useState } from "react";
import "./auth.css";

export default function VerifyScreen() {
  const router = useRouter();
  const { phone } = router.query;

  const [otp, setOtp] = useState("");

  const verify = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/api/auth/login-phone`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone,
          otp: otp,
        }),
      }
    );

    if (res.ok) {
      router.push("/success?status=ok");
    } else {
      router.push("/success?status=fail");
    }
  };

  return (
    <div className="container">
      <h1>Enter the 6-digit code</h1>
      <p>We sent a code to your phone</p>

      <input
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="otp-input"
      />

      <button onClick={verify}>Verify</button>

      <button onClick={() => router.push("/")}>Change phone number</button>
    </div>
  );
}
