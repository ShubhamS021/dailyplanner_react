import { render, screen } from '@testing-library/react'
import { CardComponent } from './Card'

test('renders basic setup message', () => {
    render(<CardComponent />)
    const title = screen.getByText(/card title/i)
    expect(title).toBeInTheDocument()

    const description = screen.getByText(/description/i)
    expect(description).toBeInTheDocument()
})
