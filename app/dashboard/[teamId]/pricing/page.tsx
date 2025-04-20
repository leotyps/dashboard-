import { PricingGrid } from "@/components/pricing";
import { stackServerApp } from "@/stack";

export default async function IndexPage() {
  const project = await stackServerApp.getProject();

  return (
    <>
      <PricingGrid
        title="API Pricing Plans"
        subtitle="Pilih paket yang sesuai dengan kebutuhanmu. Setiap plan mendukung integrasi mudah dan rate limit sesuai kebutuhan."
        items={[
          {
            title: "Public Access",
            price: "Free",
            description: "Cocok buat fans atau proyek kecil yang butuh data dasar.",
            features: [
              "Akses endpoint publik",
              "Data real-time",
              "Support komunitas",
              "Free selamanya",
            ],
            buttonText: "Gunakan Sekarang",
            buttonHref: stackServerApp.urls.signUp,
          },
          {
            title: "Basic",
            price: "10k",
            description: "Untuk dev yang butuh kontrol lebih dan limit lebih tinggi.",
            features: [
              "Akses endpoint publik",
              "Rate limit ditingkatkan",
              "API key kustom",
              "Support prioritas",
              "Free selamanya",
            ],
            buttonText: "Akses Awal",
            isPopular: true,
            buttonHref: stackServerApp.urls.signUp,
          },
          {
            title: "Premium",
            price: "15k",
            description: "Untuk dev yang butuh akses endpoint premium dan limit tinggi.",
            features: [
              "Akses semua endpoint",
              "Rate limit tinggi",
              "API key premium",
              "Support prioritas",
              "Free selamanya",
            ],
            buttonText: "Beli Sekarang",
            isPopular: true,
            buttonHref: "https://payment.jkt48connect.my.id",
          },
          {
            title: "Custom Plan",
            price: "Negosiasi",
            description: "Punya kebutuhan khusus? Kita bisa bantu.",
            features: [
              "API key khusus",
              "Limit disesuaikan",
              "Endpoint kustom (jika perlu)",
              "Dukungan penuh dari dev",
            ],
            buttonText: "Hubungi Dev",
            buttonHref: "https://wa.me/6285701479245",
          },
        ]}
      />

      <div className="text-center mt-10 px-4 text-muted-foreground">
        <p>
          Semua plan mendukung integrasi ke aplikasi, bot, atau situs kamu dengan mudah. API key akan diberikan setelah registrasi.
        </p>
        <p className="mt-2">Untuk dokumentasi lengkap, kunjungi{" "}
          <a href="https://docs.jkt48connect.my.id" target="_blank" rel="noopener noreferrer" className="underline font-medium">
            docs.jkt48connect.my.id
          </a>.
        </p>
      </div>
    </>
  );
}
