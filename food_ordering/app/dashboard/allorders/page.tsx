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
  X,
  ShoppingCart,
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
  amount: number;
}

interface OrderItemDetail {
  quantity: number;
  item: {
    id: number;
    title: string;
    amount: number;
  };
}

const AllOrders = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItemDetail[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);

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

  const fetchOrderItems = async (orderId: number) => {
    setLoadingItems(true);
    try {
      const response = await fetch(`/api/admin/viewItems?id=${orderId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch order items");
      }
      const data = await response.json();
      console.log(data);
      setOrderItems(data.items);
    } catch (error: any) {
      toast.error(`Error fetching order items: ${error.message}`);
    } finally {
      setLoadingItems(false);
    }
  };

  const handleOrderClick = (order: OrderItem) => {
    setSelectedOrder(order);
    fetchOrderItems(order.id);
  };

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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOrderClick(order)}
              >
                <td className="px-4 py-2 text-center">{order.id}</td>
                <td className="px-4 py-2">{order.description}</td>
                <td className="px-4 py-2">{order.email}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">
                  {new Date(order.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          orderItems={orderItems}
          loadingItems={loadingItems}
        />
      )}
    </div>
  );
};

const OrderModal = ({
  order,
  onClose,
  orderItems,
  loadingItems,
}: {
  order: OrderItem;
  onClose: () => void;
  orderItems: OrderItemDetail[];
  loadingItems: boolean;
}) => {
  const calculateTotal = () => {
    // return orderItems.reduce((total, item) => {
    //   return total + item.quantity * item.item.amount;
    // }, 0);
    return order.amount;
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center bg-green-600 text-white px-6 py-3 rounded-t-lg">
          <h2 className="text-xl font-semibold">Order #{order.id}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4">
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
          <OrderDetail icon={AlertCircle} label="Status" value={order.status} />
          <OrderDetail
            icon={Home}
            label="House/Street"
            value={order.houseStreet}
          />
          <OrderDetail icon={MapPin} label="Landmark" value={order.landmark} />
          <OrderDetail icon={MapPin} label="City" value={order.city} />
          <OrderDetail icon={MapPin} label="Pincode" value={order.pincode} />
          <OrderDetail
            icon={Clock}
            label="Timestamp"
            value={new Date(order.timestamp).toLocaleString()}
          />

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-green-600" />
              Order Items
            </h3>
            {loadingItems ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-green-600" />
              </div>
            ) : (
              <>
                <ul className="space-y-2">
                  {orderItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>{item.item.title}</span>
                      <span>
                        {item.quantity} x ₹{item.item.amount}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Amount:</span>
                    <span>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
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
    <Icon className="w-5 h-5 mr-2 text-green-600 flex-shrink-0" />
    <span className="font-medium">{label}:</span>
    <span className="ml-2 break-all">{value}</span>
  </div>
);

export default AllOrders;
