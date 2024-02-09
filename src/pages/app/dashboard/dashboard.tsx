import { Helmet } from 'react-helmet-async'

import { DayOrdersAmuountCard } from './day-orders-amount-card'
import { MonthCanceledOrdersAmuountCard } from './month-canceled-orders-amount'
import { MonthOrdersAmuountCard } from './month-orders-amount-card'
import { MonthRevenueCard } from './month-revenue-card'
import { PopularProductsChart } from './popular-products-chart'
import { RevenueChart } from './revenue-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmuountCard />
          <DayOrdersAmuountCard />
          <MonthCanceledOrdersAmuountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  )
}
