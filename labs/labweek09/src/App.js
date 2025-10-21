import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react/jsx-runtime';
import StudentID from './components/StudentID';
import StudentName from './components/StudentName';
import CollegeName from './components/CollegeName';

function App() {

  let myStyle = {color: 'lightblue', backgroundColor: 'blue'}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Fragment>
          <h1 style={ {color: 'blue', backgroundColor: 'lightgreen'}}>Welcome to Full Stack Development - I</h1>
          <h2 style={myStyle}>React JS Programming Week09 Lab</h2>
          <StudentID />
          <StudentName />
          <CollegeName />
        </Fragment>

      </header>
    </div>
  );
}

export default App;