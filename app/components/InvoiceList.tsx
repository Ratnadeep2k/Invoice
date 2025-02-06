import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceActions } from "./InvoiceActions";
import { prisma } from "../utils/db";
import { requireUser } from "../utils/hooks";
import { formateCurrency } from "../utils/formateCurrency";

async function getData(userId:string){

    const data =await prisma.invoice.findMany({
        where :{
            userId:userId,
        },
        select:{
          id:true,
            total:true,
            status:true,
            createdAt:true,
            clientName:true,  
            invoiceNumber:true,
            currency:true,
        },
        orderBy:{
            createdAt:"desc",
        }
    });
    return data;
}

export async function InvoiceList() {
    const session = await requireUser()
    const data = await getData(session.user?.id as string);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice Id</TableHead>
                    <TableHead> Customer</TableHead> 
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead> Date</TableHead>
                    <TableHead className="text-right">Actions </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>    
                {data.map((invoice)=>(
                     <TableRow key={invoice.id}>
                     <TableCell>{invoice.invoiceNumber}</TableCell>
                     <TableCell>{invoice.clientName}</TableCell>
                     <TableCell>{formateCurrency({
                        amount:invoice.total,
                        currency: invoice.currency as any
                     })}</TableCell>
                     <TableCell>{invoice.status}</TableCell>
                     <TableCell>{new Intl.DateTimeFormat('en-US',{
                            dateStyle:'medium'
                     }).format(new Date(invoice.createdAt))
                     }</TableCell>
                       <TableCell className="text-right"><InvoiceActions/></TableCell>
                  </TableRow>
                ))}
               
            </TableBody>
        </Table>
    )
}