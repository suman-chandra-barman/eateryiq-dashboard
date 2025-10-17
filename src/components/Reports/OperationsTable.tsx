import { Card } from "@/components/ui/card"

const tableData = [
  {
    category: "Orders Fulfilled",
    source: "Safety + Hygiene",
    amount: "$30",
    percentage: "26%",
  },
  {
    category: "Pending Tasks",
    source: "Logs / Certificates",
    amount: "$30",
    percentage: "26%",
  },
  {
    category: "Pending Tasks",
    source: "Logs / Certificates",
    amount: "$30",
    percentage: "26%",
  },
  {
    category: "Pending Tasks",
    source: "Logs / Certificates",
    amount: "$30",
    percentage: "26%",
  },
  {
    category: "Pending Tasks",
    source: "Logs / Certificates",
    amount: "$30",
    percentage: "26%",
  },
  {
    category: "Pending Tasks",
    source: "Logs / Certificates",
    amount: "$30",
    percentage: "26%",
  },
]

export function OperationsTable() {
  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Daily Operations Breakdown</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Category</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Source</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Amount</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-sm text-gray-900">{row.category}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{row.source}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{row.amount}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{row.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
