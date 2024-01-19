import axios, { AxiosResponse } from "axios";
import { donationsUrl } from "./urlConstants";
import { PaymentRequest, PaymentResponse } from "@/utils/types";

export const donatePayment: (username:string, password:string, paymentRequest: PaymentRequest) => Promise<PaymentResponse> = (username,password,paymentRequest) => {
    return axios.post(`${donationsUrl}/payment`, paymentRequest,{
      auth:{
        username:username,
        password:password
      }
    })
      .then((response: AxiosResponse<PaymentResponse>) => response.data)
      
      .catch((error) => {
        throw new Error(error.response.data.message);
      });
  };