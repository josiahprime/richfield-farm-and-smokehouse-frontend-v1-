"use client"
import Widget from "./components/widget/Widget";
import Featured from "./components/featured/Featured";
import Chart from "./components/chart/Chart";
import OrdersTable from "./components/table/Table";
// import { useAuthStore } from "../../../store/useAuthStore";

const Home = () => {
  // const { authUser } = useAuthStore()
  // console.log(`authUser from dashboard page ${authUser}`)
  return (
    <div className="flex">
      <div className="flex-[6]">
        <div className="flex gap-5 p-5">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="flex gap-5 px-5">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="shadow-md p-5 m-5 bg-white rounded-lg">
          <h2 className="text-gray-500 font-medium mb-4">Latest Transactions</h2>
          <OrdersTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
