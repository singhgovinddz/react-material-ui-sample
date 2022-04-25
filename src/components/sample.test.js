import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react'
import Sample from './sample';

test('loads and display name', async () => {
    render(<Sample name="demo" />)

    screen.getByText(/demo/i)

})