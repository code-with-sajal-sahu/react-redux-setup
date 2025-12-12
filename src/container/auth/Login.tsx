// src/components/LoginForm.tsx
import React, { useState } from "react";
import { login } from "../../redux/features/auth/authService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function Login() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((s) => s.Auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
      // success
    } else {
      // handle error (resultAction.payload or error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
      <button type="submit" disabled={status === "loading"}>
        Login
      </button>
    </form>
  );
}
