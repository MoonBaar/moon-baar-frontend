import {Route, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {theme} from '@/styles/themes/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import Home from '@/pages/Home';
import Event from '@/pages/Event';
import Badge from '@/pages/Badge';
import Detail from '@/pages/Detail';
import Statistics from '@/pages/Statistics';
import Login from './pages/Login';
import LoginSuccess from './pages/LoginSuccess';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login-success' element={<LoginSuccess />} />
        <Route path='/event' element={<Event />} />
        <Route path='/event/:id' element={<Detail />} />
        <Route path='/badge' element={<Badge />} />
        <Route path='/statistics' element={<Statistics />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
