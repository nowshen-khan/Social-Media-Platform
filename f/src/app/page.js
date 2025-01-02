import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default function Home() {
	return (
		<div>
			<h1>Hello World</h1>
			<ul>
				<li>
					<Link href="/signup">SignUp</Link>
				</li>
				<li>
					<Link href="/login">Login</Link>
				</li>
				<li>
					<LogoutButton />
				</li>
			</ul>
		</div>
	);
}
