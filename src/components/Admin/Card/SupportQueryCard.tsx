import { Card } from "@/components/ui/card"

interface SupportQuery {
  id: string
  userName: string
  email: string
  role?: string
  message: string
  userImage?: string
}

interface SupportQueryCardProps {
  query: SupportQuery
}

export default function SupportQueryCard({ query }: SupportQueryCardProps) {
  const displayRole = query.role || "Unknown"

  return (
    <Card className="p-6 border border-blue-400 rounded-2xl hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Support Queries</h3>

      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {query.userImage ? (
            <img
              src={query.userImage || "/placeholder.svg"}
              alt={query.userName}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
              {query.userName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-gray-900 font-semibold">{query.userName}</h4>
            <a href={`mailto:${query.email}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              {query.email}
            </a>
          </div>

          <p className="text-blue-600 text-sm font-medium mb-3">{displayRole}</p>

          <p className="text-gray-600 text-sm leading-relaxed">{query.message}</p>
        </div>
      </div>
    </Card>
  )
}
