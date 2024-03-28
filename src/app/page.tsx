import Link from "next/link"

export default function Home() {
  return(
    <div>
      <h1>Home</h1>
      <Link
        href="/admin"
        className="text-blue-500 hover:underline"
      >
        Go to Admin
      </Link>
    </div>
  )
}
