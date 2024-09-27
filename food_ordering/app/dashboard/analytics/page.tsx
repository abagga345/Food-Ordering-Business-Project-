import ChartOne from "@/components/ChartOne";
import ChartThree from "@/components/PieChart";

export default function Analytics() {
  return (
    <div>
      <p className="font-semibold text-2xl mt-4 mb-10 text-center">Analytics</p>
      <div className="flex flex-row justify-center items-center">
        <div className="w-[35%] rounded-xl shadow-lg mx-auto">
          <ChartThree />
        </div>
        <div className="w-[55%]">
          <ChartOne />
        </div>
      </div>
    </div>
  );
}
