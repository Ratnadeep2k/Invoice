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
import { date } from "zod";
import { SubmitButton } from "./SubmitButton";
import { createInvoice } from "../actions";
import { invoiceSchema } from "../utils/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { useForm } from "@conform-to/react";

export function CreateInvoice(){

    const [lastResult , action ] =useActionState(createInvoice,undefined) //coming from action 
    const [] =useForm({
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
            <CardContent className="p-6">
               <div className="flex flex-col gap-1 w-fit mb-6">
                  <div className="flex items-center gap-4">
                   <Badge variant='secondary'>Draft</Badge>
                    <Input placeholder="Test 123"/>
                  </div>
               </div>
               <div className="grid md:grid-cols-2 gap-6 mb-6">
                 <div>
                    <Label>Invoice No. </Label>
                    <div className="flex">
                        <span className="px-3 border-r-0 rounded-l-md bg-muted flex items-center" >#</span>
                        <Input className="rounded-l-none" placeholder="1"/>
                    </div>
                 </div>
                 <div>
                    <Label>Currency</Label>
                    <Select defaultValue="USD">
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
                 </div>
               </div>


                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div >
                        <Label>From</Label>
                        <div className="space-y-2">
                            <Input placeholder=" Your Name"/>
                            <Input placeholder=" Your Email"/>
                            <Input placeholder=" Your Address"/>
                        </div>
                    </div>
                    <div>
                        <Label>To</Label>
                        <div className="space-y-2">
                            <Input placeholder=" Client Name"/>
                            <Input placeholder=" Client Email"/>
                            <Input placeholder=" Client Address"/>
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
                    </div>

                    <div>
                        <label>Due Date</label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Due Date"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='7'>Due on Reciept </SelectItem>
                                <SelectItem value='15'>Net 15</SelectItem>
                                <SelectItem value='30'>Net 30 </SelectItem>
                             </SelectContent>
                        </Select>
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
                            <Textarea placeholder="Item name and Description "/>
                        </div>
                        <div className="col-span-2">
                            <Input type="text" placeholder="0"/>
                        </div>
                        <div className="col-span-2">
                            <Input type="number" placeholder="0"/>
                        </div>
                        <div className="col-span-2">
                            <Input type="number" placeholder="0" disabled/>
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
                <Textarea placeholder="Add a note to your invoice"/>
            </div>

            <div className="flex justify-end items-center ">
               <div>
                  <SubmitButton text="Send Invoice to client"/>
               </div>
            </div>


            </CardContent>
        </Card>
    )
}