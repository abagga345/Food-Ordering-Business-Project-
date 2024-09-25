"use client";
import React, { useRef, useState } from "react";
import { PlusCircle, Image as ImageIcon, X } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      //   if (!imageUrl) {
      //     throw new Error("Please enter an image URL");
      //   }

      //   const response = await fetch("/api/admin/addItem", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       title,
      //       description,
      //       amount: parseFloat(amount),
      //     //   imageUrl,
      //     }),
      //   });

      //   if (!response.ok) {
      //     throw new Error("Failed to add menu item");
      //   }
      console.log({ title, description, amount });

      // Reset form after successful submission
      setTitle("");
      setDescription("");
      setAmount("");
      //   setImageUrl("");

      toast.success("Menu item added successfully!");
    } catch (error) {
      console.error("Error adding menu item:", error);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Menu Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <div className="mt-1 flex items-center">
            <label className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <ImageIcon className="mr-2 h-5 w-5 text-gray-400" />
              <span>{image ? "Change Image" : "Upload Image"}</span>
              <input
                type="file"
                id="image"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="sr-only"
                accept="image/*"
                required
              />
            </label>
          </div>
          {image && (
            <div className="mt-2">
              <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
                <span className="text-sm text-gray-500 truncate">
                  {image.name}
                </span>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="ml-2 text-sm text-red-600 hover:text-red-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-2">
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  width={100} // Specify the width for optimization
                  height={150} // Specify the height for optimization
                  className="mt-2 rounded-md"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
