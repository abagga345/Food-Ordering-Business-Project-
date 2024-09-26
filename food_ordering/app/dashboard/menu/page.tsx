"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface MenuItem {
  id: number;
  title: string;
  description: string;
  amount: number;
  imageUrl: string;
  visibility: boolean;
}

interface OutItem {
  id: number;
  visibility: boolean;
}

const MenuItems: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [outOfStockItems, setOutOfStockItems] = useState<Set<number>>(
    new Set()
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("/api/admin/menuItems");
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data.items);
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching menu items");
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const toggleOutOfStock = async (index: number) => {
    const toastId = toast.loading("Changing Status...");
    try {
      const item = menuItems[index];
      const response = await fetch(`/api/admin/changeVisibility`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,
          visibility: !item.visibility,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to change visibility");
      }

      setMenuItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[index] = {
          ...updatedItems[index],
          visibility: !prevItems[index].visibility,
        };
        return updatedItems;
      });
      toast.dismiss(toastId);
      toast.success("Status changed successfully!", { id: toastId });
    } catch (error) {
      console.error("Failed to update visibility:", error);
      toast.dismiss(toastId);
      toast.error("Failed to change status", { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-md overflow-hidden ${item.visibility == false ? "opacity-50" : ""
              }`}
          >
            {item.imageUrl != "www.whiterosepearora.com" &&
              item.imageUrl != "www.aroranerd.com" &&
              item.imageUrl != "www.triptiarora.com" ? (
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            ) : (
              ""
            )}

            <div className="p-5">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <span className="text-lg font-bold">
                  ₹{item.amount.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <button
                onClick={() => toggleOutOfStock(index)}
                className={`font-bold py-2 px-4 w-full rounded ${item.visibility == false
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
              >
                {item.visibility == false
                  ? "Mark In Stock"
                  : "Mark Out of Stock"}
              </button>
              {item.visibility == false && (
                <p className="text-red-500 font-bold">Out of Stock</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
