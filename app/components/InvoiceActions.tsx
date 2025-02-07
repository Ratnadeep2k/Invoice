import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {  CheckCircle, DownloadCloudIcon, Mail, MoreHorizontal, Pencil, Trash2Icon } from "lucide-react";
import Link from "next/link";

interface iAppProps {
    id:string ;
}


export function InvoiceActions({id}:iAppProps) {
    return (
       <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size='icon' variant='secondary'>
                    <MoreHorizontal className="size-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${id}`} >
                        <Pencil className="size-4 mr-2"/> Edit Invoice 
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/api/invoice/${id}`} target="_blank"> 
                        <DownloadCloudIcon className="size-4 mr-2"/> Download Invoice 
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='' >
                        <Mail className="size-4 mr-2"/ > Send Reminder
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='' >
                        <Trash2Icon className="size-4 mr-2"/> Delete Invoice 
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='' >
                        <CheckCircle className="size-4 mr-2"/> Make as paid  
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
       </DropdownMenu>

    )
}