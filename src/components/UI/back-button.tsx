import { AiOutlineUp } from "react-icons/ai";
import Link from "next/link";

interface Props {
  target?: string;
}

export default function BackButton({target}:Props) {

  return (
    <Link href={target ? target : "/"}
      className={`fixed -rotate-90 left-5 sm:left-10 lg:left-15 top-12 animate-pulse text-brown z-100`}
    >
      <AiOutlineUp size={30} />
    </Link>
  );
}
