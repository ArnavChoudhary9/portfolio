import Image from "next/image";

const Card = (
  { title, description, link, image }: {
    title: string;
    description: string;
    link: string;
    image: string;
  }
) => {
  return (
    <a
      className="group m-4 rounded-lg border border-transparent
      dark:bg-neutral-700/40
      transition-transform duration-200 ease-in-out
      hover:scale-105 hover:border-gray-300 
      hover:dark:border-neutral-700 hover:dark:bg-neutral-900/30
      block"
      href={link}
    >

      <Image
        className="rounded-t-lg"
        width={1080}
        height={720}
        src={image}
        alt=""
      />

      <div className="px-4 py-4">
        <h2 className="mb-2 text-2xl font-semibold">
          {title}{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>

        <p className="text-sm opacity-70">{description}</p>
      </div>

    </a>
  );
}

export default Card;
