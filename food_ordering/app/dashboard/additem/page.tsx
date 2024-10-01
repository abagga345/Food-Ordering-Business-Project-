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
  const [imageUrl, setImageUrl] = useState("");
  const [buttonstate, setbuttonstate] = useState(true);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setImage(file);
      } else {
        toast.error("Please upload a valid image file.");
        e.target.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const uploadImage = async (image: File) => {
    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch("/api/imageUpload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      const url = data.url;
      console.log(url);
      setImageUrl(url);
      return url;
    } catch (error) {
      console.error("Error uplaoding image", error);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setbuttonstate(false);
    setLoading(true);
    const toastId = toast.loading("Adding Item...");
    try {
      if (!image) {
        throw new Error("Please enter an image URL");
      }
      const imageUrl = await uploadImage(image);

      const response = await fetch("/api/admin/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          amount: parseFloat(amount),
          imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add menu item");
      }
      console.log({ title, description, amount });
      setTitle("");
      setDescription("");
      setAmount("");
      setImageUrl("");
      handleRemoveImage();
      toast.dismiss(toastId);
      toast.success("Menu item added successfully!");
    } catch (error) {
      console.error("Error adding menu item:", error);
      toast.dismiss(toastId);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
    setbuttonstate(true);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Add Menu Item
      </h2>
      <hr className="mb-6" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="amount" className="block text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-gray-700">
            Image
          </label>
          <div className="mt-1 flex items-center">
            <label className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
                  width={100}
                  height={150}
                  className="mt-2 rounded-md"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={!buttonstate}
            className={`w-full flex text-white justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm 
              ${
                buttonstate
                  ? "bg-green-600 hover:bg-green-700 focus:ring-indigo-500"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            <p>Add Item</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
