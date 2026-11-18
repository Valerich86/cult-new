'use client';

import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  param: number|string;
  from: "news"|"gallery";
}

export default function DeleteForm ({param, from}:Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleDelete = async() => {
    if (isLoading) return;
    setIsLoading(true);
    const agree = confirm('ОСТОРОЖНО! Данное действие необратимо! 🙈');
    if (agree) {
      const url = from === "news" ? `/api/news/${param}` : `/api/gallery?url=${param}`
      try {
        await fetch(url, {
          method: "DELETE"
        });
      } catch (error) {
        console.error(error);
      } finally {
        router.refresh();
        setIsLoading(false);
      }
    } else setIsLoading(false);
  }

  return (
    <div onClick={handleDelete}>
      <MdDeleteForever size={20} className={!isLoading ? "link text-red-600" : "cursor-not-allowed text-gray-500"}/>
    </div>
  );
}