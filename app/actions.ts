//server action 
'use server'
import { redirect } from "next/navigation";
import { prisma } from "./utils/db";
import { requireUser } from "./utils/hooks"
import { onBoardingSchema } from "./utils/zodSchema";
import { parseWithZod } from "@conform-to/zod";

export async function onboardUser(formData:FormData) {
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