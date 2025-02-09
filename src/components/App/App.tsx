import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppContainer } from '../../containers/AppContainer/AppContainer';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer />
    </QueryClientProvider>
  );
};

export default App;
