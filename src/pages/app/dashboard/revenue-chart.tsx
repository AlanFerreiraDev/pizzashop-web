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

import { useTheme } from '@/components/theme/theme-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  {
    date: '10/12',
    revenue: 4000,
  },
  {
    date: '11/12',
    revenue: 200,
  },
  {
    date: '12/12',
    revenue: 900,
  },
  {
    date: '13/12',
    revenue: 3000,
  },
  {
    date: '14/12',
    revenue: 2050,
  },
  {
    date: '15/12',
    revenue: 100,
  },
  {
    date: '16/12',
    revenue: 300,
  },
]

export function RevenueChart() {
  const { theme } = useTheme()

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardTitle>Receita diária no período</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <Tooltip
              contentStyle={{
                backgroundColor: colors.transparent[900],
                color: theme === 'dark' ? colors.white : colors.zinc[900],
                border: 'none',
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
              dataKey="revenue"
              stroke={colors.rose[600]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
