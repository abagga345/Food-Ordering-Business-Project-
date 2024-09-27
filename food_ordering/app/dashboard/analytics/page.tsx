import ChartOne from "@/components/ChartOne";
import ChartThree from "@/components/PieChart";

export default function Analytics() {
  return (
    <div>
      <p className="font-semibold text-2xl mt-4 mb-10 text-center">Analytics</p>
      <div className="w-[35%] rounded-xl shadow-lg mx-auto">
        <ChartThree />
      </div>
      <div>
        <ChartOne />
      </div>
    </div>
  );
}
