import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
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
      <ToastContainer position='top-center' autoClose={2500} draggable />
    </QueryClientProvider>
  );
}

export default App;
