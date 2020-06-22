import './App.css';
import React        from 'react';
import { Title }    from "./components/Title";
import { Info }     from "./components/info";
import { Demo }     from "./components/Demo";

function App() {
  return (
    <div className="App">
      <Title />
      <Info />
      <Demo cipher={'blah'} msg={''}/>
    </div>
  );
}

export default App;
