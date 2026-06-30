"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { font_accent } from "@/lib/fonts";

export default function PostNewsForm() {
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
    const linkName = (
      form.elements.namedItem("linkName") as HTMLTextAreaElement
    ).value.trim();
    const linkHref = (
      form.elements.namedItem("linkHref") as HTMLTextAreaElement
    ).value.trim();
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput.files?.[0];

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("linkName", linkName);
      formData.append("linkHref", linkHref);
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
      router.refresh();
      router.replace("/admin");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded w-full">
            {error}
          </div>
        )}

        <div className="w-full">
          <label>Придумай заголовок:</label>
          <input name="title" required autoFocus/>
        </div>

        <div className="w-full">
          <label>Введи текст новости:</label>
          <textarea
            name="content"
            required
            rows={10}
          />
        </div>

        <div className="w-full">
          <label>Выбери фото или видео:</label>
          <input
            type="file"
            name="file"
            required
            accept="image/jpg,image/jpeg,image/png,image/webp,video/mp4,video/mov,video/webm"
          />
        </div>

        <span className="border-t pt-3">Если нужно добавить ссылку</span>
        <div className="w-full">
          <label>Имя ссылки:</label>
          <input name="linkName" />
        </div>

        <div className="w-full">
          <label>URL ссылки:</label>
          <input name="linkHref" type="url"/>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="w-6 h-6 rounded-full border-b-2 border-secondary animate-spin"></div>
          ) : (
            "Сохранить"
          )}
        </button>
      </form>
  );
}
