"use client";
import { Banknote, Loader2 } from "lucide-react";
import { Store } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface fields {
  houseStreet: string;
  landmark: string;
  state: string;
  postalCode: string;
  paymentMethod: string;
  description: string;
}

interface Item{
    id:number;
    quantity:number;
    amount:number;
}

interface ItemBody{
    items:Item[]
}

//items =========> JSON.stringify({ items: [ {id:,quantity:,price: }  ] } )
export default function Checkout() {
  const [amount,setAmount]=useState(0);
  const [tax1,setTax1]=useState(0);
  const [tax2,setTax2]=useState(0);
  const [items,setItems]=useState<Item[]>([]);
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(true);
  const { register, handleSubmit,watch } = useForm<fields>({
    defaultValues: {
      state: "Delhi", // Set default value as "Delhi"
    }
    } );
  const method=watch('paymentMethod');
  
  
  useEffect(()=>{
    setLoading(true);
    const itemstemp=localStorage.getItem("items");
    if (!itemstemp){
        setError("No Items Added to Cart");
    }
    else{
        const itemsbody:ItemBody=JSON.parse(itemstemp);
        const itemsarr=itemsbody.items;
        if (itemsarr===undefined || process.env.NEXT_PUBLIC_TAXRATE_1===undefined || process.env.NEXT_PUBLIC_TAXRATE_2===undefined){
            setError("Internal Error due to taxation issues");
            return;
        }
        let temp=0;
        for(let i=0;i<itemsarr.length;i++){
            temp+=(itemsarr[i]["amount"]*itemsarr[i]["quantity"]);
        }
        setTax1((parseInt(process.env.NEXT_PUBLIC_TAXRATE_1)*temp)/100);
        setTax2((parseInt(process.env.NEXT_PUBLIC_TAXRATE_2)*temp)/100);
        setItems(itemsarr);
        setAmount(temp);
    }
    setLoading(false);
   },[])

   
  
  

  
  async function submithandler(data: fields) {
    fetch("http://localhost:3000/api/user/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        houseStreet: data.houseStreet,
        state: data.state,
        description: data.description,
        landmark: data.landmark,
        pincode: data.postalCode,
        paymentMethod: data.paymentMethod,
        amount:amount+cod,
        items:items
      }),
    }).then(async (data)=>{
        let body=await data.json();
        setMessage(`Order Placed successfully with id ${body.id}`);
    }).catch((err)=>{
        setError("Unable to place error");
    })
    }

    if (loading) {
        return (
          <div className="flex items-center justify-center h-screen">
            <Loader2 className="w-10 h-10 animate-spin text-green-600" />
          </div>
        );
    }
    else if (error!="") {
        //MAKE ERROR UI
    
    }
    else if (message!=""){
        // MAKE CONFIRMATION MESSAGE UI
    }


  return (
    <form onSubmit={handleSubmit(submithandler)}>
      <div className="mb-32 mt-7">
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 gap-8">
          <div className="px-4 pt-4">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div className="mt-8 space-y-3 rounded-lg border bg-green-50 px-2 py-4 sm:px-6 border-green-100">
              <div className="flex flex-col rounded-lg bg-green-50 sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">
                    Nike Air Max Pro 8888 - Super Light
                  </span>
                  <span className="float-right text-gray-400">
                    42EU - 8.5US
                  </span>
                  <p className="text-lg font-bold">$138.99</p>
                </div>
              </div>

              <div className="flex flex-col rounded-lg bg-green-50 sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">
                    Nike Air Max Pro 8888 - Super Light
                  </span>
                  <span className="float-right text-gray-400">
                    42EU - 8.5US
                  </span>
                  <p className="mt-auto text-lg font-bold">$238.99</p>
                </div>
              </div>
            </div>

            <p className="mt-8 text-lg font-medium">Payment Methods</p>
            <div className="mt-5 grid gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_1"
                  type="radio"
                  value="UPI"
                  {...register("paymentMethod")}
                  
                  defaultChecked
                />
                <span className="peer-checked:border-green-600 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border peer-checked:border-green-500 peer-checked:bg-green-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_1"
                >
                  <img
                    className="w-14 object-contain"
                    src="https://cdn.iconscout.com/icon/free/png-256/free-upi-logo-icon-download-in-svg-png-gif-file-formats--unified-payments-interface-payment-money-transfer-logos-icons-1747946.png"
                    alt=""
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">UPI</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Pay by any UPI app on below QR Code
                    </p>
                  </div>
                </label>
              </div>

              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_2"
                  type="radio"
                  value="COD"
                  {...register("paymentMethod")}
                  
                />
                <span className="peer-checked:border-green-600 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border peer-checked:border-green-500 peer-checked:bg-green-50 flex items-center cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_2"
                >
                  <Banknote className="me-3 ms-4 text-green-600" />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Cash On Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">
                      +₹40 COD charge
                    </p>
                  </div>
                </label>
              </div>

              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_3"
                  type="radio"
                  value="StorePayment"
                  {...register("paymentMethod")}
                  
                />
                <span className="peer-checked:border-green-600 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border peer-checked:border-green-500 peer-checked:bg-green-50 flex items-center cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_3"
                >
                  <Store className="me-3 ms-4 text-green-600" />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Pickup</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Pay and pickup at store
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-10 bg-green-50 px-6 pt-8 lg:mt-0 rounded-lg h-fit border border-green-100">
            <p className="text-xl font-medium">Shipping Details</p>
            <p className="text-gray-400">
              Complete your order by providing your shipping details.
            </p>
            <div>
              <label
                htmlFor="billing-address"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Billing Address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input
                    type="text"
                    id="billing-address"
                    {...register("houseStreet", { required: true })}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-green-500 focus:ring-green-500"
                    placeholder="Street Address"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <img
                      className="h-4 w-4 object-contain"
                      src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                      alt=""
                    />
                  </div>
                </div>
                <select
                  {...register("state", { required: true })}
                  
                  className="w-full rounded-md border bg-white border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-green-500 focus:ring-green-500"
                >
                  <option>Delhi</option>
                  <option>Andhra Pradesh</option>
                  <option>Arunachal Pradesh</option>
                  <option>Assam</option>
                  <option>Bihar</option>
                  <option>Chhattisgarh</option>
                  <option>Gujarat</option>
                  <option>Haryana</option>
                  <option>Himachal Pradesh</option>
                  <option>Jammu and Kashmir</option>
                  <option>Goa</option>
                  <option>Jharkhand</option>
                  <option>Karnataka</option>
                  <option>Kerala</option>
                  <option>Madhya Pradesh</option>
                  <option>Maharashtra</option>
                  <option>Manipur</option>
                  <option>Meghalaya</option>
                  <option>Mizoram</option>
                  <option>Nagaland</option>
                  <option>Odisha</option>
                  <option>Punjab</option>
                  <option>Rajasthan</option>
                  <option>Sikkim</option>
                  <option>Tamil Nadu</option>
                  <option>Telangana</option>
                  <option>Tripura</option>
                  <option>Uttarakhand</option>
                  <option>Uttar Pradesh</option>
                  <option>West Bengal</option>
                  <option>Andaman and Nicobar Islands</option>
                  <option>Chandigarh</option>
                  <option>Dadra and Nagar Haveli</option>
                  <option>Daman and Diu</option>
                  <option>Lakshadweep</option>
                  <option>Puducherry</option>
                </select>
                <input
                  type="text"
                  {...register("postalCode", { required: true })}
                  className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-green-500 focus:ring-green-500"
                  placeholder="Post Code"
                />
              </div>
              <label
                htmlFor="card-holder"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Landmark
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="landmark"
                  {...register("landmark", { required: true })}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-green-500 focus:ring-green-500"
                  placeholder="Enter landmark"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor="card-holder"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Description
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="description"
                  {...register("description")}
                  defaultValue={""}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-green-500 focus:ring-green-500"
                  placeholder="Enter Description"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-4 w-4 text-gray-400"
                  >
                    <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                    <path d="M2 6h4" />
                    <path d="M2 10h4" />
                    <path d="M2 14h4" />
                    <path d="M2 18h4" />
                    <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                  </svg>
                </div>
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">$399.00</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">{parseInt(process.env.NEXT_PUBLIC_SHIPPING_COST as string)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">TAX</p>
                  <p className="font-semibold text-gray-900">{}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-lg font-medium text-gray-900">Total</p>
                <p className="text-xl font-semibold text-gray-900">{amount+(method==="COD"?40:0)+parseInt(process.env.NEXT_PUBLIC_SHIPPING_COST as string)}</p>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 mb-8 w-full rounded-md bg-green-600 hover:bg-green-700 px-6 py-3 font-medium text-white"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
