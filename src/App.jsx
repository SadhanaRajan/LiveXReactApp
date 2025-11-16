import Navbar from './components/Navbar.jsx';
import SideMenu from './components/SideMenu.jsx';
import ContentArea from './components/ContentArea.jsx';
import Chatbot from './components/Chatbot.jsx';
import './styles/App.css';

const App = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-main">
        <SideMenu />
        <ContentArea />
      </div>
      <Chatbot />
    </div>
  );
};

export default App;
