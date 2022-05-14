import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import { FlowProvider } from './contexts/FlowContext';

function App() {
  return (
    <FlowProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </FlowProvider>
    
  );
}

export default App;
