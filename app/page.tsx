"use client"

import type React from "react"
import { Ticket, Clock, Zap, Wallet, Activity, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function TicketCalculator() {
  const [tickets, setTickets] = useState<string>("")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [nmPoints, setNmPoints] = useState<number>(0)
  const [gold, setGold] = useState<number>(0)
  const [estimation, setEstimation] = useState<{
    seconds: number
    minutes: string
    hours: string
  }>({ seconds: 0, minutes: "0.00", hours: "0.00" })
  const [spendEstimation, setSpendEstimation] = useState<{
    minutes: string
    hours: string
  }>({ minutes: "0.00", hours: "0.00" })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const calculateResults = (value: string) => {
    const ticketCount = Number.parseInt(value) || 0
    const currentNmPoints = ticketCount * 6000
    setNmPoints(currentNmPoints)
    setGold(ticketCount * 1800)

    const totalSeconds = (ticketCount / 50) * 130
    const minutes = (totalSeconds / 60).toFixed(2)
    const hours = (totalSeconds / 3600).toFixed(2)

    setEstimation({
      seconds: Math.round(totalSeconds),
      minutes,
      hours,
    })

    const spendHours = currentNmPoints / 3000000
    const spendMinutes = spendHours * 60

    setSpendEstimation({
      minutes: spendMinutes.toFixed(2),
      hours: spendHours.toFixed(2),
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTickets(value)
    calculateResults(value)
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b-2 border-border px-6 py-5 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground p-2 rounded-md ring-2 ring-primary/20">
            <Activity className="h-5 w-5" />
          </div>
          <span className="font-black tracking-tighter text-2xl uppercase">NM System</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground mr-4">
            <span className="text-foreground border-b-2 border-primary py-4 -mb-4">Calculator</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Analysis</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="rounded-full hover:bg-accent cursor-pointer hover:scale-110 transition-all duration-300"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-36">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase text-balance">
                Ticket
                <br />
                Analysis
              </h1>
              <p className="text-muted-foreground text-xl font-medium max-w-sm">
                Sistem kalkulasi real-time untuk optimalisasi NM Point dan Gold.
              </p>
            </div>

            <div className="space-y-4 p-8 rounded-3xl border-4 border-primary bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)]">
              <Label
                htmlFor="tickets"
                className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-2 block"
              >
                Step 1: Input Jumlah Tiket
              </Label>
              <div className="relative group">
                <Input
                  id="tickets"
                  type="number"
                  placeholder="0"
                  value={tickets}
                  onChange={handleInputChange}
                  className="h-24 bg-background border-2 border-border group-focus-within:border-primary text-5xl font-mono font-bold pl-20 rounded-2xl transition-all placeholder:text-muted-foreground/20 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-inner"
                />
                <Ticket className="absolute left-7 top-1/2 -translate-y-1/2 h-8 w-8 text-primary transition-transform group-focus-within:scale-110" />
              </div>
              <p className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase text-right pt-2">
                *Input required to start analysis
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground">Point Rate</p>
                <p className="text-2xl font-mono font-bold border-l-4 border-blue-500 pl-4">1:6.000</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground">Gold Rate</p>
                <p className="text-2xl font-mono font-bold border-l-4 border-amber-500 pl-4">1:1.800</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visualizations */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card border-2 border-border overflow-hidden group">
                <div className="h-1.5 w-full bg-blue-500"></div>
                <CardHeader className="p-8 pb-0 flex flex-row items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">NM Point Result</span>
                  <Activity className="h-5 w-5 text-blue-500 group-hover:scale-125 transition-transform" />
                </CardHeader>
                <CardContent className="p-8 pt-4">
                  <div className="text-2xl sm:text-3xl xl:text-4xl font-mono font-black tracking-tighter tabular-nums">
                    {nmPoints.toLocaleString("id-ID")}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-2 border-border overflow-hidden group">
                <div className="h-1.5 w-full bg-amber-500"></div>
                <CardHeader className="p-8 pb-0 flex flex-row items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-500">Gold Result</span>
                  <Wallet className="h-5 w-5 text-amber-500 group-hover:scale-125 transition-transform" />
                </CardHeader>
                <CardContent className="p-8 pt-4">
                  <div className="text-2xl sm:text-3xl xl:text-4xl font-mono font-black tracking-tighter tabular-nums">
                    {gold.toLocaleString("id-ID")}
                  </div>
                </CardContent>
              </Card>

              <div className="md:col-span-2 mt-4 space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground px-2 flex items-center gap-4">
                  Analisis Waktu
                  <div className="h-px bg-border flex-1"></div>
                </h3>

                <div className="space-y-6">
                  <Card className="bg-card border-2 border-border shadow-sm">
                    <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                          <Clock className="h-5 w-5" />
                          <span className="text-sm font-bold uppercase tracking-widest">Waktu Mendapatkan</span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs">
                          Dihitung berdasarkan 50 tiket per 130 detik
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-8 md:gap-16">
                        <TimeMetric
                          label="Detik"
                          value={estimation.seconds}
                          color="text-emerald-600 dark:text-emerald-400"
                        />
                        <TimeMetric
                          label="Menit"
                          value={estimation.minutes}
                          color="text-emerald-600 dark:text-emerald-400"
                        />
                        <TimeMetric
                          label="Jam"
                          value={estimation.hours}
                          color="text-emerald-600 dark:text-emerald-400"
                        />
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-card border-2 border-border shadow-sm">
                    <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                          <Zap className="h-5 w-5" />
                          <span className="text-sm font-bold uppercase tracking-widest">Waktu Menghabiskan</span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs">
                          Dihitung berdasarkan 3.000.000 poin per jam
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-8 md:gap-16">
                        <TimeMetric
                          label="Menit"
                          value={spendEstimation.minutes}
                          color="text-purple-600 dark:text-purple-400"
                        />
                        <TimeMetric
                          label="Jam"
                          value={spendEstimation.hours}
                          color="text-purple-600 dark:text-purple-400"
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <footer className="mt-12 flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-[0.4em] pt-8 border-t border-border">
              <span>Real-time Calculation</span>
              <span>v1.3.0 Optimized</span>
            </footer>
          </div>
        </div>
      </main>
    </div>
  )
}

function TimeMetric({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="text-center md:text-left space-y-2">
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black">{label}</p>
      <p className={`text-2xl sm:text-3xl md:text-4xl font-mono font-black tracking-tighter tabular-nums ${color}`}>
        {value}
      </p>
    </div>
  )
}
