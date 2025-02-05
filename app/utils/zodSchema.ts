import  {z} from 'zod';
export const onBoardingSchema =z.object({
    firstName:z.string().min(2,'firstname is required').max(10,'should max of 10char').nonempty(),
    lastName:z.string().nonempty().min(2,'lastname is required').max(10,'should max of 10char'),
    address:z.string().nonempty().min(2,'address is required').max(10,'should max of 10char')
})

export const invoiceSchema = z.object({
    invoiceName :z.string().nonempty().min(2,'invoice name is required').max(10,'should max of 10char'),
    total:z.number().int().positive().min(1,'Min should be  is $1'),
    status :z.enum(['PAID','PENDING']),
    date:z.string().min(2,'date is required'),
    dueDate :z.number().min(2,'due date is required'),
    fromName :z.string().min(2,'from name is required'),
    fromEmail :z.string().email().min(2,'from email is required'),
    fromAddress :z.string().min(2,'from address is required'),
    clientName :z.string().min(2,'to name is required'),
    clientEmail :z.string().email().min(2,'to email is required'),
    clientAddress :z.string().nonempty().min(2,'to address is required'),
    currency :z.string().nonempty().min(2,'currency is required'),
    invoiceNumber :z.number().min(1,'invoice number is required'),
    note :z.string().optional(),
    invoiceItemDescription :z.string().min(2,'invoice item description is required'),
    invoiceItemQuantity :z.number().int().positive().min(1,'Min should be  is 1'),
    invoiceItemRate :z.number().int().positive().min(1,'Min should be  is $1'),
})