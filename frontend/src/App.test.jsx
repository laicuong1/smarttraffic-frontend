import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import App from './App.jsx'

vi.mock('./components/Map', () => ({ default: () => <div data-testid="Map" /> }))
vi.mock('./components/Chart', () => ({ default: () => <div data-testid="Chart" /> }))
vi.mock('./components/Alert', () => ({ default: () => <div data-testid="Alert" /> }))
vi.mock('./components/TrafficLight', () => ({ default: ({ location }) => <div data-testid="TrafficLight">{location}</div> }))

const mockFetch = vi.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
)

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    mockFetch.mockReset()
  })

  it('renders the app heading and congested area name', async () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /Smart Traffic Command Center/i })).toBeInTheDocument()
    expect(screen.getByTestId('Map')).toBeInTheDocument()
    expect(screen.getByTestId('Chart')).toBeInTheDocument()
    expect(screen.getByTestId('Alert')).toBeInTheDocument()
    expect(screen.getByTestId('TrafficLight')).toHaveTextContent('Hoàn Kiếm')

    await waitFor(() => expect(mockFetch).toHaveBeenCalled())
  })
})
