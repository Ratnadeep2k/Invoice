'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../components/SubmitButton";
import { useActionState } from "react";
import { onboardUser } from "../actions";
import {useForm} from '@conform-to/react'
import { parseWithZod } from "@conform-to/zod";
import { onBoardingSchema } from "../utils/zodSchema";

export default function OnboardingPage() {
    const [lastResult,action] =useActionState(onboardUser,undefined);
    const [form,fields] =useForm({
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData,{
                schema:onBoardingSchema
           })
        },
        shouldValidate:'onBlur',
        shouldRevalidate:'onInput',

    })
    return (
       <div className="min-h-screen w-screen flex items-center justify-center">
        <Card className="max-w-sm mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    You are almost there
                </CardTitle>
                <CardDescription>
                    Please complete the following steps to <span className="text-blue-800"> get started</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-4" 
                action={action} 
                id={form.id} 
                onSubmit={form.onSubmit} 
                noValidate
                >
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>First Name</Label>
                        <input 
                        name={fields.firstName.name} 
                        key={fields.firstName.key}
                        defaultValue={fields.firstName.initialValue}
                        placeholder="  John " 
                        />
                        <p className="text-red-500 text-sm">{fields.firstName.errors}</p>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <Label>Last Name</Label>
                        <input placeholder="  doe" 
                          name={fields.lastName.name} 
                          key={fields.lastName.key}
                          defaultValue={fields.lastName.initialValue}
                        />
                         <p className="text-red-500 text-sm">{fields.lastName.errors}</p>
                    </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Address</Label>
                        <input 
                        placeholder="  1234 Main St" 
                        name={fields.address.name} 
                          key={fields.address.key}
                          defaultValue={fields.address.initialValue}
                        />
                        <p className="text-red-500 text-sm">{fields.address.errors}</p>
                    </div>
                    <SubmitButton text="Finish Onboarding"/>
                </form>
            </CardContent>
        </Card>

       </div>
    )
}