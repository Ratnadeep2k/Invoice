import Image from "next/image";
import Link from "next/link";
import logo from "@/public/im.svg";
import { buttonVariants } from "@/components/ui/button";

export function Navbar() {
    return (
        <div className="justify-between items-center flex py-5">
            <Link href="/" className="flex items-center gap-2">
                <Image src={logo} alt="logo" className="size-10" />
                <h3 className="text-3xl font-semibold">Invoice <span className="text-blue-800">Manager</span></h3>
            </Link>
            <Link href='/login' className={buttonVariants()}>
                Get Started
            </Link>
        </div>
    )
}