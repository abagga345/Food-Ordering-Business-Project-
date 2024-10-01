"use client";
import axios from "axios";
import { Banknote, Loader2 } from "lucide-react";
import { Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface fields {
  houseStreet: string;
  landmark: string;
  state: string;
  postalCode: string;
  paymentMethod: string;
  description: string;
}

interface Item {
  id: number;
  quantity: number;
  price: number;
  title: string;
  imageUrl: string;
  visibility: boolean;
}

interface OutItem {
  id: number;
  title: string;
}

const OutOfStockModal = ({
  isOpen,
  onClose,
  items,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: OutItem[];
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Out of Stock Items</h2>
        <div className="bg-green-100 border-l-4 border-green-200 p-4 mb-4">
          <p className="font-bold">Some items are out of stock</p>
          <p>
            The following items are no longer available and have been removed
            from your cart:
          </p>
          <ul className="list-disc list-inside mt-2">
            {items.map((item: OutItem, index: number) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function Checkout() {
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [outOfStockModal, setOutOfStockModal] = useState(false);
  const [outOfStockItems, setOutOfStockItems] = useState<OutItem[]>([]);

  const { register, handleSubmit, watch } = useForm<fields>({
    defaultValues: {
      state: "Delhi",
    },
  });
  const method = watch("paymentMethod");
  const shipping = parseInt(process.env.NEXT_PUBLIC_SHIPPING_COST as string);
  const codcharges = parseInt(process.env.NEXT_PUBLIC_COD as string);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const itemstemp = localStorage.getItem("cart");
    if (!itemstemp) {
      setError("No Items Added to Cart");
      setLoading(false);
      return;
    }

    const itemsbody = JSON.parse(itemstemp);
    let n = Object.keys(itemsbody).length;
    const itemsarr: Item[] = [];
    const outOfStock: OutItem[] = [];
    let temp = 0;

    const fetchItems = Object.keys(itemsbody).map(async (key) => {
      try {
        const temp1: Item = {
          id: 0,
          quantity: 0,
          title: "",
          imageUrl: "",
          price: 0,
          visibility: true,
        };
        const id = parseInt(key);
        const quantity = itemsbody[key];
        const body = await axios.get(
          `http://localhost:3000/api/viewMenuItem?id=${id}`
        );

        temp1.id = id;
        temp1.price = body.data.amount;
        temp1.imageUrl = body.data.imageUrl;
        temp1.quantity = quantity;
        temp1.title = body.data.title;
        temp1.visibility = body.data.visibility;
        if (temp1.visibility) {
          itemsarr.push(temp1);
          temp += temp1.price * temp1.quantity;
        } else {
          outOfStock.push({ id: temp1.id, title: temp1.title });
          delete itemsbody[key];
          localStorage.setItem("cart", JSON.stringify(itemsbody));
        }
      } catch (err) {
        delete itemsbody[key];
        localStorage.setItem("cart", JSON.stringify(itemsbody));
      }
    });
    Promise.all(fetchItems).then(() => {
      if (itemsarr.length === 0) {
        setError("Selected items are no longer available");
        setLoading(false);
        return;
      }
      if (itemsarr.length != n) {
        //DISPLAY A MODAL THAT SOME ITEMS ARE NOT AVAILABLE
        setOutOfStockItems(outOfStock);
        setOutOfStockModal(true);
      }
      setItems(itemsarr);
      setSubtotal(temp);
      const total = temp + shipping + (method === "COD" ? codcharges : 0);
      setTax(
        total * (parseInt(process.env.NEXT_PUBLIC_TAX_RATE as string) / 100)
      );
      setLoading(false);
    });
  }, []);

  //THIS LOGIC SHOULD ONLY RUN ON UPDATES ON METHODS
  //INITIAL MOUNTING HAS ALREADY BEEN RESOLVED IN OTHER useEffect
  useEffect(() => {
    if (!loading) {
      setTax(
        (parseInt(process.env.NEXT_PUBLIC_TAX_RATE as string) *
          (subtotal + shipping + (method == "COD" ? codcharges : 0))) /
          100
      );
    }
  }, [method]);

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
        amount: Math.round(
          subtotal +
            (method === "COD" ? codcharges : 0) +
            parseInt(process.env.NEXT_PUBLIC_SHIPPING_COST as string) +
            tax
        ),
        items: items.map((item) => ({
          itemId: item.id,
          quantity: item.quantity,
        })),
      }),
    })
      .then(async (data) => {
        let body = await data.json();
        if (body.message === "Order Created successfully") {
          const id = body.id;
          toast.success(`Order placed successfully! Order ID: ${id}`, {
            duration: 5000,
          });
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        } else {
          setError("Unable to place order");
        }
        //ORDER PLACED SUCCESSFULLY TOAST
      })
      .catch((err) => {
        setError("Unable to place order");
      });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
      </div>
    );
  } else if (error != "") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(submithandler)}>
        <div className="mb-32 mt-7">
          <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 gap-8">
            <div className="px-4 pt-4">
              <p className="text-xl font-medium">Order Summary</p>
              <p className="text-gray-400">
                Check your items. And select a suitable shipping method.
              </p>
              <div className="mt-8 space-y-3 rounded-lg border bg-green-50 px-2 py-4 sm:px-6 border-green-100">
                {items.map((item: Item) => {
                  return (
                    <div
                      className="flex flex-col rounded-lg bg-green-50 sm:flex-row"
                      key={item.id}
                    >
                      <img
                        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                        src={item.imageUrl}
                        alt=""
                      />
                      <div className="flex w-full flex-col px-4 py-4">
                        <span className="font-semibold">{item.title}</span>
                        <span className="float-right text-gray-400">
                          Quantity added {item.quantity}
                        </span>
                        <span className="float-right text-gray-400">
                          Unit price ₹ {item.price}
                        </span>
                        <p className="text-lg font-bold">
                          ₹ {item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  );
                })}
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
                      <span className="mt-2 font-semibold">
                        Cash On Delivery
                      </span>
                      <p className="text-slate-500 text-sm leading-6">
                        +₹ 40 COD charge
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
                    <p className="text-sm font-medium text-gray-900">
                      Subtotal
                    </p>
                    <p className="font-semibold text-gray-900">₹ {subtotal}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Shipping
                    </p>
                    <p className="font-semibold text-gray-900">
                      ₹{" "}
                      {parseInt(
                        process.env.NEXT_PUBLIC_SHIPPING_COST as string
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      COD Charges
                    </p>
                    <p className="font-semibold text-gray-900">
                      {method === "COD" ? codcharges : 0}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">TAX</p>
                    <p className="font-semibold text-gray-900">₹ {tax}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-900">Total</p>
                  <p className="text-xl font-semibold text-gray-900">
                    ₹{" "}
                    {Math.round(
                      subtotal +
                        (method === "COD" ? codcharges : 0) +
                        parseInt(
                          process.env.NEXT_PUBLIC_SHIPPING_COST as string
                        ) +
                        tax
                    )}
                  </p>
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
      <OutOfStockModal
        isOpen={outOfStockModal}
        onClose={() => setOutOfStockModal(false)}
        items={outOfStockItems}
      />
    </>
  );
}
