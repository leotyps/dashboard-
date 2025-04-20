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
    endpoint: "https://api.jkt48connect.my.id/api/events?api_key=XXX",
    premium: true,
  },
  {
    title: "News",
    description: "Ambil berita terbaru dan update resmi dari JKT48 langsung dari situs resmi.",
    endpoint: "https://api.jkt48connect.my.id/api/news?api_key=XXX",
    premium: true,
  },
  {
    title: "News Detail",
    description: "Ambil detail lengkap dari salah satu berita termasuk isi konten dan gambar.",
    endpoint: "https://api.jkt48connect.my.id/api/news/[ID]?api_key=XXX",
    premium: true,
  },
  {
    title: "Theater",
    description: "Tampilkan jadwal theater JKT48 mendatang lengkap dengan judul pertunjukan dan tanggal.",
    endpoint: "https://api.jkt48connect.my.id/api/theater?api_key=XXX",
    premium: true,
  },
  {
    title: "Theater Detail",
    description: "Detail dari jadwal theater seperti lineup member yang tampil, waktu, dan informasi lainnya.",
    endpoint: "https://api.jkt48connect.my.id/api/theater/[ID]?api_key=XXX",
    premium: true,
  },
  {
    title: "Member",
    description: "Ambil daftar seluruh member JKT48 dari generasi trainee hingga tim inti.",
    endpoint: "https://api.jkt48connect.my.id/api/member?api_key=XXX",
    premium: false,
  },
  {
    title: "Member Detail",
    description: "Lihat biodata lengkap member, termasuk umur, jiko, tinggi badan, dan fakta menarik lainnya.",
    endpoint: "https://api.jkt48connect.my.id/api/member/[ID]?api_key=XXX",
    premium: true,
  },
  {
    title: "Live",
    description: "Pantau siapa saja member JKT48 yang sedang live di IDN Live atau Showroom secara realtime.",
    endpoint: "https://api.jkt48connect.my.id/api/live?api_key=XXX",
    premium: true,
  },
  {
    title: "IDN Live Only",
    description: "Ambil data siapa saja member yang sedang live khusus di platform IDN Live.",
    endpoint: "https://api.jkt48connect.my.id/api/live/idn?api_key=XXX",
    premium: true,
  },
  {
    title: "Showroom Live Only",
    description: "Ambil data siapa saja member yang sedang live khusus di platform Showroom.",
    endpoint: "https://api.jkt48connect.my.id/api/live/showroom?api_key=XXX",
    premium: true,
  },
  {
    title: "Youtube Live Only",
    description: "Ambil data member JKT48V yang sedang live pada youtube.",
    endpoint: "https://api.jkt48connect.my.id/api/live/ytlive?api_key=XXXX",
    premium: true,
  },
  {
    title: "Recent Live",
    description: "Lihat siapa saja member yang baru saja selesai live beserta total gift dan viewers.",
    endpoint: "https://api.jkt48connect.my.id/api/recent?api_key=XXX",
    premium: true,
  },
  {
    title: "Detail Recent Live",
    description: "Ambil data lebih detail dari live sebelumnya seperti total komentar, gift, viewers, dan durasi.",
    endpoint: "https://api.jkt48connect.my.id/api/recent/[ID]?api_key=XXX",
    premium: true,
  },
  {
    title: "Birthday",
    description: "Cek siapa saja member yang akan berulang tahun dalam waktu dekat.",
    endpoint: "https://api.jkt48connect.my.id/api/next-birthday?api_key=XXX",
    premium: false,
  },
  {
    title: "Offair Events",
    description: "Tampilkan event offair JKT48 yang bersifat non-teater, seperti konser dan meet & greet.",
    endpoint: "https://api.jkt48connect.my.id/api/events/other?api_key=XXX",
    premium: false,
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
