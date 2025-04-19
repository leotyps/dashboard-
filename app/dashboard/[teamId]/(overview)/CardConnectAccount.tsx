'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { SelectedTeamSwitcher, useUser } from "@stackframe/stack";
import { useState } from 'react'

const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN as string

export function CardConnectAccount() {
  const params = useParams<{ teamId: string }>()
  const user = useUser({ or: 'redirect' })
  const team = user.useTeam(params.teamId)
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [apikey, setApikey] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const generateKey = () => {
    const prefix = Math.random() < 0.5 ? 'CL' : 'VZ'
    const randomDigits = Math.floor(100000 + Math.random() * 900000).toString()
    return `${prefix}${randomDigits}`
  }

  const handleConnect = async () => {
    const key = generateKey()
    setLoading(true)
    setMessage('')
    setError(false)

    try {
      const saveRes = await fetch(
        `https://backend.jkt48connect.my.id/api/auth/save-data?team_id=${team.id}&apikey=${key}`,
        {
          method: 'POST',
        }
      )

      if (!saveRes.ok) throw new Error('Gagal menyimpan ke database')

      const editRes = await fetch(
        `https://backend.jkt48connect.my.id/api/auth/edit-github-apikey?githubToken=${githubToken}&apiKey=${key}`
      )

      if (!editRes.ok) throw new Error('Gagal update GitHub API Key')

      setApikey(key)
      setMessage('Akun berhasil dihubungkan dan API Key telah dibuat.')
      router.refresh()
    } catch (err: any) {
      setError(true)
      setMessage(err.message || 'Terjadi kesalahan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Account</CardTitle>
        <CardDescription>
          Hubungkan akunmu dan dapatkan API Key otomatis.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-3">
        {apikey && (
          <div className="text-sm">
            <span className="font-medium">API Key:</span> {apikey}
          </div>
        )}
        <Button onClick={handleConnect} disabled={loading}>
          {loading ? 'Connecting...' : 'Connect & Generate API Key'}
        </Button>
        {message && (
          <p className={`text-sm ${error ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
