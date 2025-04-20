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
  title: "JKT48 Features",
  description: "Explore JKT48 data endpoints and features.",
};

const jkt48Features = [
  {
    title: "Events",
    description: "Lihat daftar event JKT48 (on-air & off-air).",
    endpoint: "/api/jkt48/events",
    premium: false,
  },
  {
    title: "News",
    description: "Ambil list berita terbaru dari JKT48.",
    endpoint: "/api/jkt48/news",
    premium: false,
  },
  {
    title: "News Detail",
    description: "Ambil detail berita tertentu dari JKT48.",
    endpoint: "/api/jkt48/newsDetail",
    premium: false,
  },
  {
    title: "Theater",
    description: "Lihat data theater yang akan datang.",
    endpoint: "/api/jkt48/theater",
    premium: false,
  },
  {
    title: "Theater Detail",
    description: "Detail theater seperti lineup member, waktu, dsb.",
    endpoint: "/api/jkt48/theaterDetail",
    premium: true,
  },
  {
    title: "Member",
    description: "Ambil data semua member JKT48 (trainee hingga inti).",
    endpoint: "/api/jkt48/member",
    premium: false,
  },
  {
    title: "Member Detail",
    description: "Lihat biodata, jiko, umur, dan data lengkap member.",
    endpoint: "/api/jkt48/memberDetail",
    premium: true,
  },
  {
    title: "Live",
    description: "Pantau member yang sedang live (IDN & Showroom).",
    endpoint: "/api/jkt48/live",
    premium: false,
  },
  {
    title: "IDN Live Only",
    description: "Cek siapa saja yang live di platform IDN.",
    endpoint: "/api/jkt48/idn",
    premium: false,
  },
  {
    title: "Showroom Live Only",
    description: "Cek siapa saja yang live di platform Showroom.",
    endpoint: "/api/jkt48/showroom",
    premium: false,
  },
  {
    title: "Recent Live",
    description: "Lihat siapa saja yang baru saja live (gift & views).",
    endpoint: "/api/jkt48/recent",
    premium: false,
  },
  {
    title: "Detail Recent Live",
    description: "Detail live sebelumnya (gift, viewers, waktu, dsb).",
    endpoint: "/api/jkt48/recentDetail",
    premium: true,
  },
  {
    title: "Birthday",
    description: "Pantau siapa saja yang akan ulang tahun.",
    endpoint: "/api/jkt48/birthday",
    premium: false,
  },
  {
    title: "Offair Events",
    description: "Lihat event offair JKT48 yang akan datang.",
    endpoint: "/api/jkt48/offair",
    premium: true,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Fitur JKT48</h2>
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
              <CardContent className="flex items-center justify-between">
                <code className="text-sm text-muted-foreground">
                  {feature.endpoint}
                </code>
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
