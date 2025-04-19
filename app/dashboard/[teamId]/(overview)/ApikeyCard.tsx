'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@stackframe/stack'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'

export function ApiKeyCard() {
  const params = useParams<{ teamId: string }>()
  const user = useUser({ or: 'redirect' })
  const team = user.useTeam(params.teamId)

  const [apiKey, setApiKey] = useState<string | null>(null)
  const [showApiKey, setShowApiKey] = useState(false)

  const toggleApiKeyVisibility = () => setShowApiKey(!showApiKey)

  useEffect(() => {
    if (!team?.id) return

    const fetchApiKey = async () => {
      try {
        const res = await fetch(`https://backend.jkt48connect.my.id/api/auth/get-user?team_id=${team.id}`)
        const data = await res.json()
        setApiKey(data?.user?.apikey ?? null)
      } catch (err) {
        console.error('Gagal ambil API Key:', err)
        setApiKey(null)
      }
    }

    fetchApiKey()
  }, [team?.id])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>API Key Anda</CardTitle>
        {apiKey && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleApiKeyVisibility}
          >
            {showApiKey ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-lg font-mono break-all">
          {apiKey === null
            ? 'Tidak ditemukan'
            : showApiKey
            ? apiKey
            : '•'.repeat(apiKey.length)}
        </div>
      </CardContent>
    </Card>
  )
}
