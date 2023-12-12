import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { PUBLIC_API_URL } from "@/utils/url";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const VolunteerForm = () => {
  const navigate = useNavigate();
  const formSchema = z.object({
    from: z.string().min(1, "Sender is required"),
    recipient: z.string().min(1, "Recipient is required"),
    subject: z.string().min(1, "Subject is required"),
    body: z.string().min(1, "Message is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      recipient: "",
      subject: "",
      body: "",
    },
  });

  const onClose = () => {
    form.reset();
    navigate("/");
  };

  const isLoading = form.formState.isSubmitting;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    setUsername(username || "");
    const password = localStorage.getItem("password");
    setPassword(password || "");
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { from, body, ...otherValues } = values;
      const updatedValues = {
        ...otherValues,
        body: `${body} \n This body was sent by: ${from}`,
      };
      const stringifiedObject = JSON.stringify(updatedValues);
      console.log(stringifiedObject);
      await axios.post(`${PUBLIC_API_URL}/donate/email`, stringifiedObject, {
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: username,
          password: password,
        },
      });
      toast.success("Email sent successfully!");
      onClose();
    } catch (error: unknown) {
      console.log(error);
      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as { response: { status: number } };
        switch (axiosError.response.status) {
          case 401:
            toast.error("Unauthorized: Please check your credentials");
            break;
          case 500:
            toast.error("Server error: Please try again later");
            break;
          case 400:
            toast.error("Bad request: Please check your input");
            break;
          case 503:
            toast.error(
              "Service Unavailable: The server is currently unavailable",
            );
            break;
          default:
            toast.error("An error occurred. Please try again");
        }
      } else {
        toast.error("An error occurred. Please try again");
      }
    }
  };
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-auto">
      <Button
        onClick={onClose}
        className=" absolute left-0 top-0 m-4 rounded bg-[#303030] px-4 py-2 text-[#FFFFFF] hover:bg-[#202020]"
      >
        Go Back
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-7">
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">From: *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="w-[300px] md:w-[500px] xl:w-[800px]"
                      placeholder="Enter The Sender Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">To: *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="w-[300px] md:w-[500px] xl:w-[800px]"
                      placeholder="Enter The Recipient Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Subject: *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="w-[300px] md:w-[500px] xl:w-[800px]"
                      placeholder="Enter The Subject"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Message: *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter The Message"
                      className="h-[100px] w-[300px] resize-none whitespace-pre-wrap md:h-[200px] md:w-[500px] xl:w-[800px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center ">
              <Button className="w-[100px] bg-[#01608b] hover:bg-[#01608b]/90 md:w-[200px] xl:w-[300px]">
                Send
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VolunteerForm;
