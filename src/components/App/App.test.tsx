import { render, screen } from '@testing-library/react'
import App from './App'

test('renders basic setup message', () => {
    render(<App />)
    const messageElement = screen.getByText(/basic setup/i)
    expect(messageElement).toBeInTheDocument()
})
