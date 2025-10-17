"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { SubscriptionPaymentPage } from "./SubscriptionPayment";
import Image from "next/image";
import badge from "@/assets/badge.svg";
import rocket from "@/assets/rocket.svg";
import arrow from "@/assets/arrow.svg";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$0",
    period: "/10 Days",
    icon: badge,
    features: [
      "Access to the dashboard",
      "Pay-as-you-go tools",
      "Menu analysis, marketing planner, delivery insights available in all card",
      "Limited EateryGPT prompts",
    ],
    status: "current",
  },
  {
    id: "professional",
    name: "Professional",
    price: "$29",
    period: "/month",
    icon: rocket,
    features: [
      "Monthly business analysis & report",
      "Custom report generation from uploaded data",
      "Tools for Menu, Marketing, Delivery, and Finance management",
      "Industry benchmarking & performance comparison",
      "Unlimited Documents Upload",
    ],
    status: "available",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$69",
    period: "/6 month",
    icon: badge,
    features: [
      "Unlimited EateryGPT searches",
      "1:1 live review & strategic roadmap",
      "Advanced admin tools: site selection, contract review, HR analysis",
      "Priority support",
      "Unlimited EateryGPT prompts",
    ],
    status: "available",
  },
];

const invoices = [
  { id: "Invoice 001", date: "05 Sep, 2025", plan: "Starter", price: "$29" },
  { id: "Invoice 001", date: "05 Sep, 2025", plan: "Starter", price: "$29" },
  { id: "Invoice 001", date: "05 Sep, 2025", plan: "Starter", price: "$29" },
  { id: "Invoice 001", date: "05 Sep, 2025", plan: "Starter", price: "$29" },
  { id: "Invoice 001", date: "05 Sep, 2025", plan: "Starter", price: "$29" },
];

export function BillingTab() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  if (showPayment && selectedPlan) {
    const plan = plans.find((p) => p.id === selectedPlan);
    return (
      <SubscriptionPaymentPage
        plan={plan!}
        onBack={() => {
          setShowPayment(false);
          setSelectedPlan(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Subscription Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className="p-4 bg-blue-50 border-blue-100 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl flex items-center justify-center p-2 bg-white">
                  <Image
                    src={plan.icon}
                    alt={plan.name}
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <h3 className="text-xl text-[#3B3B3B] font-bold">
                    {plan.name}
                  </h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[#3B3B3B]">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3 mb-6 flex-1">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => {
                setSelectedPlan(plan.id);
                setShowPayment(true);
              }}
              disabled={plan.status === "current"}
              className={
                plan.status === "current"
                  ? "w-full bg-gray-200 text-gray-600 cursor-not-allowed"
                  : "w-full bg-blue-600 hover:bg-blue-700 text-white"
              }
            >
              {plan.status === "current"
                ? "Current plan"
                : "Switch to this plan"}
            </Button>
          </Card>
        ))}
      </div>

      {/* Previous Invoices */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Previous Invoice
        </h3>
        <Card className="bg-card border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                    Invoice Id
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-foreground">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-foreground">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {invoice.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {invoice.plan}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {invoice.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
