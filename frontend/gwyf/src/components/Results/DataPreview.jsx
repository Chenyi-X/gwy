import { Skeleton } from "@/components/ui/skeleton";

export default function DataPreview({ data, loading }) {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[40px] w-full" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-[35px] w-full" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500">无数据可显示</div>;
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th 
                key={col}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td 
                  key={col}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}