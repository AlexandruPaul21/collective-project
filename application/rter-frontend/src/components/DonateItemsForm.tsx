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
const DonateItemsForm = () => {
  enum ItemType {
    Food = "FOOD",
    Item= "ITEM",
  }
  const formSchema = z.object({
    date: z.date({
      required_error: "A date is required.",
    }),
    type: z.nativeEnum(ItemType).nullable(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        date: "",
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
  return <div>DonateItemsForm</div>;
};

export default DonateItemsForm;
