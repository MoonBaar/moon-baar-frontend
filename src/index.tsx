import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import ScrollToTop from './components/common/ScrollToTop';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const queryClient = new QueryClient();

window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
window.Kakao.isInitialized();

if (process.env.NODE_ENV === 'production') {
  ['log', 'warn', 'error'].forEach(method => {
    (console as any)[method] = () => {
      /* no-op */
    };
  });
}

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);
