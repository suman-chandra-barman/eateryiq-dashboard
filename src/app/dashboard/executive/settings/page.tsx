"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CreditCard } from "lucide-react";
import { AccountTab } from "@/components/Settings/AccountTab";
import { BillingTab } from "@/components/Settings/BillingTab";
import { Button } from "@/components/ui/button";
import { ShareThoughtModal } from "@/components/Dailog/ShareThoughtModal";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-medium text-[#3B3B3B] mb-4">Setting</h2>
      <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 gap-4 bg-white mb-4">
            {[
              { value: "account", label: "Account", Icon: User },
              { value: "billing", label: "Billing", Icon: CreditCard },
            ].map(({ value, label, Icon }) => {
              const isActive = activeTab === value;
              return (
                <TabsTrigger
                  key={value}
                  value={value}
                  className={`flex items-center justify-center gap-2 pb-2 border-0 rounded-none !shadow-none border-b-2 transition-all duration-200 
                    ${
                      isActive
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-500 border-transparent hover:text-blue-600"
                    }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isActive ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                  {label}
                </TabsTrigger>
              );
            })}
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md max-w-56"
              onClick={() => setIsModalOpen(true)}
            >
              Share Your Thought
            </Button>
          </TabsList>
          <TabsContent value="account" className="space-y-6">
            <AccountTab />
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <BillingTab />
          </TabsContent>
        </Tabs>
      </div>
      <ShareThoughtModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
