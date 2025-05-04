'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { useUser } from "@stackframe/stack"
import { useState, useEffect } from 'react'

export function CardConnectAccount() {
  const params = useParams<{ teamId: string }>()
  const user = useUser({ or: 'redirect' })
  const team = user.useTeam(params.teamId)

  const [loading, setLoading] = useState(false)
  const [isAccountConnected, setIsAccountConnected] = useState(false)

  useEffect(() => {
    // Cek status koneksi akun di API get-user
    const checkAccountStatus = async () => {
      if (!team) return
      try {
        const res = await fetch(
          `https://api.jkt48connect.my.id/api/auth/get-user?team_id=${team.id}`
        )
        const data = await res.json()
        if (data?.user?.team_id) {
          setIsAccountConnected(true) // Akun sudah terhubung
        }
      } catch (error) {
        console.error('Error checking account status:', error)
      }
    }

    checkAccountStatus()
  }, [team])

  const generateKey = () => {
    const prefix = Math.random() < 0.5 ? 'CL' : 'VZ'
    const randomDigits = Math.floor(100000 + Math.random() * 900000).toString()
    return `${prefix}${randomDigits}`
  }

  const handleRedirectToWhatsApp = () => {
    if (!team) return
    setLoading(true)
    const key = generateKey()
    const whatsappUrl = `https://wa.me/6285198360849?text=${encodeURIComponent(`.connect ${team.id}|${key}`)}`
    window.location.href = whatsappUrl
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Account</CardTitle>
        <CardDescription>
          Tekan tombol di bawah ini untuk menghubungkan akun melalui WhatsApp.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-3">
        {isAccountConnected ? (
          <p>Akun sudah terhubung</p>
        ) : (
          <Button onClick={handleRedirectToWhatsApp} disabled={loading}>
            {loading ? 'Redirecting...' : 'Connect & Generate API Key'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
