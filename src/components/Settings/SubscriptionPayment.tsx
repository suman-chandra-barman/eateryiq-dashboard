"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SubscriptionPaymentPageProps {
  plan: {
    name: string;
    price: string;
    period: string;
  };
  onBack: () => void;
}

export function SubscriptionPaymentPage({
  plan,
  onBack,
}: SubscriptionPaymentPageProps) {
  const [formData, setFormData] = useState({
    email: "name@gmail.com",
    cardName: "Meet Patel",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Subscribe To {plan.name}
          </h1>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-foreground">
              {plan.price}
            </span>
            <span className="text-muted-foreground">{plan.period}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Order Summary */}
        <div className="space-y-6">
          <Card className="p-6 bg-card border-gray-200">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-foreground">1x Paid User</span>
                <span className="font-semibold text-foreground">
                  {plan.price}.00
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-foreground font-semibold">
                    Total due today
                  </span>
                  <span className="font-bold text-foreground">
                    {plan.price}.00
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Taxes included in the subscription price
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side - Payment Form */}
        <div className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-white border-gray-200 text-foreground"
            />
          </div>

          {/* Credit Card Details */}
          <Card className="p-6 bg-card border-gray-200">
            <h3 className="font-semibold text-foreground mb-4">
              Credit Card Details
            </h3>

            {/* Payment Method Icons */}
            <div className="flex gap-3 mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <span className="text-2xl">💳</span>
              <div className="flex gap-2">
                <span className="text-2xl">🔴</span>
                <span className="text-2xl">💳</span>
                <span className="text-2xl">💳</span>
                <span className="text-2xl">💳</span>
              </div>
            </div>

            {/* Name on Card */}
            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium text-foreground">
                Name on card
              </label>
              <Input
                placeholder="Meet Patel"
                value={formData.cardName}
                onChange={(e) => handleInputChange("cardName", e.target.value)}
                className="bg-white border-gray-200 text-foreground"
              />
            </div>

            {/* Card Number */}
            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium text-foreground">
                Card number
              </label>
              <Input
                placeholder="0000 0000 0000 0000"
                value={formData.cardNumber}
                onChange={(e) =>
                  handleInputChange("cardNumber", e.target.value)
                }
                className="bg-white border-gray-200 text-foreground"
              />
            </div>

            {/* Expiry and CVC */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Card expiration
                </label>
                <Select
                  value={formData.expiryMonth}
                  onValueChange={(value) =>
                    handleInputChange("expiryMonth", value)
                  }
                >
                  <SelectTrigger className="bg-white border-gray-200 text-foreground">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem
                        key={i + 1}
                        value={String(i + 1).padStart(2, "0")}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  &nbsp;
                </label>
                <Select
                  value={formData.expiryYear}
                  onValueChange={(value) =>
                    handleInputChange("expiryYear", value)
                  }
                >
                  <SelectTrigger className="bg-white border-gray-200 text-foreground">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return (
                        <SelectItem key={year} value={String(year)}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* CVC */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-foreground">
                Card Security Code
              </label>
              <div className="relative">
                <Input
                  placeholder="Code"
                  value={formData.cvc}
                  onChange={(e) => handleInputChange("cvc", e.target.value)}
                  className="bg-white border-gray-200 text-foreground"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  ⓘ
                </button>
              </div>
            </div>

            {/* Subscribe Button */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4">
              Subscribe
            </Button>

            {/* Terms */}
            <p className="text-xs text-muted-foreground text-center">
              By providing your card information, you allow ChefGPT, to charge
              your card for future payments in accordance with their terms.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
