import { useEffect, useState } from 'react'
import { fetchRegistrations } from '../api/registrationsApi'
import KpiCards from '../components/KpiCards'
import Pagination from '../components/Pagination'
import RegistrationFilters from '../components/RegistrationFilters'
import RegistrationTable from '../components/RegistrationTable'
import { useDebounce } from '../hooks/useDebounce'

const PAGE_SIZE = 5

const emptyKpis = {
  totalRegistration: 0,
  totalPayments: 0,
  uncollectedPayments: 0,
  confirmed: 0,
  checkedIn: 0,
}

export default function RegistrationsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [page, setPage] = useState(1)
  const [registrations, setRegistrations] = useState({
    items: [],
    totalCount: 0,
    kpis: emptyKpis,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    let active = true

    fetchRegistrations({
      search: debouncedSearch,
      status,
      page,
      pageSize: PAGE_SIZE,
    })
      .then((result) => {
        if (active) {
          setRegistrations(result)
          setError('')
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Unable to load registrations.',
          )
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [debouncedSearch, status, page])

  const updateSearch = (value) => {
    setSearch(value)
    setPage(1)
    setLoading(true)
  }

  const updateStatus = (value) => {
    setStatus(value)
    setPage(1)
    setLoading(true)
  }

  const updatePage = (value) => {
    setPage(value)
    setLoading(true)
  }

  return (
    <main className="registrations-page">
      <header className="registrations-header">
        <h1>Registrations</h1>
        <p>Manage event registrations, payments, and check-ins.</p>
      </header>

      <KpiCards kpis={registrations.kpis ?? emptyKpis} />

      <section className="registrations-list" aria-label="Registration list">
        <RegistrationFilters
          search={search}
          onSearchChange={updateSearch}
          status={status}
          onStatusChange={updateStatus}
        />

        {error && (
          <p role="alert" className="registrations-error">
            Failed to load registrations: {error}
          </p>
        )}

        <RegistrationTable
          items={registrations.items ?? []}
          loading={loading}
        />

        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          totalCount={registrations.totalCount ?? 0}
          onPageChange={updatePage}
        />
      </section>
    </main>
  )
}
