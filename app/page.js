import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Link href={`/products`}>
        <div className="border rounded-lg p-6 shadow-lg text-center bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
          <h2 className="text-lg font-bold">Go to Products</h2>
        </div>
      </Link>
    </div>
  );
}
