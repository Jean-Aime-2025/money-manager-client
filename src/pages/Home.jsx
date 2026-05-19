import { WalletCards } from "lucide-react";
import InfoCard from "../components/InfoCard";
import { addThousandsSeparator } from '../util/utils'
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";

const Home = () => {
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)
  const hasFetched = useRef(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true)
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA)
      if (response.status === 200) {
        setDashboardData(response.data)
      }
    } catch (error) {
      console.error('Something went wrong while fetching dashboard data', error)
      toast.error('Something went wrong while fetching dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;
    fetchDashboardData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-5 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard icon={<WalletCards />} label="Total Balance" value={addThousandsSeparator(dashboardData?.totalBalance || 0)} color="bg-purple-800" loading={loading} />
        <InfoCard icon={<WalletCards />} label="Total Income" value={addThousandsSeparator(dashboardData?.totalIncome || 0)} color="bg-green-800" loading={loading} />
        <InfoCard icon={<WalletCards />} label="Total Expense" value={addThousandsSeparator(dashboardData?.totalExpense || 0)} color="bg-red-800" loading={loading} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <RecentTransactions transactions={dashboardData?.recentTransactions || []} onMore={() => navigate('/expense')} loading={loading} />
        <FinanceOverview totalBalance={dashboardData?.totalBalance} totalIncome={dashboardData?.totalIncome} totalExpense={dashboardData?.totalExpense} loading={loading} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Transactions title={'Recent Expenses'} transactions={dashboardData?.recent5Expenses || []} onMore={() => navigate('/expense')} type="expense" loading={loading} />
        <Transactions title={'Recent Income'} transactions={dashboardData?.recent5Incomes || []} onMore={() => navigate('/income')} type="income" loading={loading} />
      </div>
    </div>
  );
};

export default Home;
