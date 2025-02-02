'use client'
import { cn } from "@/lib/utils"
import { HomeIcon, User2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const dashboardLinks =[
    {
        id:0,
        name:'Dashboard',
        href:'/dashboard',
        icon:HomeIcon,
    },
    {
        id:1,
        name:'Invoices',
        href:'/dashboard/invoices',
        icon:User2
    }
]

export function DashBoardLinks(){
    const pathname = usePathname()
    return (
        <> 
            {dashboardLinks.map((link)=>(
                 <Link className={cn(
                    pathname === link.href ? 'text-blue-600 text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground',
                 )} href={link.href} key={link.id}>
                    <link.icon className="size-4"/>
                    {link.name}
                 </Link>

            ))}
        </>
)}