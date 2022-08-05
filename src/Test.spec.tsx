import { render, screen } from '@testing-library/react';
import Test from './Test';

describe('<Test />', () => {
  test('test renders test', () => {
    render(<Test />);
    expect(screen.getByText('This is a test for a test')).toBeInTheDocument();
  });
});
