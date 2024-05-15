import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import enqueToaster from "../components/toaster";
import { login } from "../lib/loginHandler";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const user = await login({ email, password });
    window.location.replace("/home");
  });

  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="g-10 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/*
            <!-- Left column container with background--> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="/static/images/login-hero.jpg"
              className="w-full"
              alt="Phone image"
            />
          </div>

          {/*
            <!-- Right column container with form --> */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <h3 className="text-center  text-2xl font-bold mb-10 ">Login</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <input
                type="email"
                label="Email address"
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
                size="lg"
                className="border p-2 rounded"
                placeholder="Enter Email"
              ></input>
              <input
                type="password"
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
                label="Password"
                className="border p-2 rounded"
                placeholder="Enter Password"
                size="lg"
              ></input>

              <button
                type="submit"
                className="inline-block w-full rounded bg-blue-700 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
