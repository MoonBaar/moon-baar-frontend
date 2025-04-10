import './App.css';
import Map from './pages/Map';
import {Route, Routes} from 'react-router-dom';
import Event from './pages/Event';
import {ThemeProvider} from 'styled-components';
import {theme} from '@/styles/themes/theme';
import GlobalStyle from '@/styles/GlobalStyle';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <main>
        <Routes>
          <Route path='/' element={<Map />} />
          <Route path='/event' element={<Event />} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}

export default App;
