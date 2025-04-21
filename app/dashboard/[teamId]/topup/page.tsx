'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@stackframe/stack";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function TopUpPage() {
  const [amount, setAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [qrImage, setQrImage] = useState("");
  const [paymentKey, setPaymentKey] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Ambil teamId dari URL
  const params = useParams<{ teamId: string }>();
  const user = useUser({ or: "redirect" });
  const team = user.useTeam(params.teamId);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const showNotification = (title: string, body: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  const generateFee = (value: number) => {
    const randomPercent = Math.random() * (3.5 - 1.5) + 1.5;
    const fee = value * (randomPercent / 100);
    return Math.ceil(value + fee);
  };

  const handleTopUp = async () => {
    const total = generateFee(amount);
    setFinalAmount(total);
    setLoading(true);
    try {
      const res = await fetch(`https://api.jkt48connect.my.id/api/orkut/createpayment?amount=${total}&qris=00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214149391352933240303UMI51440014ID.CO.QRIS.WWW0215ID20233077025890303UMI5204541153033605802ID5919VALZSTORE%20OK14535636006SERANG61054211162070703A016304DCD2&api_key=JKTCONNECT`);
      const data = await res.json();
      setQrImage(data.qrImageUrl);
      setPaymentKey(data.dynamicQRIS);
      setStatus("Menunggu pembayaran...");
      showNotification("QR Pembayaran Siap", "Silakan scan QR untuk menyelesaikan pembayaran.");
    } catch (err) {
      setStatus("");
    }
    setLoading(false);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (paymentKey && finalAmount > 0 && team?.id) {
      interval = setInterval(async () => {
        const cek = await fetch(`https://api.jkt48connect.my.id/api/orkut/cekstatus?merchant=OK1453563&keyorkut=584312217038625421453563OKCT6AF928C85E124621785168CD18A9B693&amount=${finalAmount}&api_key=JKTCONNECT`);
        const result = await cek.json();
        if (result.status === "success" && result.data.length > 0) {
          setStatus("Pembayaran berhasil!");
          setQrImage("");
          setSuccessMessage("Saldo berhasil ditambahkan!");
          showNotification("Sukses", "Pembayaran kamu telah berhasil dikonfirmasi.");
          clearInterval(interval);

          // Tambah saldo ke pengguna
          if (team?.id) {
            await fetch(`https://api.jkt48connect.my.id/api/auth/add-saldo?team_id=${encodeURIComponent(team.id)}&amount=${amount}`);
          }
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [paymentKey, finalAmount, team?.id]);

  return (
    <div className="flex justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Top Up Saldo</CardTitle>
          <CardDescription>Gunakan metode pembayaran QRIS (DANA, OVO, dll).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="amount">Nominal (tanpa fee)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Masukkan nominal"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <Button onClick={handleTopUp} disabled={loading || amount <= 0}>
            {loading ? "Memproses..." : "Buat QR Pembayaran"}
          </Button>
          {finalAmount > 0 && (
            <p className="text-sm text-muted-foreground">
              Total yang dibayar (termasuk fee): <strong>Rp {finalAmount}</strong>
            </p>
          )}
          {qrImage && (
            <div className="text-center">
              <img src={qrImage} alt="QRIS Payment" className="mx-auto rounded w-52 h-52 object-contain" />
              <p className="text-xs text-muted-foreground mt-2">Scan QR dengan aplikasi e-wallet kamu</p>
            </div>
          )}
          {successMessage && <p className="text-green-600 font-semibold text-center">{successMessage}</p>}
          {status && !successMessage && <Badge>{status}</Badge>}
        </CardContent>
      </Card>
    </div>
  );
}
