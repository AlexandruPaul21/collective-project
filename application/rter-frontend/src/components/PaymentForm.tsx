import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { donatePayment } from '@/apis/paymentApi';
import { PaymentRequest, PaymentResponse } from '@/utils/types';

const PaymentForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [clientSecret, setClientSecret] = useState("");

  const formSchema = z.object({
    amount: z.string().min(1, 'Amount must be greater than 0'),
    currency: z.string().min(1, 'Currency is required'),
    description: z.string().min(1, 'Description is required'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      currency: '',
      description: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onClose = () => {
    form.reset();
    navigate('/');
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  useEffect(() => {
    const username = localStorage.getItem('username');
    setUsername(username || '');
    const password = localStorage.getItem('password');
    setPassword(password || '');
  }, []);

  const donate = async (paymentRequest: PaymentRequest) => {
    try {
      const paymentResponse: PaymentResponse = await donatePayment(username, password, paymentRequest);
      toast.success('Donation made successfully!');
      console.log(paymentResponse);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again');
    }
  };

  const onSubmit = (values: any) => {
    values.amount = parseFloat(values.amount);
    const paymentRequest: PaymentRequest = {
      token: "",
      amount: values.amount,
      currency: values.currency,
      description: values.description,
      username: username,
      ngoName: "Asociatia ",
    }
    donate(paymentRequest);
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-7">
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
                <FormItem className='w-[300px] md:w-[500px] xl:w-[800px] h-10 mb-10'>
                  <FormLabel className="text-md">Currency: *</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={isLoading}
                      className="w-[200px] md:w-[500px] xl:w-[800px] h-10 border border-gray-300 rounded-md md:px-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-muted-foreground"
                    >
                      <option value="">Select currency</option>
                      <option value="RON">RON</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
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
                      className="h-[100px] w-[300px] resize-none whitespace-pre-wrap md:h-[200px] md:w-[500px] xl:w-[800px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center">
              <Button className="w-[100px] bg-[#01608b] hover:bg-[#01608b]/90 md:w-[200px] xl:w-[300px]">
                Donate
              </Button>
            </div>
          </div>
        </form>
      </Form>
      
    </div>
  );
};

export default PaymentForm;
