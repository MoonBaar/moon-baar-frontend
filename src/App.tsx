import {Route, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {theme} from '@/styles/themes/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import Map from '@/pages/Map';
import Event from '@/pages/Event';
import Badge from '@/pages/Badge';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <main>
        <Routes>
          <Route path='/' element={<Map />} />
          <Route path='/event' element={<Event />} />
          <Route path='/badge' element={<Badge />} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}

export default App;
