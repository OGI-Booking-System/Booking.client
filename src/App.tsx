import { Provider } from 'react-redux';
import { store } from './redux/store';
import Router from './app/navigation/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}

export default App;
