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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { PUBLIC_API_URL } from "@/utils/url";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { UserService } from "@/apis/profile/UserService";
import { User } from "@/utils/types";
const DonateItemsForm = () => {
  enum ItemType {
    Food = "FOOD",
    Item = "ITEM",
    Volunteer = "VOLUNTEER",
  }
  const navigate = useNavigate();
  const { ngoId } = useParams();
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
    date: z.date({
      required_error: "A date is required.",
    }),
    type: z.nativeEnum(ItemType).nullable(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      type: null,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const username = localStorage.getItem("username");
    setUsername(username || "");
    const password = localStorage.getItem("password");
    setPassword(password || "");
  }, []);

  const onClose = () => {
    form.reset();
    navigate("/");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // TODO: Modify this to send the email to the NGO
      if (currentUser) {
        const donationObject = {
          type: values.type,
          createdAt: format(values.date, "yyyy-MM-dd'T'HH:mm:ss"),
          iduser: currentUser.id,
          idngo: Number(ngoId),
        };

        const stringifiedObject = JSON.stringify(donationObject);
        console.log(stringifiedObject);
        await axios.post(
          `${PUBLIC_API_URL}/donations/non-payment`,
          stringifiedObject,
          {
            headers: {
              "Content-Type": "application/json",
            },
            auth: {
              username: username,
              password: password,
            },
          },
        );
        toast.success("Email sent successfully!");
      }
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
    <div className="flex h-full w-full items-center justify-center overflow-auto ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="m-4 flex max-w-[450px] flex-col gap-7 rounded-xl border-2 bg-[#FFFFFF] px-[30px] py-5 md:w-[500px] md:px-[100px] ">
            <div className="flex items-center justify-center">
              <h1 className="py-2 text-xl font-bold md:py-4 md:text-2xl">
                Donate Others
              </h1>
            </div>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-md ml-1 flex items-center">
                    Select Drop-off Date *
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                          disabled={isLoading}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick A Date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                      side="top"
                    >
                      <Calendar
                        className="max-w-[400px] overflow-hidden"
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md ml-1 flex items-center">
                    Select Type *
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={(value) =>
                      field.onChange({ target: { value } })
                    }
                  >
                    <FormControl className="w-full">
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Select A Type Of Donation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(ItemType).map((ItemType) => (
                        <SelectItem
                          key={ItemType}
                          value={ItemType}
                          className="capitalize"
                        >
                          {ItemType.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center pt-[20px]">
              <Button className="w-[100px] bg-[#1565C0] hover:bg-[#1565C0]/90 md:w-[150px] xl:w-[200px]">
                Send
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DonateItemsForm;
