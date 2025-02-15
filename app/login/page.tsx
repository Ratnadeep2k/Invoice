
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { auth, signIn } from '../utils/auth'
import { SubmitButton } from '../components/SubmitButton'
import { requireUser } from '../utils/hooks'
import { redirect } from 'next/navigation'
export default async function Login() {
    const session = await auth();
    if (session?.user) {
        redirect("/dashboard")
    }
    return (
        <>

<div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
           <div className="flex h-screen w-full items-center justify-center px-4">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className='text-2xl'>Login</CardTitle>
                        <CardDescription> Enter your email to login your account </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={async (formData) => {
                            "use server"
                            await signIn("nodemailer",formData)
                        }} className='flex flex-col gap-y-4' >
                            <div className='flex flex-col space-y-2'>
                                <Label>Email</Label>
                                <Input 
                                type="email" 
                                placeholder='hello@hello.com' 
                                name='email'
                                required
                                />
                            </div>
                            <SubmitButton text='sign in'/>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}