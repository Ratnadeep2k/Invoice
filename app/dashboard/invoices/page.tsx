import { InvoiceList } from "@/app/components/InvoiceList";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function InvoicesPage() {
    return (
       <Card>
          <CardHeader>
               <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
                    <CardDescription>Manage your invoices here</CardDescription>
                </div>
                <Link href='' 
                className={buttonVariants()}
                > 
                        <PlusIcon/> Create Invoice  
                </Link>
               </div>
          </CardHeader>
          <CardContent>
            <InvoiceList/>
          </CardContent>
       </Card>
    );
}