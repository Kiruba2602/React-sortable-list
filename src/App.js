import './App.css';
import { useState } from 'react';
import SortableList from './SortableList';

function App() {
  const [items, setItems] = useState(['Item1','Item2','Item3','Item4','Item5']);
  return (
    <div className="App">
      <h1>SortableList</h1>
      <SortableList items={items} setItems={setItems} />
    </div>
  );
}

export default App;
