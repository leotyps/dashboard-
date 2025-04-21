"use client";

import { useState, useEffect } from "react";
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
import Image from "next/image";

export default function TopUpPage() {
  const [amount, setAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [qrImage, setQrImage] = useState("");
  const [paymentKey, setPaymentKey] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const calculateFee = (value) => {
    const fee = value * 0.015; // 1.5% fee
    return Math.ceil(value + fee);
  };

  const handleTopUp = async () => {
    const total = calculateFee(amount);
    setFinalAmount(total);
    setLoading(true);
    try {
      const res = await fetch(`https://api.jkt48connect.my.id/api/orkut/createpayment?amount=${total}&qris=00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214149391352933240303UMI51440014ID.CO.QRIS.WWW0215ID20233077025890303UMI5204541153033605802ID5919VALZSTORE%20OK14535636006SERANG61054211162070703A016304DCD2&api_key=JKTCONNECT`);
      const data = await res.json();
      setQrImage(data.qrImageUrl);
      setPaymentKey(data.dynamicQRIS);
      setStatus("Menunggu pembayaran...");
    } catch (err) {
      setStatus("Gagal membuat pembayaran.");
    }
    setLoading(false);
  };

  useEffect(() => {
    let interval;
    if (paymentKey && finalAmount > 0) {
      interval = setInterval(async () => {
        const cek = await fetch(`https://api.jkt48connect.my.id/api/orkut/cekstatus?merchant=OK1453563&keyorkut=584312217038625421453563OKCT6AF928C85E124621785168CD18A9B693&amount=${finalAmount}&api_key=JKTCONNECT`);
        const result = await cek.json();
        if (result.status === "success" && result.data.length > 0) {
          setStatus("Pembayaran berhasil!");
          clearInterval(interval);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [paymentKey, finalAmount]);

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
              <Image src={qrImage} alt="QRIS Payment" width={200} height={200} className="mx-auto rounded" />
              <p className="text-xs text-muted-foreground mt-2">Scan QR dengan aplikasi e-wallet kamu</p>
            </div>
          )}
          {status && <Badge>{status}</Badge>}
        </CardContent>
      </Card>
    </div>
  );
}
