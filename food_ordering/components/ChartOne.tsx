"use client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { MdSell } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { RiStockFill } from "react-icons/ri";

const ChartOne = () => {
  const [totalSales, setTotalSales] = useState(null);
  const [avgReview, setAvgReview] = useState(null);
  const [visibleItemsCount, setvisibleItemsCount] = useState(null);
  const [hiddenItemsCount, sethiddenItemsCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/chartData");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTotalSales(data.totalSales);
        setAvgReview(data.avgReview.toFixed(2));
        setvisibleItemsCount(data.visibleItemsCount);
        sethiddenItemsCount(data.hiddenItemsCount);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Loader2 className="w-10 h-10 animate-spin text-green-600" />
    );
  }
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex md:flex-row flex-col">
      <div className="flex flex-col items-center md:w-[50%] w-[100%]">
        <div className="bg-white shadow-lg p-4 rounded-lg mb-6 w-[90%]">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-row items-center gap-2 text-lg">
              <MdSell />
              <p>Total Sales</p>
            </div>
            <p>₹ {totalSales !== null ? totalSales : "N/A"}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg mb-6 w-[90%]">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-row items-center gap-2 text-lg">
              <MdOutlineMenuBook />
              <p>Total Menu Items</p>
            </div>
            <p>{visibleItemsCount !== null ? visibleItemsCount : "N/A"}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center md:w-[50%]">
        <div className="bg-white shadow-lg p-4 rounded-lg  mb-6  w-[90%]">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-row items-center gap-2 text-lg">
              <MdRateReview />
              <p>Average Rating</p>
            </div>
            <p>{avgReview !== null ? avgReview : "N/A"}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg  w-[90%]">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-row items-center gap-2 text-lg">
              <RiStockFill />
              <p>Total Out Of Stock Items</p>
            </div>
            <p>{hiddenItemsCount !== null ? hiddenItemsCount : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
