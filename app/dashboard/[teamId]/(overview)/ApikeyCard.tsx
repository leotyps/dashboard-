"use client"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

export function ApiKeyCard() {
  const apiKey = "JKT48CONNECT"
  const [showApiKey, setShowApiKey] = useState(false)

  const toggleApiKeyVisibility = () => setShowApiKey(!showApiKey)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>API Key Anda</CardTitle>
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
      </CardHeader>
      <CardContent>
        <div className="text-lg font-mono break-all">
          {showApiKey ? apiKey : "•".repeat(apiKey.length)}
        </div>
      </CardContent>
    </Card>
  )
}
