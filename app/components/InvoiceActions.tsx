import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {  CheckCircle, DownloadCloudIcon, Mail, MoreHorizontal, Pencil, Trash2Icon } from "lucide-react";
import Link from "next/link";


export function InvoiceActions() {
    return (
       <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size='icon' variant='secondary'>
                    <MoreHorizontal className="size-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem asChild>
                    <Link href='' >
                        <Pencil className="size-4 mr-2"/> Edit Invoice 
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='' >
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