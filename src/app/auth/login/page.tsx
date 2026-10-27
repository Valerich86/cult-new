import { Metadata } from "next";
import LoginForm from "../../../components/forms/login";
import { font_accent } from "../../../lib/fonts";

export const metadata: Metadata = {
  title: "Вход в админ-панель",
};

export default async function LoginPage() {
  return (
    <div className="x-spacing pt-10 h-screen bg-primary text-secondary">
      <h1 className={`${font_accent.className} text-3xl mb-5`}>
        Вход в админку
      </h1>
      <LoginForm />
    </div>
  );
}
