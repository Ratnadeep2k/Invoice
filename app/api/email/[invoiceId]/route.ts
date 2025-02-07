import { NextResponse } from 'next/server';
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from '@/app/utils/mailtrap';
export async function POST(request : Request,{params}:{params:Promise<{invoiceId:string}>}) {
   try {
    const session = await requireUser();
    const {invoiceId} = await params;

    const invoiceData =await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: session.user?.id
        }
    });
    if(!invoiceData) return NextResponse.json({error: "Invoice not found"}, {status: 404});
    const sender = {
        email: "hello@demomailtrap.com",
        name: "RATNADEEP",
      };
    
      emailClient.send({
        from: sender,
        to: [{email: 'baruahratnadeep365@gmail.com'}],
        template_uuid: "feb1a187-7810-4c41-9799-06dc4191abd0",
        template_variables: {
          "first_name": "Test_First_name"
        }
        
      });
    return NextResponse.json({success: true});
    
   } catch (error : any) {
         return NextResponse.json({error: error.message}, {status: 500});
   }
    };

