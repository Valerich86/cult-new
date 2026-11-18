import Image from "next/image";

interface Props {
  shadow?: boolean;
  darkened?: boolean;
}

export default function AnimatedBg({shadow = false, darkened = false}:Props) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${shadow && "shadow"}`}>
      <Image
        src={"/tech/wall.webp"}
        alt="action-bg"
        fill
        sizes="100%"
        className="object-cover animate-heroImage"
      />
      {darkened && <div className="absolute inset-0 bg-primary/40 w-full h-full"/>}
    </div>
  );
}
