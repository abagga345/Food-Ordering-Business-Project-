import { MdDashboard } from "react-icons/md";
import { MdBorderColor } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { MdRateReview } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="bg-white p-8 rounded-lg m-6 w-[55%] mx-auto shadow-lg">
      <div>
        <h1 className="text-3xl font-bold mb-5">
          <MdDashboard className="inline" /> Welcome to the Dashboard
        </h1>
        <hr className="my-4" />
        <h2 className="text-xl my-4">
          Ready to serve up something great? Let&apos;s get started!
        </h2>
        <ul>
          <li className="text-lg mb-4">
            <span className="font-semibold">
              <MdBorderColor className="inline" /> All Orders
            </span>
            <br /> Manage and track all orders at a glance.
          </li>
          <hr className="mb-4" />
          <li className="text-lg mb-4">
            <span className="font-semibold">
              <MdPendingActions className="inline" /> Pending Orders
            </span>
            <br /> Keep up with orders waiting to be fulfilled.
          </li>
          <hr className="mb-4" />
          <li className="text-lg mb-4">
            <span className="font-semibold">
              <MdAnalytics className="inline" /> Analytics
            </span>
            <br /> Dive into insights and trends to grow your business.
          </li>
          <hr className="mb-4" />
          <li className="text-lg mb-4">
            <span className="font-semibold">
              <MdAdd className="inline" /> Add Item
            </span>
            <br /> Update your menu with delicious new offerings.
          </li>
          <hr className="mb-4" />
          <li className="text-lg mb-4">
            <span className="font-semibold">
              <MdOutlineMenuBook className="inline" /> Menu
            </span>
            <br /> View and customize your entire menu.
          </li>
          <hr className="mb-4" />
          <li className="text-lg mb-4">
            <span className="font-semibold">
              <MdRateReview className="inline" /> Add Reviews
            </span>
            <br /> Share customer feedback to enhance the dining experience.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
