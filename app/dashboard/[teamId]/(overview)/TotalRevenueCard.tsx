'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@stackframe/stack'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function TotalRevenueCard() {
  const params = useParams<{ teamId: string }>()
  const user = useUser({ or: 'redirect' })
  const team = user.useTeam(params.teamId)

  const [saldo, setSaldo] = useState<number | null>(null)

  useEffect(() => {
    if (!team?.id) return

    const fetchSaldo = async () => {
      try {
        const res = await fetch(`https://api.jkt48connect.my.id/api/auth/get-user?team_id=${team.id}`)
        const data = await res.json()
        setSaldo(Number(data?.user?.saldo ?? 0))
      } catch (err) {
        console.error('Gagal ambil saldo:', err)
        setSaldo(0)
      }
    }

    fetchSaldo()
  }, [team?.id])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Saldo Kamu</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {saldo === null ? 'Loading...' : `Rp ${saldo.toLocaleString('id-ID')}`}
        </div>
        <p className="text-xs text-muted-foreground">Saldo terhubung dari akun kamu</p>
      </CardContent>
    </Card>
  )
}
