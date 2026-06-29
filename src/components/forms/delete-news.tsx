'use client';

import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

export default function DeleteNewsForm ({id}:Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleDelete = async() => {
    if (isLoading) return;
    setIsLoading(true);
    const agree = confirm('Уверен, что хочешь удалить запись?');
    if (agree) {
      try {
        await fetch(`/api/news/${id}`, {
          method: "DELETE"
        });
      } catch (error) {
        console.error(error);
      } finally {
        router.refresh();
        setIsLoading(false);
      }
    }
  }

  return (
    <div onClick={handleDelete}>
      <MdDeleteForever size={20} className={!isLoading ? "link text-red-600" : "cursor-not-allowed text-gray-500"}/>
    </div>
  );
}