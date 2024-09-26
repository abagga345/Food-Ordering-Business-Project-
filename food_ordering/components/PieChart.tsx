"use client";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface ChartThreeState {
  series: number[];
  labels: string[];
}

export const getOrderCount = async () => {
  try {
    const response = await fetch("/api/admin/orderStates"); // Ensure this matches your API route
    if (!response.ok) {
      throw new Error("Failed to fetch order counts");
    }
    const data = await response.json();

    // Return the counts mapped to status labels
    return {
      Unconfirmed: data.unconfirmed,
      Processing: data.processing,
      Dispatched: data.dispatched,
      Delivered: data.delivered,
      Rejected: data.rejected,
    };
  } catch (error) {
    console.error("Error fetching order counts:", error);
    return {};
  }
};

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"],
  // labels: ['Desktop', 'Tablet', 'Mobile', 'Unknown'],
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [],
    labels: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderCounts = await getOrderCount();

        const labels = Object.keys(orderCounts);
        const series = Object.values(orderCounts);

        setState({
          series,
          labels,
        });
      } catch (error) {
        console.error("Error updating chart data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="sm:px-7.5 col-span-12 border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5 rounded-xl">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Order Status
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={{ ...options, labels: state.labels }}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {state.labels.map((label, index) => (
          <div className="sm:w-1/2 w-full px-8" key={index}>
            <div className="flex w-full items-center">
              <span
                className="mr-2 block h-3 w-full max-w-3 rounded-full"
                style={{
                  backgroundColor:
                    options.colors[index % options.colors.length],
                }}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium">
                <span>{label}</span>
                <span>{state.series[index]}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;
