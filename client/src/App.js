import './css/App.css';
import Main from './pages/Main';
//Testing
import { useQuery } from '@apollo/client';
import { USERS, GET_TASKS } from './queries/query';

const App = () => {
  //testing

  const {
    data,
    loading,
    error
  } = useQuery(GET_TASKS, {
    variables: {
      id: "6199c941f960672c57219274"
    }
  });

  
  if (!loading && data){
    console.log(data.getTasks[0].taskName)
  }
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
