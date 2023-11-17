"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Gender, User} from "@/utils/types.tsx";
import {AuthService} from "@/apis/auth/AuthService.ts";
// import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    username: z.string().min(3).max(64),
    email: z.string().email().min(3).max(64),
    password: z.string().min(3).max(64),
    name: z.string().min(3).max(64),
    address: z.string().min(3).max(64),
    gender: z.nativeEnum(Gender),
}).required();

export function SignUpForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            name: "",
            address: "",
            gender: Gender.MALE,
        },
    })


    function onSubmit(data: z.infer<typeof FormSchema>) {
        AuthService.signup(data as User);
    }

    return (
        <div className='w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">

                    <div className="space-y-2">
                        {/*  USERNAME  */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/*  NAME  */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/*  EMAIL  */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/*  PASSWORD  */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/*  ADDRESS  */}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/*  GENDER  */}
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/*/!*  USER TYPE  *!/*/}
                        {/*<FormField*/}
                        {/*    control={form.control}*/}
                        {/*    name="userType"*/}
                        {/*    render={({field}) => (*/}
                        {/*        <FormItem>*/}
                        {/*            <FormLabel>User Type</FormLabel>*/}
                        {/*            <FormControl>*/}
                        {/*                <Input placeholder="" {...field} />*/}
                        {/*            </FormControl>*/}

                        {/*            <FormMessage/>*/}
                        {/*        </FormItem>*/}
                        {/*    )}*/}
                        {/*/>*/}

                    </div>


                    {/*  SIBMIT BUTTON  */}
                    <Button className="w-full mt-6" type="submit">Sign up</Button>
                </form>
            </Form>
        </div>
    )
}

export default SignUpForm;
