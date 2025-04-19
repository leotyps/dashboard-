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
import { useUser } from "@stackframe/stack";
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
    if (!team) {
      setMessage('Tim tidak ditemukan')
      setError(true)
      return
    }

    const key = generateKey()
    setLoading(true)
    setMessage('')
    setError(false)

    console.log('Generating API Key:', key)

    try {
      // Kirim data ke API save-data
      console.log(`Menyimpan data pengguna ke API save-data dengan team_id: ${team.id} dan apikey: ${key}`)
      const saveRes = await fetch(
        `https://backend.jkt48connect.my.id/api/auth/save-data?team_id=${team.id}&apikey=${key}`,
        {
          method: 'POST',
        }
      )

      if (!saveRes.ok) {
        throw new Error('Gagal menyimpan data pengguna')
      }

      const saveData = await saveRes.json()
      console.log('Response save-data:', saveData)
      if (saveData.message !== "User data saved successfully") {
        throw new Error('Data pengguna tidak berhasil disimpan')
      }

      // Kirim data ke API edit-github-apikey
      console.log(`Memperbarui API Key dengan githubToken: ${githubToken} dan apikey: ${key}`)
      const editRes = await fetch(
        `https://backend.jkt48connect.my.id/api/auth/edit-github-apikey?githubToken=${githubToken}&apiKey=${key}`
      )

      if (!editRes.ok) {
        throw new Error('Gagal memperbarui API Key GitHub')
      }

      const editData = await editRes.json()
      console.log('Response edit-github-apikey:', editData)
      if (editData.message !== "API key updated successfully") {
        throw new Error('Gagal memperbarui API Key')
      }

      setApikey(editData.apiKey) // Menyimpan API Key
      setMessage(`Akun berhasil dihubungkan dan API Key dibuat: ${editData.apiKey}`)
      router.refresh()
    } catch (err: any) {
      setError(true)
      setMessage(err.message || 'Terjadi kesalahan dalam proses penghubungan')
      console.error('Error:', err)
    } finally {
      setLoading(false)
      console.log('Proses selesai.')
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
