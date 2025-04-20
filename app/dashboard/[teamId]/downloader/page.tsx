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
    title: "Tiktok",
    description: "Download video dari tiktok tanpa watermark.",
    endpoint: "https://api.jkt48connect.my.id/api/downloader/tiktok?url=https://xxx&api_key=XXX",
    premium: false,
  },
{
    title: "Ytmp3",
    description: "Download sound mp3 dari video di youtube.",
    endpoint: "https://api.jkt48connect.my.id/api/downloader/ytmp3?url=https://xxx&api_key=XXX",
    premium: false,
  },
{
    title: "Ytmp4",
    description: "Download video dari youtube tanpa watermark.",
    endpoint: "https://api.jkt48connect.my.id/api/downloader/ytmp4?url=https://xxx&api_key=XXX",
    premium: false,
  },
{
    title: "Pinterest",
    description: "Download photo atau video yang ada di pinterest",
    endpoint: "https://api.jkt48connect.my.id/api/pin?query=https://xxx&api_key=XXX",
    premium: false,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Fitur API Downloader</h2>
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
