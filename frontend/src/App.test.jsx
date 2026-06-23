import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from './App.jsx'

vi.mock('./components/Map', () => ({ default: () => <div data-testid="Map" /> }))
vi.mock('./components/Chart', () => ({ default: () => <div data-testid="Chart" /> }))
vi.mock('./components/Alert', () => ({ default: () => <div data-testid="Alert" /> }))
vi.mock('./components/TrafficLight', () => ({ default: ({ location }) => <div data-testid="TrafficLight">{location}</div> }))

describe('App', () => {
  it('renders the app heading and congested area name', () => {
    render(<App />)

    expect(screen.getByText(/Smart Traffic Command Center/i)).toBeInTheDocument()
    expect(screen.getByText(/Hoàn Kiếm/i)).toBeInTheDocument()
    expect(screen.getByTestId('Map')).toBeInTheDocument()
    expect(screen.getByTestId('Chart')).toBeInTheDocument()
    expect(screen.getByTestId('Alert')).toBeInTheDocument()
    expect(screen.getByTestId('TrafficLight')).toHaveTextContent('Hoàn Kiếm')
  })
})
