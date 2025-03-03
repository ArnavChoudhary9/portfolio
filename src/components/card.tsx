import Image from "next/image";
import Link from "next/link";

const Card = (
  { title, description, link, image }: {
    title: string;
    description: string;
    link: string;
    image: string;
  }
) => {
  const maxLength = 80;
  description = description.slice(0, maxLength) + (description.length > maxLength ? '...' : '');

  return (
    <Link
      className="m-4 rounded-lg border border-transparent bg-neutral-700/40
      transition-transform duration-200 ease-in-out
      hover:scale-105 hover:border-gray-300 
      block"
      href={link}
    >

      <div className="relative z-[100] w-full h-[125px] overflow-hidden">
        <Image
          className="rounded-t-lg object-cover items-center"
          fill
          src={image}
          alt=""
        />
      </div>

      <div className="flex flex-col px-4 py-4">
        <h2 className="mb-2 text-2xl font-semibold">
          {title}{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>

        <p className="text-sm opacity-70">{description}</p>
      </div>

    </Link>
  );
}

export default Card;
