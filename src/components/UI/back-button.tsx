import { AiOutlineUp } from "react-icons/ai";
import Link from "next/link";

interface Props {
  target?: string;
  color?: string;
}

export default function BackButton({target="/", color="brown"}:Props) {

  return (
    <Link href={target}
      className={`fixed -rotate-90 left-5 sm:left-10 lg:left-15 top-12 animate-pulse text-${color} z-100`}
    >
      <AiOutlineUp size={30} />
    </Link>
  );
}
