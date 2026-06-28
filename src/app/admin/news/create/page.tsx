'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { font_accent } from "@/lib/fonts";

export default function CreateNews() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;
    const title = (
      form.elements.namedItem("title") as HTMLInputElement
    ).value.trim();
    const content = (
      form.elements.namedItem("content") as HTMLTextAreaElement
    ).value.trim();
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput.files?.[0];

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) {
        formData.append("media", file);
      }

      const response = await fetch("/api/news", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError(error);
      }

      router.push("/admin/news");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content flex flex-col gap-y-10 items-center py-10">
      <h2 className={`${font_accent.className}`}>Добавление контента</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded w-full">
            {error}
          </div>
        )}

        <div className="w-full">
          <label>
            Придумай заголовок: <span className="text-red-500">*</span>
          </label>
          <input type="text" name="title" required />
        </div>

        <div className="w-full">
          <label>
            Введи текст новости: <span className="text-red-500">*</span>
          </label>
          <textarea
            name="content"
            placeholder="Минимум 10 символов"
            required
            minLength={10}
            rows={6}
          />
        </div>

        <div className="w-full">
          <label>Выбери фото или видео:</label>
          <input
            type="file"
            name="file"
            accept="image/jpg,image/jpeg,image/png,image/webp,video/mp4,video/mov,video/webm"
          />
        </div>

        <button type="submit" disabled={isLoading} className={``}>
          {isLoading ? "Добавляем новость..." : "Добавить новость"}
        </button>
      </form>
    </div>
  );
}
