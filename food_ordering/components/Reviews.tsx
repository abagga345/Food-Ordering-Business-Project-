import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./testimonials.css";

// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

// Define the type for a review object
interface Review {
  content: string;
  rating: number;
  userId?: string;
  name: string;
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

  useEffect(() => {
    // fetch krlo results
  }, []);

  return (
    <div className="text-white w-[80%] mx-auto" id="testimonials">
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
                  <h2
                    className="text-[15px] font-medium text-richblack-500"
                    style={{ textTransform: "none" }}
                  >
                    by: {review?.name || "Anonymous"} {/* Adjust as needed */}
                  </h2>
                  <StarRating rating={review.rating} /> {/* Display rating */}
                </div>
                <p className="font-medium text-richblack-25">
                  {review.content}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
