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

export function ActiveNowCard() {
  const params = useParams<{ teamId: string }>()
  const user = useUser({ or: 'redirect' })
  const team = user.useTeam(params.teamId)

  const [status, setStatus] = useState('Offline') // Default status offline

  useEffect(() => {
    if (!team?.id) return

    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `https://backend.jkt48connect.my.id/api/auth/get-user?team_id=${team.id}`
        )
        const data = await res.json()

        if (data?.user?.team_id) {
          setStatus('Active') // Jika data user ditemukan, set status Active
        } else {
          setStatus('Offline') // Jika tidak ditemukan, set status Offline
        }
      } catch (err) {
        console.error('Error fetching user status:', err)
        setStatus('Offline')
      }
    }

    fetchStatus()
  }, [team?.id])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
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
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold ${
            status === 'Active' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {status}
        </div>
        <p className="text-xs text-muted-foreground">
          {status === 'Active' ? 'Pertahankan status ini!!' : 'Offline'}
        </p>
      </CardContent>
    </Card>
  )
}
