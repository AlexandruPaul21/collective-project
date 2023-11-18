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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {Gender, User} from "@/utils/types.tsx";
import {AuthService} from "@/apis/auth/AuthService.ts";

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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex">
            <div className="mr-2 w-full space-y-4">
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
                        placeholder=""
                        {...field}
                        className="border-lightblu rounded-full border-[1px] "
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*  NAME  */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-darkgray tracking-wider">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        className="border-lightblu rounded-full border-[1px]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*  EMAIL  */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-darkgray tracking-wider">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        className="border-lightblu rounded-full border-[1px]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="ml-2 w-full space-y-4">
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
                        placeholder=""
                        {...field}
                        className="border-lightblu rounded-full border-[1px]"
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*  ADDRESS  */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-darkgray tracking-wider">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        className="border-lightblu rounded-full border-[1px]"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*  GENDER  */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-darkgray tracking-wider">
                      Gender
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="border-lightblu rounded-full border-[1px]">
                          <SelectValue placeholder="Choose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Gender.MALE}>Male</SelectItem>
                          <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/*  SUBMIT BUTTON  */}
          <Button
            className="bg-lightblu mt-9 w-full rounded-full hover:bg-[#2076C1]"
            type="submit"
          >
            Sign up
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignUpForm;
