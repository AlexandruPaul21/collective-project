"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {AuthService} from "@/apis/auth/AuthService.ts";
import {LoginRequest} from "@/utils/types.tsx";

const FormSchema = z.object({
    email: z.string().email().min(3).max(64),
    password: z.string().min(3).max(64),
})

export function SignUpForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

    function onSubmit( data: z.infer<typeof FormSchema>) {
        AuthService.login(data as LoginRequest);
    }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-5">
            {/*  USERNAME  */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-darkgray tracking-wider">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-lightblu rounded-full border-[1px]"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  PASSWORD  */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-darkgray tracking-wider">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="border-lightblu marker:text-lightblu rounded-full border-[1px]"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/*  SIBMIT BUTTON  */}
          <Button
            className="bg-lightblu w-full rounded-full hover:bg-[#2076C1]"
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignUpForm;