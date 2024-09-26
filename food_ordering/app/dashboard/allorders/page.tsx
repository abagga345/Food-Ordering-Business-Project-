"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Loader2,
  Package,
  Mail,
  CreditCard,
  AlertCircle,
  Home,
  MapPin,
  Clock,
} from "lucide-react";

interface OrderItem {
  id: number;
  description: string;
  email: string;
  payment_id: string;
  status: string;
  houseStreet: string;
  landmark: string;
  timestamp: string;
  city: string;
  pincode: string;
}

const AllOrders = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const toastId = toast.loading("Loading orders...");
      try {
        const response = await fetch("/api/admin/allOrders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data.orders);
        toast.success("Orders loaded successfully!", { id: toastId });
      } catch (error: any) {
        setError(error.message);
        toast.error(`Error: ${error.message}`, { id: toastId });
      } finally {
        setLoading(false);
        toast.dismiss(toastId);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
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
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        All Orders
      </h1>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="bg-green-600 text-white px-4 py-2">
              <h2 className="text-xl font-semibold text-center">Order #{order.id}</h2>
            </div>
            <div className="p-4 space-y-3">
              <OrderDetail
                icon={Package}
                label="Description"
                value={order.description}
              />
              <OrderDetail icon={Mail} label="Email" value={order.email} />
              <OrderDetail
                icon={CreditCard}
                label="Payment ID"
                value={order.payment_id}
              />
              <OrderDetail
                icon={AlertCircle}
                label="Status"
                value={order.status}
              />
              <OrderDetail
                icon={Home}
                label="House/Street"
                value={order.houseStreet}
              />
              <OrderDetail
                icon={MapPin}
                label="Landmark"
                value={order.landmark}
              />
              <OrderDetail icon={MapPin} label="City" value={order.city} />
              <OrderDetail
                icon={MapPin}
                label="Pincode"
                value={order.pincode}
              />
              <OrderDetail
                icon={Clock}
                label="Timestamp"
                value={new Date(order.timestamp).toLocaleString()}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrderDetail = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex items-center text-gray-700">
    <Icon className="w-5 h-5 mr-2 text-green-600" />
    <span className="font-medium">{label}:</span>
    <span className="ml-2">{value}</span>
  </div>
);

export default AllOrders;
