import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../components/SubmitButton";

export default function OnboardingPage() {
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
                <form className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>First Name</Label>
                        <input placeholder="  John " />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <Label>Last Name</Label>
                        <input placeholder="  doe" />
                    </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Address</Label>
                        <input placeholder="  1234 Main St" />
                    </div>
                    <SubmitButton text="Finish Onboarding"/>
                </form>
            </CardContent>
        </Card>

       </div>
    )
}