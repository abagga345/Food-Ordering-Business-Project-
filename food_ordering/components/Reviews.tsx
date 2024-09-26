"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./reviews.css";

// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Image } from "@nextui-org/react";

// Define the type for a review object
interface Review {
  content: string;
  rating: number;
  userId?: string;
  name: string;
  description: string;
  firstName?: string;
  lastName?: string;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-4xl ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/viewReviews"); // Adjust the API route if necessary
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data.reviews);
        setAvgRating(data.avgReviews._avg.rating);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="text-white w-[80%] mx-auto" id="testimonials">
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <>
          {avgRating && (
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">
                Average Rating: {avgRating.toFixed(1)} ★
              </h3>
            </div>
          )}
          <div className="my-[50px] max-w-maxContentTab lg:max-w-maxContent">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              freeMode={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              modules={[FreeMode, Pagination, Autoplay]}
              className="w-full"
            >
              {reviews.map((review, i) => (
                <SwiperSlide key={i}>
                  <div className="flex flex-col gap-3 bg-blue-500 p-3 text-[17px] text-richblack-25 rounded-lg items-center bg-gradient-to-br">
                    <div className="flex flex-col items-center gap-2">
                      <img
                        className="rounded-full"
                        src={` https://api.dicebear.com/7.x/initials/svg?seed=${review?.firstName} ${review?.lastName}`}
                      />
                      <h2
                        className="text-[15px] font-medium text-richblack-500"
                        style={{ textTransform: "none" }}
                      >
                        by:{" "}
                        {review?.firstName + " " + review?.lastName ||
                          "Anonymous"}
                      </h2>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="font-medium text-richblack-25">
                      {review.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
}
