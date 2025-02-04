'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {  CalendarIcon } from "lucide-react";
import { useState } from "react";
import { date } from "zod";

export function CreateInvoice(){
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
                    <div>
                        <Label>From</Label>
                        <div>
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
                

                <div className="grid md:grid-cols-2 gap-6">
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




            </CardContent>
        </Card>
    )
}