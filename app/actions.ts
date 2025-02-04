//server action 
'use server'
import { redirect } from "next/navigation";
import { prisma } from "./utils/db";
import { requireUser } from "./utils/hooks"
import { invoiceSchema, onBoardingSchema } from "./utils/zodSchema";
import { parseWithZod } from "@conform-to/zod";

export async function onboardUser(prevState:any,formData:FormData) {
    const session =await requireUser();
    const Submission = parseWithZod(formData,{
        schema:onBoardingSchema,
    })
    if(Submission.status !== 'success'){
        return Submission.reply();
    }

    const data =await prisma.user.update({
        where:{
            id:session.user?.id
        },
        data:{
            firstName :Submission.value.firstName,
            lastName :Submission.value.lastName,
            address :Submission.value.address
        }
    });

    return redirect('/dashboard')
}


export async function createInvoice( prevState :any ,formData:FormData) {
    const session = await requireUser();
    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }

    const data = await prisma.invoice.create({
        data:{
            clientAddress:submission.value.clientAddress,
            clientEmail:submission.value.clientEmail,
            clientName:submission.value.clientName,
            currency:submission.value.currency,
            date:submission.value.date, //string 
            dueDate:submission.value.dueDate,
            fromAddress:submission.value.fromAddress,
            fromEmail:submission.value.fromEmail,
            fromName:submission.value.fromName,
            invoiceItemDescription:submission.value.invoiceItemDescription,
            invoiceItemQuantity:submission.value.invoiceItemQuantity,
            invoiceItemRate:submission.value.invoiceItemRate,
            invoicename:submission.value.invoiceName,
            invoiceNumber:submission.value.invoiceNumber,
            note:submission.value.note,
            status:submission.value.status,
            total:submission.value.total,


        }
    })
}