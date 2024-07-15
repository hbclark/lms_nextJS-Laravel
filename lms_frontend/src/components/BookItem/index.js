import Image from "next/image";
export default function BookItem({ searchParams }) {
  return (
    <li
      key={book.id}
      className="p-4 border w-[230px] border-solid border-gray-400 rounded-xl"
    >
      <Image
        src={book.cover}
        alt={book.title}
        width={200}
        height={300}
        priority
      />
      <h1 className="text-xl text-teal-600 font-bold">{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.publisher} </p>
      <p>{book.language}</p>
      <p>{book.category}</p>
    </li>
  );
}
