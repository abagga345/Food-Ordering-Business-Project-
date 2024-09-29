import ChartOne from "@/components/ChartOne";
import ChartThree from "@/components/PieChart";

export default function Analytics() {
  return (
    <div>
      <p className="font-semibold text-2xl mt-4 mb-10 text-center">Analytics</p>
      <div className="flex flex-col items-center justify-center gap-10 mb-32">
        <div className="md:w-[50%] w-[90%] rounded-xl shadow-lg">
          <ChartThree />
        </div>
        <div className="md:w-[52%] w-[90%] h-[100%]">
          <ChartOne />
        </div>
      </div>
    </div>
  );
}
