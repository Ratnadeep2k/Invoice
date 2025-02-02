import Link from "next/link"
import { requireUser } from "../utils/hooks"
import im from '@/public/im.svg'
import Image from "next/image"
import { DashBoardLinks } from "../components/DasboardLinks"

export default async function DashboardLayout({children}:{children: React.ReactNode}) {
    const session = await requireUser()
    return (
       <>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                    <div className="hidden border-r bg-muted/40 md:block">
                        <div className="flex flex-col gap-2 h-full max-h-screen">
                            <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
                                <Link href="/" className="flex items-center gap-2">
                                    <Image src={im} alt="Logo" className="size-7" />
                                    <p className="text-2xl font-bold text-gray-800"> Invoice  <span className=" text-blue-600 "> Manager </span> </p>
                                </Link>
                            </div>
                            <div className="flex-1">
                                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                    <DashBoardLinks/>
                                </nav>

                            </div>
                        </div>
                    </div>
            </div>
       </>
    )
}