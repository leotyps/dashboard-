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
  title: "Downloader Features",
  description: "Download A data that you want to download using this feature.",
};

const jkt48Features = [
  {
    title: "Create Payment",
    description: "Buat pembayaran menggunakan qris dari orderkuota(okeconnect).",
    endpoint: "https://api.jkt48connect.my.id/api/orkut/createpayment?qris=XXXX&amount=XXX&api_key=XXX",
    premium: false,
  },
{
    title: "Cek Status",
    description: "Untuk mengecek status pembayaran yang sudah dibuat.",
    endpoint: "https://api.jkt48connect.my.id/api/orkut/cekstatus?merchant=XXX&keyorkut=XXX&amount=XXX&api_key=XXX",
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
            Semua fitur ini memerlukan API Key pengguna. Beberapa fitur ditandai <Badge variant="destructive">Premium</Badge> yang hanya bisa diakses oleh pengguna berlangganan, dan fitur ini memerlukan akun okeconnect agar bisa digunakan.
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
