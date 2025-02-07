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
import { formateCurrency } from "../utils/formateCurrency";

interface iAppProps {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
}

export function CreateInvoice({address,email,firstName,lastName}:iAppProps){

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
    const [selectedDate ,setSelectedDate] = useState(new Date());
    const [rate ,setRate] = useState('');
    const [quantity ,setQuantity] = useState('');
    const calculateTotal = (Number(rate) || 0 )* (Number(quantity) || 0);

    const [currency,setCurrency] =useState('USD');



    return (
        <Card className="w-full max-w-4xl mx-auto ">
            <CardContent className="p-6">
            <form id={form.id} action={action} onSubmit ={form.onSubmit} noValidate>
            <input
            type="hidden"
            name={fields.date.name}
            value={selectedDate.toISOString()}
          />
            <input
             type="hidden"
             name={fields.total.name}
             value={calculateTotal}
            />
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
                    onValueChange={(value)=>setCurrency(value)}

                    >
                        <SelectTrigger >
                            <SelectValue placeholder='Select currency '></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                                <SelectItem value='USD'>
                                   United States Dollar -- $
                                </SelectItem>
                                <SelectItem value='INR'>
                                   Indian Rupees -- Rs
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
                            defaultValue={firstName+' '+lastName}
                            placeholder=" Your Name"/>
                             <p className="text-red-800 text-sm">{fields.fromName.errors}</p>
                            <Input 
                            name={fields.fromEmail.name}
                            key={fields.fromEmail.key}
                            defaultValue={email}
                            placeholder=" Your Email"
                            />
                            <p className="text-red-800 text-sm">{fields.fromEmail.errors}</p>
                            <Input 
                            name={fields.fromAddress.name}
                            key={fields.fromAddress.key}
                            defaultValue={address}
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
                <Label>Date</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[280px] text-left justify-start"
                  >
                    <CalendarIcon />

                    {selectedDate ? (
                      new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(selectedDate)
                    ) : (
                      <span>Pick a Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    mode="single"
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-red-500 text-sm">{fields.date.errors}</p>
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
                            type="number" placeholder="0"
                            value={quantity}
                            onChange={(e)=>setQuantity(e.target.value)}
                            />
                            <p className="text-red-800 text-sm">{fields.invoiceItemQuantity.errors}</p>
                        </div>
                        <div className="col-span-2">
                            <Input
                            name={fields.invoiceItemRate.name}
                            key={fields.invoiceItemRate.key}
                            value={rate}
                            onChange={(e)=>setRate(e.target.value)}
                            type="number" placeholder="0"/>
                            <p className="text-red-800 text-sm">{fields.invoiceItemRate.errors}</p>
                        </div>
                        <div className="col-span-2">
                            <Input 
                            value={formateCurrency({amount:calculateTotal , currency:currency as any})} disabled/>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <div className="w-1/3">
                    <div className="flex justify-between py-2">
                        <span>Subtotal </span>
                        <span>{formateCurrency({amount:calculateTotal , currency:currency as any})}</span>
                    </div>
                    <div className="flex justify-between py-2 border-t">
                        <span>Total ({currency})</span>
                        <span className="font-medium underline underline-offset-2">{formateCurrency({amount:calculateTotal , currency:currency as any})}</span>

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
                  <SubmitButton text="Send invoice to client"/>
               </div>
            </div>
            </form>
            </CardContent>
        </Card>
    )
}