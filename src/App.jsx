import Combobox from './components/Combobox';
import { fruits } from './mock.json';

function App() {
  return <Combobox placeholder='Choose a Fruit' data={fruits} />;
}

export default App;
