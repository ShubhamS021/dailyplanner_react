import { render, screen } from '@testing-library/react'
import App from './App'

test('renders basic card message', () => {
    render(<App />)
    const messageElement = screen.getByText(/basic card/i)
    expect(messageElement).toBeInTheDocument()
})
