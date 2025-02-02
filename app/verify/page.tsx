import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function VerifyPage() {
    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <Card className="w-[380px] px-5">
                <CardHeader className="text-center">
                    <div className="mb-4 mx-auto flex size-20 items-center justify-center rounded-sm bg-gray-100">
                        <Mail className="text-blue-800 size-12 "/>
                    </div>

                    <CardTitle className="text-2xl font-bold">
                            Check your email 
                        <CardDescription>
                            We have sent a verification link to your email address. Please check your inbox and click on the link to verify your account.
                        </CardDescription>
                    </CardTitle>

                    <CardContent>
                        <div className="mt-4 rounded-md bg-yellow-50 border-yellow-300 p-4">
                            <div className="flex items-center">
                                <AlertCircle className="size-5 text-yellow-400"/>
                                <p className="text-sm font-medium text-yellow-600 ml-3">Be sure to check your spam</p>
                            </div>

                        </div>
                    </CardContent>
                    <CardFooter>
                       <Link href="/" className={buttonVariants({
                        className: "w-full",
                        variant: "outline",
                        
                       })}>
                            <ArrowLeft/> Back to Home
                       </Link>
                    </CardFooter>

                </CardHeader>
            </Card>
        </div>
    )
}