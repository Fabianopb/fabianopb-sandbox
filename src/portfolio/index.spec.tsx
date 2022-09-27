import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
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

const queryClient = new QueryClient();

const wrapper = ({ children }: { children?: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>{children}</QueryParamProvider>
    </MemoryRouter>
  </QueryClientProvider>
);

describe('PortfolioView()', () => {
  it('renders the index', () => {
    const { getByText } = render(<PortfolioView />, { wrapper });
    expect(getByText("Hey, I'm Fabiano!")).toBeInTheDocument();
  });
});
