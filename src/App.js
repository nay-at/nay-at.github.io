import React from 'react';
import './App.css';
import { WhoAmIUp, WhoAmIDown } from './components/WhoAmI'
import { AcademicsUp, AcademicsDown } from './components/Academics'
import { ContactUp, ContactDown } from './components/Contact'
import { ProjectsUp, ProjectsDown } from './components/Projects'
import { SkillsUp, SkillsDown } from './components/Skills'

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
  const [currentMenu, setCurrentMenu] = React.useState(''); // Manage current menu state
  const [currentProject, setCurrentProject] = React.useState(''); // Manage current project state

  // Handler to update state when the menu changes
  const handleMenuChange = (menu) => {
    setCurrentMenu(menu);
  };

  // Handler to update the current project
  const handleProjectChange = (project) => {
    setCurrentProject(project);
  };

  // Unified function to get content for both header and bottom
  const getContent = () => {
    switch (currentMenu) {
      case 'whoami':
        return {
          header: <WhoAmIUp />,
          bottom: <WhoAmIDown />,
        };
      case 'academics':
        return {
          header: <AcademicsUp />,
          bottom: <AcademicsDown />,
        };
      case 'skills':
        return {
          header: <SkillsUp />,
          bottom: <SkillsDown />,
        };
      case 'projects':
        return {
          // Pass currentProject as a prop to ProjectsUp
          header: <ProjectsUp currentProject={currentProject} />,
          // Pass handleProjectChange as a prop to ProjectsDown
          bottom: <ProjectsDown onProjectChange={handleProjectChange} />,
        };
      case 'contact':
        return {
          header: <ContactUp />,
          bottom: <ContactDown />,
        };
      default:
        return {
          header: <div>Welcome to Tanya.exe!</div>,
          bottom: <div>Welcome! Please select a menu item.</div>,
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

          <MenuClass onMenuChange={handleMenuChange} />
        </div>

        <div id="content-container">
          <div className="content" id="content-top">
            <header className="App-header">
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

