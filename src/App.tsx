import './App.css';
import {ThemeProvider} from 'styled-components';
import {theme} from './styles/themes/theme';
import GlobalStyle from './styles/GlobalStyle';
import Map from './pages/Map';
import {Route, Routes} from 'react-router-dom';
import Event from './pages/Event';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Map />} />
        <Route path='/event' element={<Event />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
