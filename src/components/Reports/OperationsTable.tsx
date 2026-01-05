import { Card } from "@/components/ui/card";

interface OperationsTableProps {
  data?: {
    columns: string[];
    rows: string[][];
  };
}

export function OperationsTable({ data }: OperationsTableProps) {
  const columns = data?.columns || [
    "Category",
    "Source",
    "Amount",
    "% of Total",
  ];
  const rows = data?.rows || [];

  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 mb-4">
        Daily Operations Breakdown
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="text-left py-3 px-4 text-xs font-semibold text-gray-600"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`py-3 px-4 text-sm ${
                      cellIndex === 0
                        ? "text-gray-900"
                        : cellIndex === 1
                        ? "text-gray-600"
                        : "font-medium text-gray-900"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
