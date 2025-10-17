"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CreditCard } from "lucide-react";
import { AccountTab } from "@/components/Settings/AccountTab";
import { BillingTab } from "@/components/Settings/BillingTab";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 gap-4 bg-white">
            {[
              { value: "account", label: "Account", Icon: User },
              { value: "billing", label: "Billings", Icon: CreditCard },
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
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <AccountTab />
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <BillingTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
