import Link from "next/link";



export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link href="/dashboard/admin" className="text-blue-500 hover:underline">
                Go to Admin
            </Link>
        </div>
    );
}
