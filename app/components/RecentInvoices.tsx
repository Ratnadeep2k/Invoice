import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "../utils/db";
import { requireUser } from "../utils/hooks";
import { formateCurrency } from "../utils/formateCurrency";

async function getData(userId: string) {
    const data = await prisma.invoice.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            clientEmail: true,
            total: true,
            clientName: true,
            currency: true,
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 7,
    })
    return data;
}

export async function RecentInvoices() {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);
    
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl font-semibold tracking-tight">
                    Recent Invoices
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    Your latest 7 invoices
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {data.map((invoice) => (
                    <div 
                        className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200" 
                        key={invoice.id}
                    >
                        <Avatar className="hidden sm:flex h-10 w-10 shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary">
                                {invoice.clientName.slice(0, 1)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1 min-w-0">
                            <p className="text-sm font-medium leading-none truncate">
                                {invoice.clientName}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                                {invoice.clientEmail}
                            </p>
                        </div>
                        <div className="ml-auto font-medium text-green-600 dark:text-green-400">
                            +
                            {formateCurrency({
                                amount: invoice.total,
                                currency: invoice.currency as any,
                            })}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}