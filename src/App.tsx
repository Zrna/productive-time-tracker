import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TimeTracker from './TimeTracker';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TimeTracker />
    </QueryClientProvider>
  );
}

export default App;
