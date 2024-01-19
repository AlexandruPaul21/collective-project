import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { toast } from "sonner";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { donatePayment } from "@/apis/paymentApi";
import { PaymentRequest, PaymentResponse } from "@/utils/types";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getNgoById } from "@/apis/ngoApi";
import { NGOProps } from "@/utils/types/ngoProps";

const stripePromise = loadStripe(
  "pk_test_51OZGIJBvOG8Oe6QO2aZKsfA7hpP0UAaZWsXFiSXltRkA3rtFon1YoGzAGYcry8MSJPqqLGWpEJVNUpNS0tGUGZey00O6EsT87h",
);

const PaymentForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { ngoId } = useParams();
  const [password, setPassword] = useState("");
  const [ngo, setNgo] = useState<NGOProps | null>(null);

  const formSchema = z.object({
    amount: z.string().min(1, "Amount must be greater than 0"),
    currency: z.string().min(1, "Currency is required"),
    description: z.string().min(1, "Description is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      currency: "",
      description: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onClose = () => {
    form.reset();
    navigate("/");
  };

  useEffect(() => {
    if (!ngoId || !username || !password) return;
    getNgoById(username, password, Number(ngoId)).then((data) => {
      setNgo(data);
    });
  }, [username, password, ngoId]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setUsername(username || "");
    const password = localStorage.getItem("password");
    setPassword(password || "");
  }, []);

  const donate = async (paymentRequest: PaymentRequest) => {
    try {
      const paymentResponse: PaymentResponse = await donatePayment(
        username,
        password,
        paymentRequest,
      );
      toast.success("Donation made successfully!");

      console.log(paymentResponse.message);
      console.log(paymentResponse.status);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again");
    }
  };

  const handleToken = (token: string) => {
    const paymentRequest: PaymentRequest = {
      token: token,
      amount: Number(form.getValues("amount")), // Assuming you have these fields in your form
      currency: form.getValues("currency"),
      description: form.getValues("description"),
      username: username,
      ngoName: ngo!.name,
    };

    donate(paymentRequest);
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-auto">
      <Form {...form}>
        <form>
          <div className="flex flex-col gap-7 rounded-xl border-2 bg-[#FFFFFF] px-[30px] py-5">
            <h1 className="py-2 text-xl  text-center font-bold md:py-4 md:text-2xl">
              Donate to the NGO
            </h1>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Amount: *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="string"
                      className="w-[300px] md:w-[500px] xl:w-[800px]"
                      placeholder="Enter the amount"
                      {...field}
                      onChange={(e) => {
                        let cleaned = e.target.value.replace(/\D+/g, "");
                        if (cleaned.length > 2) {
                          cleaned =
                            cleaned.slice(0, -2) + "." + cleaned.slice(-2);
                        }
                        field.onChange(cleaned);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="flex w-[300px] flex-col md:w-[500px] xl:w-[800px]">
                  <FormLabel className="text-md">Currency: *</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={isLoading}
                      className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 h-10 w-[300px] rounded-md border text-sm text-muted-foreground focus:outline-none focus:ring-1 md:w-[500px] md:px-2 xl:w-[800px]"
                    >
                      <option value="">Select currency</option>
                      <option value="ron">RON</option>
                      <option value="usd">USD</option>
                      <option value="eur">EUR</option>
                      <option value="gbp">GBP</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Description: *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the description"
                      className="w-[300px] resize-none whitespace-pre-wrap md:h-[60px] md:w-[500px] xl:h-[140px] xl:w-[800px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Elements stripe={stripePromise}>
              <CheckoutForm onTokenReceived={handleToken} />
            </Elements>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PaymentForm;
