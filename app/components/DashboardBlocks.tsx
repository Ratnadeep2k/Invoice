import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { prisma } from "../utils/db";
import { requireUser } from "../utils/hooks";
import { formateCurrency } from "../utils/formateCurrency";

async function getData(userId: string){
    const [data,openInvoices,paidInvoices] = await Promise.all([
        prisma.invoice.findMany({
            where :{
                userId: userId,
            },
            select:{
                total: true,
            }
        }),
        prisma.invoice.findMany({
            where:{
                userId: userId,
                status: "PENDING"
            },
            select:{
                id: true,
            }
        }),
        prisma.invoice.findMany({
            where:{
                userId: userId,
                status: "PAID"
            },
            select:{
                id: true,
            }
        })
    ]);
    return [data,openInvoices,paidInvoices]
}


export async function DashboardBlock(){
    const session = await requireUser();
    const [data, openInvoices, paidInvoices] = await getData(session.user?.id as string);
    return(
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8" >
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="size-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                        <h2 className="text-2xl font-bold">
                            {data.reduce((acc, invoice) => acc + (invoice as {total:number}).total , 0 )
                            }

                        </h2>
                        <p className="text-xs text-muted-foreground">Since last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Invoices Issued </CardTitle>
                    <Users className="size-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                        <h2>+{data.length}</h2>
                        <p className="text-xs text-muted-foreground"> Invoices Issued </p>  
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Paid Invoices </CardTitle>
                    <CreditCard className="size-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                        <h2>+{paidInvoices.length}</h2>
                        <p className="text-xs text-muted-foreground">Total Paid Invoice</p>  
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open Invoices</CardTitle>
                    <Activity className="size-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                        <h2>+{openInvoices.length}</h2>
                        <p className="text-xs text-muted-foreground">Unpaid Invoices </p>  
                </CardContent>
            </Card>
        </div>
    )
}