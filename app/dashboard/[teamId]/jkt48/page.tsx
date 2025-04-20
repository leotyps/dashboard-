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
    description: "Lihat daftar semua event JKT48 baik yang sedang berjalan maupun akan datang, termasuk on-air dan off-air.",
    endpoint: "/api/jkt48/events",
    premium: false,
  },
  {
    title: "News",
    description: "Ambil berita terbaru dan update resmi dari JKT48 langsung dari situs resmi.",
    endpoint: "/api/jkt48/news",
    premium: false,
  },
  {
    title: "News Detail",
    description: "Ambil detail lengkap dari salah satu berita termasuk isi konten dan gambar.",
    endpoint: "/api/jkt48/newsDetail",
    premium: false,
  },
  {
    title: "Theater",
    description: "Tampilkan jadwal theater JKT48 mendatang lengkap dengan judul pertunjukan dan tanggal.",
    endpoint: "/api/jkt48/theater",
    premium: false,
  },
  {
    title: "Theater Detail",
    description: "Detail dari jadwal theater seperti lineup member yang tampil, waktu, dan informasi lainnya.",
    endpoint: "/api/jkt48/theaterDetail",
    premium: true,
  },
  {
    title: "Member",
    description: "Ambil daftar seluruh member JKT48 dari generasi trainee hingga tim inti.",
    endpoint: "/api/jkt48/member",
    premium: false,
  },
  {
    title: "Member Detail",
    description: "Lihat biodata lengkap member, termasuk umur, jiko, tinggi badan, dan fakta menarik lainnya.",
    endpoint: "/api/jkt48/memberDetail",
    premium: true,
  },
  {
    title: "Live",
    description: "Pantau siapa saja member JKT48 yang sedang live di IDN Live atau Showroom secara realtime.",
    endpoint: "/api/jkt48/live",
    premium: false,
  },
  {
    title: "IDN Live Only",
    description: "Ambil data siapa saja member yang sedang live khusus di platform IDN Live.",
    endpoint: "/api/jkt48/idn",
    premium: false,
  },
  {
    title: "Showroom Live Only",
    description: "Ambil data siapa saja member yang sedang live khusus di platform Showroom.",
    endpoint: "/api/jkt48/showroom",
    premium: false,
  },
  {
    title: "Recent Live",
    description: "Lihat siapa saja member yang baru saja selesai live beserta total gift dan viewers.",
    endpoint: "/api/jkt48/recent",
    premium: false,
  },
  {
    title: "Detail Recent Live",
    description: "Ambil data lebih detail dari live sebelumnya seperti total komentar, gift, viewers, dan durasi.",
    endpoint: "/api/jkt48/recentDetail",
    premium: true,
  },
  {
    title: "Birthday",
    description: "Cek siapa saja member yang akan berulang tahun dalam waktu dekat.",
    endpoint: "/api/jkt48/birthday",
    premium: false,
  },
  {
    title: "Offair Events",
    description: "Tampilkan event offair JKT48 yang bersifat non-teater, seperti konser dan meet & greet.",
    endpoint: "/api/jkt48/offair",
    premium: true,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Fitur API JKT48</h2>
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
