import { Card, CardContent } from "@/components/ui/card";

export default function DashboardSkeleton() {
  return (
    <div className="flex h-screen bg-[#F2F7FF]">
      {/* Sidebar Skeleton */}
      <aside className="w-64 bg-white p-4 space-y-4">
        <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse" />
        <div className="space-y-3 mt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-full bg-gray-200 rounded-md animate-pulse"
            />
          ))}
        </div>
        <div className="mt-auto pt-6">
          <div className="h-14 w-full bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-8 w-64 bg-gray-200 rounded-md animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse" />
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-5 space-y-4">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="h-16 w-full bg-gray-200 rounded-xl animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Skeleton */}
        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-72 w-full bg-gray-200 rounded-xl animate-pulse" />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
