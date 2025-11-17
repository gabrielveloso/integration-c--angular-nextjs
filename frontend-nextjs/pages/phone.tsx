"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./auth.css";

export default function PhoneScreen() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const sendPhone = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/api/Auth/login-phone`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone,
          otp: "123456",
        }),
      }
    );

    router.push(`/verify?phone=${encodeURIComponent(phone)}`);
  };

  return (
    <div className="container">
      <h1>Login to your account</h1>
      <p>Please enter your phone number to continue</p>

      <input
        placeholder="(234) 567-8909"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={sendPhone}>Send verification code</button>
    </div>
  );
}
