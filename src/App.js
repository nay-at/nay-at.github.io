import React from 'react';
import './App.css';

class MenuClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuState: this.props.names[0], // Initialize with the first name
    };
  }

  changeMenuState(state) {
    this.setState({ menuState: state });
    if (this.props.onMenuChange) {
      this.props.onMenuChange(state); // Notify parent component about the change
    }
  }

  render() {
    return (
      <div id="menu">
        {this.props.names.map((item, index) => (
          <div
            className="menu"
            onClick={() => this.changeMenuState(item)}
            key={index}
          >
            {item}
          </div>
        ))}
      </div>
    );
  }
}

MenuClass.defaultProps = {
  names: ['whoami', 'academics', 'skills', 'projects', 'contact'], // Default menu names
};

function App() {
  const [currentMenu, setCurrentMenu] = React.useState('whoami'); // Initialize with the first menu item

  // Handler to update state when the menu changes
  const handleMenuChange = (menu) => {
    setCurrentMenu(menu);
  };

  // Unified function to get content for both header and bottom
  const getContent = () => {
    switch (currentMenu) {
      case 'whoami':
        return {
          header: <div>This is the Who Am I section.</div>,
          bottom: <div>Details about Who Am I.</div>,
        };
      case 'academics':
        return {
          header: <div>This is the Academics section.</div>,
          bottom: <div>Details about Academics.</div>,
        };
      case 'skills':
        return {
          header: <div>This is the Skills section.</div>,
          bottom: <div>Details about Skills.</div>,
        };
      case 'projects':
        return {
          header: <div>This is the Projects section.</div>,
          bottom: <div>Details about Projects.</div>,
        };
      case 'contact':
        return {
          header: <div>This is the Contact section.</div>,
          bottom: <div>Details about Contact.</div>,
        };
      default:
        return {
          header: <div>Welcome! Please select a menu item.</div>,
          bottom: <div>Additional information will be displayed here.</div>,
        };
    }
  };

  // Extract content for header and bottom
  const { header, bottom } = getContent();

  return (
    <div className="App">
      <main id="main">
        <div id="window">
          <div className="container-window">
            <div id="window-title">Tanya.exe</div>
            <div className="container-window-icon">
              <div className="btn"></div>
              <div className="btn"></div>
              <div className="btn"></div>
            </div>
          </div>

          {/* Pass handleMenuChange to MenuClass */}
          <MenuClass onMenuChange={handleMenuChange} />
        </div>

        <div id="content-container">
          <div className="content" id="content-top">
            <header className="App-header">
              <p>Welcome to Tanya.exe!</p>
              {header}
            </header>
          </div>
          <div className="content" id="content-bottom">
            {bottom}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
