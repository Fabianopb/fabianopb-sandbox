import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import PortfolioView from '.';

jest.mock('recharts', () => {
  const OriginalRechartsModule = jest.requireActual('recharts');
  return {
    ...OriginalRechartsModule,
    ResponsiveContainer: ({ height, children }: { height: number; children?: ReactNode }) => (
      <div className="recharts-responsive-container" style={{ width: 800, height }}>
        {children}
      </div>
    ),
  };
});

const wrapper = ({ children }: { children?: ReactNode }) => <MemoryRouter>{children}</MemoryRouter>;

describe('PortfolioView()', () => {
  it('renders the index', () => {
    const { getByText } = render(<PortfolioView />, { wrapper });
    expect(getByText("Hey, I'm Fabiano!")).toBeInTheDocument();
  });
});
