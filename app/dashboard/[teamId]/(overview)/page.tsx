import { Metadata } from "next";

import { RecentSales } from "@/app/dashboard/[teamId]/(overview)/recent-sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Graph } from "./graph";
import { ApiKeyCard } from "./ApikeyCard";
import { TotalRevenueCard } from "./TotalRevenueCard";
import { ActiveNowCard } from "./ActiveNowCard";
import { CardConnectAccount } from "./CardConnectAccount";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default function DashboardPage() {
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
           <CardConnectAccount />
            <TotalRevenueCard />
             <ApiKeyCard />
           <ActiveNowCard />
          </div>
        </div>
      </div>
    </>
  );
}
