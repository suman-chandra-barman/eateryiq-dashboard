import { Card } from "@/components/ui/card";
import { Contact } from "@/redux/features/support/supportApi";

interface SupportQueryCardProps {
  query: Contact;
}

export default function SupportQueryCard({ query }: SupportQueryCardProps) {
  return (
    <Card className="p-6 border border-blue-400 rounded-2xl hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Support Queries</h3>

      <div className="flex gap-4">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-gray-900 font-semibold">{query.full_name}</h4>
            <a
              href={`mailto:${query.email}`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {query.email}
            </a>
          </div>

          <p className="text-blue-600 text-sm font-medium mb-3">
            {query.created_at}
          </p>

          <p className="text-gray-600 text-sm leading-relaxed">
            {query.message}
          </p>
        </div>
      </div>
    </Card>
  );
}
