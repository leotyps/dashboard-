import { Metadata } from "next";

import { RecentSales } from "@/app/dashboard/[teamId]/(overview)/recent-sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Graph } from "./graph";
import { Coins, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  const [showApiKey, setShowApiKey] = useState(false);

  const toggleApiKey = () => setShowApiKey(!showApiKey);
  const apiKey = "JKT48CONNECT";
  const maskedKey = "\u2022".repeat(apiKey.length);

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Zenova WA Bot v4.0.7</CardTitle>
                <CardDescription>
                  Source code Zenova WA Bot versi 4.0.7 telah dirilis dan siap dijual.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a href="https://wa.me/6285701479245" target="_blank" rel="noreferrer">
                    Beli Sekarang via WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="flex flex-row items-center justify-between">
              <div className="p-6">
                <CardTitle>Saldo Kamu</CardTitle>
                <div className="text-2xl font-bold mt-2">Rp 120.000</div>
                <p className="text-xs text-muted-foreground">Saldo bisa digunakan untuk generate API Key</p>
              </div>
              <div className="p-6">
                <Coins className="h-10 w-10 text-yellow-500" />
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Key Kamu</CardTitle>
                <CardDescription>Gunakan API Key ini untuk akses layanan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center bg-muted p-3 rounded-md">
                  <div className="text-lg font-mono break-all flex-1">
                    {showApiKey ? apiKey : maskedKey}
                  </div>
                  <button onClick={toggleApiKey} className="ml-2 text-muted-foreground">
                    {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Generate API Key</CardTitle>
                <CardDescription>
                  Klik tombol di bawah untuk membuat API Key baru
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Generate API Key</Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Graph />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
