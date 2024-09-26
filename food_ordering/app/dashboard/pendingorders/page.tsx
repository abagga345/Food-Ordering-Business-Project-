"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Clock, MapPin, Package, User } from "lucide-react";

interface OrderItem {
  item: {
    title: string;
    amount: number;
  };
  quantity: number;
}

interface Order {
  id: string;
  email: string;
  status: string;
  timestamp: string;
  houseStreet: string;
  landmark: string;
  city: string;
  pincode: string;
  items: OrderItem[];
  description?: string;
}

const PendingOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const statusOptions = [
    "Unconfirmed",
    "Rejected",
    "Dispatched",
    "Processing",
    "Delivered",
  ];

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const toastId = toast.loading("Loading orders...");
      try {
        const response = await fetch("/api/admin/pendingOrders");
        toast.dismiss(toastId);
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
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Pending Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Order #{order.id}
                </h2>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Unconfirmed"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : order.status === "Dispatched"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "Processing"
                      ? "bg-gray-200 text-gray-800"
                      : order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : ""
                  }`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 mb-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="text-gray-600">{order.email}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="text-gray-600">
                    {new Date(order.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="text-gray-600">{`${order.houseStreet}, ${order.landmark}, ${order.city}, ${order.pincode}`}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Order Items
                </h3>
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <Package className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-gray-800">{item.item.title}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-600">
                          Qty: {item.quantity}
                        </span>
                        <span className="ml-4 text-gray-800 font-medium">
                          ₹{item.item.amount * item.quantity}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {order.description && (
                <div className="mt-4 bg-gray-50 p-3 rounded">
                  <p className="text-gray-700">
                    <span className="font-medium">Note:</span>{" "}
                    {order.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingOrders;
