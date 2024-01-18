import Combobox from 'src/components/Combobox';
import { fruits } from 'src/utils/mock';

function App() {
  return <Combobox placeholder='Choose a Fruit' data={fruits} />;
}

export default App;
