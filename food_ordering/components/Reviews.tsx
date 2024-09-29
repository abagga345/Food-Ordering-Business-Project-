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
import Loader from "./Loader";

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
    <div
      className="text-white w-[80%] mx-auto bg-gray-50 px-10 pt-10 pb-5 my-20 rounded-xl border border-gray-100"
      id="testimonials"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          {avgRating && (
            <div className="text-center">
              <h3 className="text-xl font-semibold text-black">
                Average Rating {avgRating.toFixed(1)} ★
              </h3>
            </div>
          )}
          <div className="max-w-maxContentTab lg:max-w-maxContent">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              freeMode={true}
              autoplay={{
                delay: 5500,
                disableOnInteraction: false,
              }}
              modules={[FreeMode, Pagination, Autoplay]}
              className="w-full"
            >
              {reviews.map((review, i) => (
                <SwiperSlide key={i}>
                  <div className="p-5 bg-white text-black rounded-lg shadow-lg border border-gray-100 mx-4 my-10">
                    <div className="flex justify-between gap-2 mb-4">
                      <div className="flex items-center gap-4">
                        <img
                          alt=""
                          className="rounded-full w-10"
                          src={` https://api.dicebear.com/7.x/initials/svg?seed=${review?.firstName} ${review?.lastName}`}
                        />
                        <h2
                          className="text-md font-semibold text-richblack-500"
                          style={{ textTransform: "none" }}
                        >
                          {review?.firstName + " " + review?.lastName ||
                            "Anonymous"}
                        </h2>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-lg">{review.description}</p>
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
