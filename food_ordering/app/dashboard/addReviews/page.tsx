"use client";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";

import { toast } from "react-hot-toast";

interface Review {
  content: string;
  rating: number;
  userId?: string;
  description: string; // Include user ID in the review structure
}

const StarRating = ({
  rating,
  onRate,
}: {
  rating: number;
  onRate: (rating: number) => void;
}) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          isIconOnly
          variant="light"
          className={`text-2xl ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => onRate(star)}
        >
          ★
        </Button>
      ))}
    </div>
  );
};

const Reviews = () => {
  const [review, setReview] = useState<Review>({
    content: "",
    rating: 0,
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value: number) => {
    setReview((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      review["description"] = review.content;
      const response = await fetch("/api/user/addReviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setReview({ content: "", rating: 0, description: "" }); // Reset the form
      } else {
        toast.error(result.message || "Failed to submit review");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-white w-[30%] mx-auto rounded-lg mt-10 p-6 shadow-lg">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-gray-800 mx-auto">Add a Review</h1>
        </CardHeader>
        <hr className="my-2" />
        <CardBody>
          <form onSubmit={handleSubmit}>
            <label className="block text-gray-700">Review</label>
            <Textarea
              name="content"
              value={review.content}
              onChange={handleInputChange}
              placeholder="Write your review here"
              rows={3}
              className="mt-2 mb-10 block rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
            <div>
              <label className="block text-gray-700">
                Rating
              </label>
              <StarRating rating={review.rating} onRate={handleRatingChange} />
              <div className="mb-6"></div>
            </div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Submit Review
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Reviews;