import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function InvoiceList() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Invoice Id
                    </TableHead>
                    <TableHead>
                        Customer
                    </TableHead>
                    <TableHead>
                        Amount
                    </TableHead>
                    <TableHead>
                        Status
                    </TableHead>
                    <TableHead>
                        Date
                    </TableHead>
                    <TableHead>
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
        </Table>
    )
}