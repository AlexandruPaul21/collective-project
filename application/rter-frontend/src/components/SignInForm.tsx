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
import {toast} from "@/components/ui/use-toast.ts";
import {AuthService} from "@/apis/auth/AuthService.tsx";
import {LoginRequest} from "@/utils/types.tsx";
import {capitalizeString} from "@/lib/utils.ts";


const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === "string") {
      return { message: capitalizeString(issue.path.toString()) +" is too short!" };
    }
  }
  return { message: ctx.defaultError };
};

const FormSchema = z.object({
    username: z.string().min(3).max(64),
    password: z.string().min(3).max(64),
})

z.setErrorMap(customErrorMap);


// The sign-in form
// Contains username, password fields
// Throws a toast message to parent if any data is invalid
export function SignInForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
      const {status,message} = await AuthService.login(data as LoginRequest);
      toast({
        title: status===200?"Success":"Error",
        variant: status===200?"default":"destructive",
        description:
          message,
      })
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
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>

          {/*  SUBMIT BUTTON  */}
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

export default SignInForm;