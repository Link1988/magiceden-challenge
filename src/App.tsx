import { VirtualizedGrid } from './components/VirtualizedGrid';

import './App.css';

function App() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className='container mx-auto main-container'>
        <VirtualizedGrid
          itemMinWidth={300}
        />
      </div>
    </div>
  );
}

export default App;
