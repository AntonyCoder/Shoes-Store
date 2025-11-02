import DesctopRouter from '@/routes/DesctopRouter';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <DesctopRouter />
    </Provider>
  );
}

export default App;
