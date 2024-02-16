"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import getUserToken from "@/actions/userToken"
import { useRouter } from "next/navigation"

const formSchema = z.object({ "name": z.string().email(), "password": z.string() })

export default function LoginForm() {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const userToken = await getUserToken(values.name, values.password);
        console.log("token: ", userToken);

        if (userToken) {
            router.push("/project")
        }
    }

    return (
        <div className="flex p-16 h-screen w-screen items-center justify-center ">
            <div className="flex border-2 rounded-md p-4">
                <Form {...form}>
                    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-end">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>UserName</FormLabel>
                                    <FormControl>
                                        <Input placeholder="userName" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className=" w-min" type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
