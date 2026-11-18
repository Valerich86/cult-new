"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../UI/spinner";
import { mastersInfo } from "../../lib/text";

export default function PostGalleryItemForm() {
  const [targetFolder, setTargetFolder] = useState(mastersInfo[0].folder);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput.files?.[0];

    try {
      const formData = new FormData();
      formData.append("folder", targetFolder);
      if (file) formData.append("media", file);

      const response = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError(error);
      }
      router.refresh();
      router.replace("/admin/gallery");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeFolder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setTargetFolder(newValue);
    console.log("Вы выбрали:", newValue);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-primary text-secondary p-5">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded w-full">
          {error}
        </div>
      )}

      <div className="w-full">
        <label>К кому в папку сохранить?</label>
        <select value={targetFolder} onChange={handleChangeFolder} className="w-full bg-secondary rounded min-h-8 px-2 outline-peachy2 border-none text-brown">
          {mastersInfo.map((m) => (
            <option key={m.slug} value={m.folder}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <label>Выбери фото:</label>
        <input
          type="file"
          name="file"
          required
          accept="image/jpg,image/jpeg,image/png,image/webp"
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? <Spinner /> : "Сохранить"}
      </button>
    </form>
  );
}
