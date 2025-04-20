import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "AI Features",
  description: "Explore various AI-powered features to interact with JKT48 data. You can download specific data or get real-time insights on events, members, and live sessions using AI integration.",
};

const jkt48Features = [
  {
  title: "Microsoft Copilot",
  description: "Gunakan kecerdasan buatan Microsoft Copilot untuk menjawab pertanyaan atau membantu dalam analisis data JKT48. Cocok untuk auto-reply, tanya jawab seputar member, jadwal, dan lainnya.",
  endpoint: "https://api.jkt48connect.my.id/api/ai/microsoft?api_key=XXX",
  premium: false,
},
];

export default function DashboardPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Fitur API Payment Orkut</h2>
          <p className="text-muted-foreground text-sm">
            Semua fitur ini memerlukan API Key pengguna. Beberapa fitur ditandai <Badge variant="destructive">Premium</Badge> yang hanya bisa diakses oleh pengguna berlangganan.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jkt48Features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{feature.title}</CardTitle>
                  {feature.premium && <Badge variant="destructive">Premium</Badge>}
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <a href={feature.endpoint} target="_blank" rel="noopener noreferrer">
                    Lihat API
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
