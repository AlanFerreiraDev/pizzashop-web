import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import { useTheme } from '@/components/theme/theme-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'

// const data = [
//   {
//     date: '10/12',
//     revenue: 4000,
//   },
//   {
//     date: '11/12',
//     revenue: 200,
//   },
//   {
//     date: '12/12',
//     revenue: 900,
//   },
//   {
//     date: '13/12',
//     revenue: 3000,
//   },
//   {
//     date: '14/12',
//     revenue: 2050,
//   },
//   {
//     date: '15/12',
//     revenue: 100,
//   },
//   {
//     date: '16/12',
//     revenue: 300,
//   },
// ]

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })
  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-peirod', dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  })

  const { theme } = useTheme()

  const chartData = useMemo(() => {
    console.log(dailyRevenueInPeriod)
    return dailyRevenueInPeriod?.map((chartItem) => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-col items-center justify-between pb-8 md:flex-row">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardTitle>Receita diária no período</CardTitle>
        </div>

        <div className="flex flex-col items-center gap-3 md:flex-row">
          <Label>Período</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>

      <CardContent>
        {chartData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <Tooltip
                labelFormatter={(value: string) => `Dia: ${value}`}
                contentStyle={{
                  backgroundColor: colors.transparent[900],
                  color: theme === 'dark' ? colors.white : colors.zinc[900],
                  border: 'none',
                }}
                content={({ label, payload }) => {
                  if (!payload || payload.length === 0) return null
                  const value = payload[0].value

                  return (
                    <div>
                      <p
                        style={{
                          color:
                            theme === 'dark'
                              ? colors.rose[500]
                              : colors.rose[700],
                          fontWeight: 900,
                          fontSize: 16,
                        }}
                      >
                        Dia:{' '}
                        <span
                          style={{
                            color:
                              theme === 'dark'
                                ? colors.white
                                : colors.zinc[900],
                            fontWeight: 900,
                            fontSize: 16,
                          }}
                        >
                          {label}
                        </span>
                      </p>

                      <p
                        style={{
                          color:
                            theme === 'dark'
                              ? colors.emerald[500]
                              : colors.emerald[700],
                          fontWeight: 900,
                          fontSize: 16,
                        }}
                      >
                        Receita:{' '}
                        <span
                          style={{
                            color:
                              theme === 'dark'
                                ? colors.white
                                : colors.zinc[900],
                            fontWeight: 900,
                            fontSize: 16,
                          }}
                        >
                          {value?.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                      </p>
                    </div>
                  )
                }}
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                dy={16}
                stroke="#888"
              />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />

              <CartesianGrid vertical={false} className="stroke-muted" />

              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                label={{
                  position: 'top',
                  dy: -10,
                  fill: theme === 'dark' ? colors.white : colors.zinc[900],
                }}
                stroke={colors.rose[600]}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {chartData && chartData.length === 0 && (
          <h1>
            Não existem dados para esse período, tente novamente com outro
            período de datas!
          </h1>
        )}
      </CardContent>
    </Card>
  )
}
