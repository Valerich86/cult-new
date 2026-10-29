"use client";

import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PiEyesLight } from "react-icons/pi";

type FormErrors = {
  email?: string[];
  password?: string[];
  confirm?: string[];
};

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors(undefined);
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: 'include', // БЕЗ ЭТОГО КУКИ НЕ СОХРАНЯЮТСЯ В БРАУЗЕРЕ
      });
      if (response.ok) {
        router.replace("/admin");
      } else {
        setErrors((await response.json()).errors);
      }
    } catch (error) {
      console.error("Ошибка: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <div aria-live="polite" aria-atomic="true">
          {errors?.email &&
            errors.email.map((error: string, i) => (
              <span key={i} className="error">
                {error}
              </span>
            ))}
        </div>
      </div>

      <div className="mb-5">
        <label>Пароль</label>
        <div className="flex items-center gap-2">
          <input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <PiEyesLight
            size={30}
            className={`cursor-pointer ${showPassword ? "scale-x-100" : "-scale-x-100"} transition duration-300`}
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        <div aria-live="polite" aria-atomic="true">
          {errors?.password &&
            errors.password.map((error: string, i) => (
              <span key={i} className="error">
                {error}
              </span>
            ))}
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="text-secondary">
        {isLoading ? <div className="button-loader"></div> : "Войти"}
      </button>
    </form>
  );
}
