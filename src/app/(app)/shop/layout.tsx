import { Categories } from '@/components/layout/search/Categories'
import { FilterList } from '@/components/layout/search/filter'
import { sorting } from '@/lib/constants'
import { Search } from '@/components/Search'
import React, { Suspense } from 'react'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className="container pt-10 pb-20">
        <Search className="mb-8" />

        <div className="flex flex-col md:flex-row items-start gap-10">
          <aside className="w-full flex-none flex flex-col gap-6 md:w-48 lg:w-56">
            <Categories />
            <FilterList list={sorting} title="Sort by" />
          </aside>
          <div className="min-h-[50vh] w-full">{children}</div>
        </div>
      </div>
    </Suspense>
  )
}
