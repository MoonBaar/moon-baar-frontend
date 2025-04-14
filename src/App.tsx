import {Route, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {theme} from '@/styles/themes/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import Home from '@/pages/Home';
import Event from '@/pages/Event';
import Badge from '@/pages/Badge';
import Detail from '@/pages/Detail';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/event' element={<Event />} />
        <Route path='/event/:id' element={<Detail />} />
        <Route path='/badge' element={<Badge />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
