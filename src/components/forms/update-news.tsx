"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { News } from "@/lib/data";
import Link from "next/link";
import { font_caption } from "@/lib/fonts";

export default function UpdateNewsForm({ news }: { news: News }) {
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

      const response = await fetch(`/api/news/${news.id}`, {
        method: "PUT",
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
        <label>Заголовок:</label>
        <input name="title" defaultValue={news.title} />
      </div>

      <div className="w-full">
        <label>Текст:</label>
        <textarea name="content" rows={10} defaultValue={news.content} />
      </div>

      <span>
        URL медиа:{" "}
        <Link
          className={`${font_caption.className} animate-pulse text-peachy1 link`}
          href={news.media_url}
          target="_blank"
        >
          {news.media_url}
        </Link>
      </span>
      <div className="w-full">
        <label>Изменить медиа:</label>
        <input
          type="file"
          name="file"
          accept="image/jpg,image/jpeg,image/png,image/webp,video/mp4,video/mov,video/webm"
        />
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
