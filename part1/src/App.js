import './App.css';
import Message from './Message';

const Description = () => {
  return <p>This is a <strong>component</strong> description</p>
}

const App = () => {

  return (
    <div className="App">
      <Message color='blue' message='Estamos trabajando!'/>
      <Message color='yellow' message='Espérate wey'/>
      <Description />
    </div>
  );
}

export default App;
