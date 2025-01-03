import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default function Home() {
	return (
		<div className="container mx-auto ">
			<h1 className="text-2xl font-bold ">Hello World</h1>
			<ul className="flex space-x-4">
				<li className="text-blue-500">
					<Link href="/signup">SignUp</Link>
				</li>
				<li className="text-blue-500">
					<Link href="/login">Login</Link>
				</li>
				<li className="text-blue-500">
					<LogoutButton className={"text-red-500"} />
				</li>
			</ul>
		</div>
	);
}
