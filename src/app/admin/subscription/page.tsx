"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import badge from "@/assets/badge.svg";
import rocket from "@/assets/rocket.svg";
import Image from "next/image";
import arrow from "@/assets/arrow.svg";
import { AddSubscriptionModal } from "@/components/Admin/Modal/AddSubscription";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

interface Feature {
  name: string;
  enabled: boolean;
}

interface Subscription {
  id: string;
  package_title: string;
  package_subtitle: string;
  package_duration: string;
  package_amount: number;
  features: Feature[];
  created_at: string;
}

export default function SubscriptionPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSubscription = async (data: {
    package_title: string;
    package_subtitle: string;
    package_duration: string;
    package_amount: number;
    features: Feature[];
  }) => {
    setIsSubmitting(true);
    try {
      console.log("data", data);

      //   toast.success("Subscription created successfully");
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error creating subscription:", error);
      //   toast.error("Failed to create subscription");
    } finally {
      setIsSubmitting(false);
    }
  };

  //   const handleDeleteSubscription = async (id: string) => {
  //     try {
  //       const { error } = await supabase
  //         .from("subscriptions")
  //         .delete()
  //         .eq("id", id);

  //       if (error) throw error;

  //       toast.success("Subscription deleted successfully");
  //       setSubscriptions(subscriptions.filter((s) => s.id !== id));
  //     } catch (error) {
  //       console.error("Error deleting subscription:", error);
  //       toast.error("Failed to delete subscription");
  //     }
  //   };

  const plans = [
    {
      name: "Free To Try",
      icon: badge,
      price: "$0",
      period: "/30 Days",
      description: "Get started with essential tools at no cost.",
      features: [
        "Access to the dashboard",
        "Pay-as-you-go access to premium tools",
        "Menu analysis, marketing planner, and delivery insights on demand",
        "Limited EateryGPT access",
      ],
    },
    {
      name: "Professional",
      icon: rocket,
      price: "$199",
      period: "/month",
      description:
        "Comprehensive insights and tools for operators who want to manage smarter and grow faster.",
      features: [
        "Monthly business reports & detailed reports",
        "Custom report generation from uploaded data",
        "Tools for Menu, Marketing, Delivery, and Finance management",
        "Industry benchmarking & performance comparison",
        "Unlimited document uploads",
        "Expanded EateryGPT access",
      ],
    },
    {
      name: "Enterprise",
      icon: badge,
      price: "$1,999",
      period: "/month",
      description:
        "The all-in-one solution for multi-unit operators, franchisees, and owners seeking advanced strategic insights.",
      features: [
        "Maximum EateryGPT access",
        "1:1 live review sessions & custom growth roadmap",
        "Advanced admin tools: site selection, contract review, operations analysis, HR insights",
        "Priority support & dedicated success manager",
        "Unlimited document uploads and data integrations",
      ],
    },
  ];

  return (
    <section className="">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl md:text-2xl font-medium">Subscription List</h2>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 px-8"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus /> Add
        </Button>
      </div>
      {/* Pricing Cards */}

      <div className="grid md:grid-cols-3 gap-6 lg:gap-12">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`relative flex flex-col border-blue-200`}
          >
            <CardHeader className="space-y-4 pt-8">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl flex items-center justify-center p-2 bg-white">
                  <Image
                    src={plan.icon}
                    alt={plan.name}
                    width={45}
                    height={45}
                  />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">{plan.name}</h3>
                </div>
              </div>
              <p className="text-sm text-gray-600">{plan.description}</p>
              <div className="flex items-baseline gap-1">
                {plan.name === "Enterprise" && "From "}
                <span className="text-3xl md:text-4xl lg:text-[40px]  md:leading-13 font-bold">
                  {plan.price}
                </span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex gap-3">
                    <Image src={arrow} alt="Check" width={24} height={24} />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button className={`w-full bg-red-500 hover:bg-red-600`}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <AddSubscriptionModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddSubscription}
        isSubmitting={isSubmitting}
      />
    </section>
  );
}
