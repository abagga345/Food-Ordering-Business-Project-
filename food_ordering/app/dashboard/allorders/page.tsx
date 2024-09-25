"use client";
import React, { useEffect, useState } from "react";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/admin/allOrders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">All Orders</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="p-4 bg-white shadow rounded border border-gray-200"
          >
            <h2 className="text-xl font-bold">Order #{order.id}</h2>
            <p className="text-gray-600">Customer: {order.customerName}</p>
            <p className="text-gray-600">Total: ${order.totalAmount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllOrders;