import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import { FlowProvider } from './contexts/FlowContext';
import TodoProvider  from "./contexts/TodoContext"

function App() {
  return (
    <TodoProvider>
      <FlowProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </FlowProvider>
    </TodoProvider>
    
  );
}

export default App;
