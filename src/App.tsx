import { useState } from "react";
import data from "./data.json";
import "./App.css";
import SortableTable from "./components/SortableTable";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <SortableTable data={data} />
    </div>
  );
}

export default App;
