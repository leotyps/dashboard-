import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "JKT48 Features",
  description: "Explore JKT48 data endpoints and features.",
};

const jkt48Features = [
  {
    title: "Events",
    description: "Lihat daftar event JKT48 (on-air & off-air).",
  },
  {
    title: "News",
    description: "Ambil list berita terbaru dari JKT48.",
  },
  {
    title: "News Detail",
    description: "Ambil detail berita tertentu dari JKT48.",
  },
  {
    title: "Theater",
    description: "Lihat data theater yang akan datang.",
  },
  {
    title: "Theater Detail",
    description: "Detail teater seperti lineup member, waktu, dsb.",
  },
  {
    title: "Member",
    description: "Ambil data semua member JKT48 (trainee hingga inti).",
  },
  {
    title: "Member Detail",
    description: "Lihat biodata, jiko, umur, dan data lengkap member.",
  },
  {
    title: "Live",
    description: "Pantau member yang sedang live (IDN & Showroom).",
  },
  {
    title: "IDN Live Only",
    description: "Cek siapa saja yang live di platform IDN saja.",
  },
  {
    title: "Showroom Live Only",
    description: "Cek siapa saja yang live di platform Showroom.",
  },
  {
    title: "Recent Live",
    description: "Lihat siapa saja yang baru saja live (gift & viewers).",
  },
  {
    title: "Detail Recent Live",
    description: "Lihat detail live yang baru saja dilakukan member.",
  },
  {
    title: "Birthday",
    description: "Pantau siapa saja yang akan ulang tahun.",
  },
  {
    title: "Offair Events",
    description: "Lihat event off-air JKT48 yang akan datang.",
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
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Endpoint: <code className="font-mono lowercase">/api/jkt48/{feature.title.toLowerCase().replace(/\s+/g, "")}</code>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
