'use client';

import { logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthNavigation() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    const clearIsAuthenticated = useAuthStore(
        (state) => state.clearIsAuthenticated,
    );

    const handleLogout = async () => {
        await logout();
        clearIsAuthenticated();
        router.push('/sign-in');
    };

    return isAuthenticated ? (
        <li>
            <p>{user?.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </li>
    ) : (
        <>
            <li>
	            <Link href="/sign-in">Login</Link>
            </li>
            <li>
	            <Link href="/sign-up">Sign up</Link>
	        </li>
        </>
    )
}