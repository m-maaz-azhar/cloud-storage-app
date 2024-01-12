import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/header";
import { withSessionSsr } from "./api/lib/withSession";

export default function Login() {
  const [error, setError] = useState(null);

  const router = useRouter();

  const validateForm = (email, password) => {
    if (!email.value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
      setError("Invalid email");
      return;
    }
    if (password.value.length === 0) {
      setError("Password cannot be empty");
      return;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    let validated = validateForm(email, password);

    if (validated) {
      let body = {
        email: email.value,
        password: password.value,
      };

      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        return router.push("/dashboard");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="hero-section">
        <div className="container w-[300px]">
          <h1 className="text-5xl text-white font-bold">Login</h1>
          <p className="text-white mt-4">Login to your account</p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[10px] mt-4"
          >
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="p-[10px] border border-[#4891f3] rounded-md outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="p-[10px] border border-[#4891f3] rounded-md outline-none"
            />
            {error && (
              <span className="rounded-md bg-[rgba(255,41,44,0.5)] p-2 text-white text-[12px]">
                {error}
              </span>
            )}
            <button className="bg-[#4891f3] hover:bg-[#378afa] text-white p-[10px] rounded-md">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const user = req.session.user;

  if (user) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }

  return {
    props: {},
  };
});
