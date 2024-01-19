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
import { useNavigate, useParams } from "react-router-dom";
import { PUBLIC_API_URL } from "@/utils/url";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { User } from "@/utils/types";
import { UserService } from "@/apis/profile/UserService";
const VolunteerForm = () => {
  const navigate = useNavigate();

  const { ngoEmail, ngoId } = useParams();
  const [currentUser, setCurrentUser] = useState<User>();
  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    await UserService.getCurrentUser().then((user) => {
      setCurrentUser(user);
      console.log(user);
    });
  };

  const formSchema = z.object({
    from: z.string().min(1, "Sender is required"),
    recipient: z.string().min(1, "Recipient is required"),
    body: z.string().min(1, "Message is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: "",
      recipient: "",
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

  useEffect(() => {
    if (ngoEmail) {
      form.setValue("recipient", ngoEmail);
    }
    if (currentUser) {
      form.setValue("from", currentUser.email);
    }
  }, [ngoEmail, currentUser]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { body } = values;
      const updatedValues = {
        body:body,
        idUser: currentUser?.id,
        idNgo: ngoId,
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
    <div className="flex h-full w-full items-center justify-center overflow-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-7 rounded-xl border-2 bg-[#FFFFFF] p-5">
            <div className="flex items-center justify-center">
              <h1 className="py-2 text-xl font-bold md:py-4 md:text-2xl">
                Contact the NGO
              </h1>
            </div>
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">From: *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!!currentUser}
                      defaultValue={currentUser ? currentUser.email : ""}
                      placeholder="Enter Your Email"
                      className="w-[300px] md:w-[500px] xl:w-[800px]"
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
                      disabled={true}
                      defaultValue={ngoEmail}
                      className="w-[300px] md:w-[500px] xl:w-[800px]"
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
              <Button className="w-[100px] bg-[#1565C0] hover:bg-[#1565C0]/90 md:w-[200px] xl:w-[300px]" disabled={isLoading}>
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
