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

const FormSchema = z.object({
  username: z.string().min(5),
  email: z.string().min(5),
  password: z.string().min(5),
  name: z.string().min(5),
  address: z.string().min(5),
  gender: z.string().min(5),
  userType: z.string().min(5),
});

export function SignUpForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      name: "",
      address: "",
      gender: "",
      userType: "",
    },
  });

  function onSubmit(/* data: z.infer<typeof FormSchema>*/) {
    alert("submit");
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
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
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
