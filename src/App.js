import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <main id="main">
        <div id="bars">
          <div id="bar-1">Tanya.exe</div>

          <div id="menu">
            <div class="menu">whoami</div>
            <div class="menu">academics</div>
            <div class="menu">skills</div>
            <div class="menu">projects</div>
            <div class="menu">contact</div>
          </div>
        </div>

        <div id="content-container">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>

      </main>

    </div>
  );
}

export default App;
