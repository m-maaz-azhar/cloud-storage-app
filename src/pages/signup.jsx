import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { withSessionSsr } from "./api/lib/withSession";

export default function SignUp() {
  const [error, setError] = useState(null);

  const router = useRouter();

  const validateForm = (name, email, password, confirmPassword) => {
    if (name.value.length < 3) {
      setError("Username should be at least 3 characters long");
      return;
    }
    if (name.value.length > 20) {
      setError("Username should be at most 20 characters long");
      return;
    }
    if (!name.value.match(/^[a-zA-Z]+$/)) {
      setError("Username should only contain alphabets");
      return;
    }
    if (password.value !== confirmPassword.value) {
      setError("Passwords do not match");
      return;
    }
    if (password.value.length < 6) {
      setError("Password should be at least 6 characters long");
      return;
    }
    if (!email.value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
      setError("Invalid email");
      return;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = e.target.elements;
    let validated = validateForm(name, email, password, confirmPassword);
    if (validated) {
      let body = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      const response = await fetch("https://cloud-storage-app-g87t.onrender.com/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.ok) {
        return router.push("/login");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="hero-section">
        <div className="container w-[300px]">
          <h1 className="text-5xl text-white font-bold">Sign Up</h1>
          <p className="text-white mt-4">Create your account</p>

          <form
            className="flex flex-col gap-[10px] mt-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Username"
              name="name"
              className="p-[10px] border border-[#4891f3] rounded-md outline-none"
            />
            <input
              type="text"
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
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              className="p-[10px] border border-[#4891f3] rounded-md outline-none"
            />
            {error && (
              <span className="rounded-md bg-[rgba(255,41,44,0.5)] p-2 text-white text-[12px]">
                {error}
              </span>
            )}
            <button className="bg-[#4891f3] hover:bg-[#378afa] text-white p-[10px] rounded-md">
              Sign Up
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
