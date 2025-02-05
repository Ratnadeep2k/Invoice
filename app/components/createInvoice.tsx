'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {  CalendarIcon } from "lucide-react";
import { useActionState, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { createInvoice } from "../actions";
import { invoiceSchema } from "../utils/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";

export function CreateInvoice(){

    const [lastResult , action ] =useActionState(createInvoice,undefined) //coming from action 
    const [form ,fields] =useForm({
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData,{
                schema:invoiceSchema
            })
        },
        shouldValidate:'onBlur',
        shouldRevalidate:'onInput',
    })
    const [selectDate ,setSelectDate] = useState( new Date());
    return (
        <Card className="w-full max-w-4xl mx-auto ">
            <form id={form.id} action={action} onSubmit ={form.onSubmit} noValidate>
            <input
             type="hidden"
             name={fields.date.name}
             value={selectDate.toISOString()}
            />
            <CardContent className="p-6">
               <div className="flex flex-col gap-1 w-fit mb-6">
                  <div className="flex items-center gap-4">
                   <Badge variant='secondary'>Draft</Badge>
                    <Input 
                    name={fields.invoiceName.name} 
                    key={fields.invoiceName.key} 
                    placeholder="Test 123"
                    defaultValue={fields.invoiceName.initialValue}
                    />
                  </div>
                  <p className="text-red-800 text-sm">{fields.invoiceName.errors}</p>
               </div>
               <div className="grid md:grid-cols-2 gap-6 mb-6">
                 <div>
                    <Label>Invoice No. </Label>
                    <div className="flex">
                        <span className="px-3 border-r-0 rounded-l-md bg-muted flex items-center" >#</span>
                        <Input 
                        name={fields.invoiceNumber.name}
                        key={fields.invoiceNumber.key}
                        defaultValue={fields.invoiceNumber.initialValue}
                        className="rounded-l-none" 
                        placeholder="1"
                        />
                    </div>
                    <p className="text-red-800 text-sm">{fields.invoiceNumber.errors}</p>
                 </div>

                 <div>
                    <Label>Currency</Label>
                    <Select defaultValue="USD"
                    name={fields.currency.name}
                    key={fields.currency.key}

                    >
                        <SelectTrigger >
                            <SelectValue placeholder='Select currency '></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                                <SelectItem value='USD'>
                                   United States Dollar -- $
                                </SelectItem>
                                <SelectItem value='INR'>
                                   Indian Rupees -- ₹
                                </SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-red-800 text-sm">{fields.currency.errors}</p>
                 </div>
               </div>


                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div >
                        <Label>From</Label>
                        <div className="space-y-2">
                            <Input 
                            name={fields.fromName.name}
                            key={fields.fromName.key}
                            placeholder=" Your Name"/>
                             <p className="text-red-800 text-sm">{fields.fromName.errors}</p>
                            <Input 
                            name={fields.fromEmail.name}
                            key={fields.fromEmail.key}
                            placeholder=" Your Email"
                            />
                            <p className="text-red-800 text-sm">{fields.fromEmail.errors}</p>
                            <Input 
                            name={fields.fromAddress.name}
                            key={fields.fromAddress.key}
                            placeholder=" Your Address"/>
                            <p className="text-red-800 text-sm">{fields.fromAddress.errors}</p>
                        </div>
                       
                    </div>
                    <div>
                        <Label>To</Label>
                        <div className="space-y-2">
                            <Input
                            name={fields.clientName.name}
                            key={fields.clientName.key}
                            defaultValue={fields.clientName.initialValue}
                             placeholder=" Client Name"/>
                             <p className="text-red-800 text-sm">{fields.clientName.errors}</p>
                            <Input 
                            name={fields.clientEmail.name}
                            key={fields.clientEmail.key}
                            defaultValue={fields.clientEmail.initialValue}
                            placeholder=" Client Email"
                            />
                            <p className="text-red-800 text-sm">{fields.clientEmail.errors}</p>
                            <Input 
                            name={fields.clientAddress.name}
                            key={fields.clientAddress.key}
                            defaultValue={fields.clientAddress.initialValue}
                            placeholder=" Client Address"
                            />
                            <p className="text-red-800 text-sm">{fields.clientAddress.errors}</p>
                        </div>
                    </div>
                </div>
                

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <div>
                        <Label>Issue Date</Label>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant='outline'>
                                    <CalendarIcon className="size-4 mr-2"/>
                                    {selectDate?(
                                        new Intl.DateTimeFormat('en-US',{
                                            dateStyle:'medium'
                                        }).format(selectDate)
                                    ):(
                                        <span>Select a Date </span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar mode="single"
                                selected={selectDate}
                                onSelect={(date)=>setSelectDate(date as Date)}
                                fromDate={new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                        <p className="text-red-800 text-sm">{fields.date.errors}</p>
                    </div>

                    <div>
                        <label>Due Date</label>
                        <Select 
                        name={fields.dueDate.name}
                        key={fields.dueDate.key}
                        defaultValue={fields.dueDate.initialValue}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Due Date"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='7'>Due on Reciept </SelectItem>
                                <SelectItem value='15'>Net 15</SelectItem>
                                <SelectItem value='30'>Net 30 </SelectItem>
                             </SelectContent>
                        </Select>
                        <p className="text-red-800 text-sm">{fields.dueDate.errors}</p>
                    </div>

                </div>
                <div>
                    <div className="grid grid-cols-12 gap-4 mb-4 font-medium">
                       <p className='col-span-6'>Description</p>
                       <p className="col-span-2">Quantity</p>
                       <p className="col-span-2">Rate</p>
                       <p className="col-span-2">Amount</p>
                    </div>

                    <div className="grid grid-cols-12 gap-4 mb-4">
                        <div className="col-span-6">
                            <Textarea 
                            name={fields.invoiceItemDescription.name}
                            key={fields.invoiceItemDescription.key}
                            defaultValue={fields.invoiceItemDescription.initialValue}
                            placeholder="Item name and Description "/>
                            <p className="text-red-800 text-sm">{fields.invoiceItemDescription.errors}</p>
                        </div>
                        <div className="col-span-2">
                            <Input
                            name={fields.invoiceItemQuantity.name}
                            key={fields.invoiceItemQuantity.key}
                            type="number" placeholder="0"/>
                            <p className="text-red-800 text-sm">{fields.invoiceItemQuantity.errors}</p>
                        </div>
                        <div className="col-span-2">
                            <Input
                            name={fields.invoiceItemRate.name}
                            key={fields.invoiceItemRate.key}
                            
                            type="number" placeholder="0"/>
                            <p className="text-red-800 text-sm">{fields.invoiceItemRate.errors}</p>
                        </div>
                        <div className="col-span-2">
                            <Input 
                            defaultValue={fields.total.initialValue}
                            type="number" placeholder="0" disabled/>
                        </div>
                        
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <div className="w-1/3">
                    <div className="flex justify-between py-2">
                        <span>Subtotal </span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between py-2 border-t">
                        <span>Total(USD)</span>
                        <span className="font-medium underline underline-offset-2">$5.00</span>

                    </div>
                    </div>

                </div>
            <div className="mb-6 mt-6">
                <Label>Note</Label>
                <Textarea 
                name={fields.note.name}
                key={fields.note.key}
                defaultValue={fields.note.initialValue}
                placeholder="Add a note to your invoice"/>
                <p className="text-red-800 text-sm">{fields.note.errors}</p>
            </div>

            <div className="flex justify-end items-center ">
               <div>
                  <SubmitButton text="Send Invoice to client"/>
               </div>
            </div>
            </CardContent>
            </form>
        </Card>
    )
}