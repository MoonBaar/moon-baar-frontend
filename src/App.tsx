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
import PrivateRoute from './components/common/PrivateRoute';
import VisitedList from './pages/VisitedList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/login-success' element={<LoginSuccess />} />
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/event' element={<Event />} />
          <Route path='/event/:id' element={<Detail />} />
          <Route path='/badge' element={<Badge />} />
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/visited/:range' element={<VisitedList />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
