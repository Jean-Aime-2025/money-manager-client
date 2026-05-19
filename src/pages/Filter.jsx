import { useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { Search } from "lucide-react"
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { toast } from "sonner";
import moment from "moment";
import TransactionInfoCard from '../components/TransactionInfoCard'

const Filter = () => {
  const [type, setType] = useState("income")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [keyword, setKeyword] = useState("")
  const [sortField, setSortField] = useState("date")
  const [sortOrder, setSortOrder] = useState("asc")
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false)
  
  const handleSearch = async (e) => {
    if (e) e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        type,
        startDate: startDate || null,
        endDate: endDate || null,
        keyword: keyword || null,
        sortField,
        sortOrder
      };

      const response = await axiosConfig.post(
        API_ENDPOINTS.APPLY_FILTERS,
        payload
      );

      console.log("filter data 🔥🔥🔥", response);

      setTransactions(response.data);

    } catch (error) {
      console.error("Failed to fetch transactions:", error);

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-5 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filter Transactions</h2>
      </div>
      <div className="card p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-lg font-semibold">Select the filters</h5>
        </div>
        <form action="" className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
            <select id="type" value={type} className="w-full input" onChange={e => setType(e.target.value)}>
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Date</label>
            <input id="startDate" value={startDate} type="date" className="w-full input" onChange={e => setStartDate(e.target.value)} />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium mb-1">End Date</label>
            <input id="endDate" value={endDate} type="date" className="w-full input" onChange={e => setEndDate(e.target.value)} />
          </div>
          <div>
            <label htmlFor="sortField" className="block text-sm font-medium mb-1">Sort By</label>
            <select
              id="sortField"
              value={sortField}
              onChange={e => setSortField(e.target.value)}
              className="w-full input"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="name">Name</option>
            </select>
          </div>
          <div>
            <label htmlFor="sortOrder" className="block text-sm font-medium mb-1">Sort Order</label>
            <select id="sortOrder" value={sortOrder} className="w-full input" onChange={e => setSortOrder(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="sm:col-span-1 flex items-end">
            <div className="w-full">
              <label htmlFor="keyword" className="block text-sm font-medium mb-1">Search</label>
              <input type="text" value={keyword} id="keyword" placeholder="Search..." className="w-full input" onChange={(e) => setKeyword(e.target.value)} />
            </div>
            <button onClick={handleSearch} className="ml-2 mb-1 p-2 bg-primary text-white rounded flex items-center justify-center cursor-pointer">
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>

      <div className="card p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Transactions</h2>
        </div>
        <p className="text-gray-500 mb-4">Select the filters and click apply to filter the transactions</p>
        {transactions?.map((i) => (
          <TransactionInfoCard
            key={i.id}
            title={i.name}
            icon={i.icon}
            date={moment(i.date).format('Do MMM YYYY')}
            amount={i.amount}
            type={type}
            hideDeleteBtn={true}
          />
        ))}
        {transactions.length === 0 && !loading && (
          <div>No transactions yet ...</div>
        )}
        {loading && (
          <div className="grid gap-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-14 w-full bg-gray-100 animate-pulse rounded-lg"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Filter