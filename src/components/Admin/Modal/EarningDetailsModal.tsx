"use client";

import { X, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetSingleEarningQuery } from "@/redux/features/earning/earningApi";

interface EarningDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  earningId: number;
}

export default function EarningDetailsModal({
  isOpen,
  onClose,
  earningId,
}: EarningDetailsModalProps) {
  const { data, isLoading, isError } = useGetSingleEarningQuery(earningId, {
    skip: !isOpen,
  });

  if (!isOpen) return null;

  const earning = data?.data;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Earning Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {isError && (
          <div className="flex items-center justify-center py-20">
            <p className="text-red-600">Failed to load earning details.</p>
          </div>
        )}

        {earning && (
          <>
            <div className="space-y-2">
              <DetailField label="Invoice ID" value={earning.invoice_id} />
              <DetailField label="User ID" value={earning.user_id} />
              <DetailField label="User Name" value={earning.user_name} />
              <DetailField label="Email" value={earning.email} />
              <DetailField
                label="User Role"
                value={earning.user_role}
                className="capitalize"
              />
              <DetailField label="Plan" value={earning.plan} />
              <DetailField label="Date" value={earning.date} />
              <DetailField label="Price" value={`$${earning.price}`} />
              <DetailField
                label="Status"
                value={
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      earning.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {earning.status}
                  </span>
                }
              />
            </div>

            {(earning.hosted_invoice_url || earning.invoice_pdf) && (
              <div className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Invoice Links
                </h3>
                <div className="flex flex-col gap-3">
                  {earning.hosted_invoice_url && (
                    <a
                      href={earning.hosted_invoice_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>View Hosted Invoice</span>
                    </a>
                  )}
                  {earning.invoice_pdf && (
                    <a
                      href={earning.invoice_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <Download size={18} />
                      <span>Download PDF Invoice</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            <Button
              onClick={onClose}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Close
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

interface DetailFieldProps {
  label: string;
  value: string | number | React.ReactNode;
  className?: string;
}

function DetailField({ label, value, className }: DetailFieldProps) {
  return (
    <div className="border-b border-gray-200 flex items-center justify-between py-3">
      <p className="text-sm font-medium text-gray-600">{label}:</p>
      <p className={`text-sm text-gray-900 font-medium ${className || ""}`}>
        {value}
      </p>
    </div>
  );
}
