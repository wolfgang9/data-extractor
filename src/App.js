import './App.css';
import PdfExtractor from "./PdfExtractor";
import canara from './canaraBank.png';

function App() {
  return (
    <div className='main-container'>
      <div className='main-header-banner'>
        <img src={ canara } className='app-logo' alt='Canara Bank' />
      </div>
      <PdfExtractor />
    </div>
  );
}

export default App;
