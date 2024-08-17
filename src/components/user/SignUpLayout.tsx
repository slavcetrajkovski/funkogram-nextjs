"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { signup } from "@/service/UserService";
import Image from "next/image";
import Spinner from "../shared/Spinner";

export default function SignUpLayout() {
  const router = useRouter();

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state.password !== state.confirmPassword) {
      setError("Лозинките не се совпаѓаат!");
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      try {
        setError(null);
        const response = await signup({
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: state.password,
        });
        setState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        alert("Корисникот е успешно регистриран!");
        router.push("/signin");
      } catch (error: any) {
        console.error("Error during signup", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  if(loadingScreen) {
    return <Spinner  position={`mt-10`} />
  }

  return (
    <div className="min-h-screen overflow-hidden bg-yellow-700 mt-10">
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg text-black bg-white">
      <div className="flex justify-center mb-6">
        <Image src="/funkogram-logo.png" alt="Logo" width={150} height={150} />
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            Име
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={state.firstName}
            onChange={handleChange}
            placeholder="Име"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-funkogram_red focus:border-funkogram_red sm:text-sm"
            disabled={loading}
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Презиме
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
            placeholder="Презиме"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-funkogram_red focus:border-funkogram_red sm:text-sm"
            disabled={loading}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Е-меил
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Е-меил"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-funkogram_red focus:border-funkogram_red sm:text-sm"
            disabled={loading}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Лозинка
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Лозинка"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-funkogram_red focus:border-funkogram_red sm:text-sm"
            disabled={loading}
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Потврди лозинка
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={handleChange}
            placeholder="Потврди лозинка"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-funkogram_red focus:border-funkogram_red sm:text-sm"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-funkogram_red text-white font-semibold rounded-md shadow-sm hover:bg-yellow-700 hover:text-funkogram_red focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Креирај профил"}
        </button>
      </form>
    </div>
    </div>
  );
}
