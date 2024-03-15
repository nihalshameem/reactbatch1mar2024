import logo from './logo.svg';
import './App.css';
import {Component, useEffect, useState} from "react";
import Logo from './components/Logo/Logo'
import Banner from './components/Banner/Banner'
import LoginForm from './components/LoginForm/LoginForm'
function App() {
//react hook -- state initialization
  const[currentTime,setCurrentTime]=useState(new Date())
 //react hook - react effect
    useEffect(()=>{
        setInterval(()=>{
            setCurrentTime(new Date())
        },1000)
    },[currentTime]);


  return (
      <div className="App">
          <header className="App-header">
              <Logo/>
              <h1 className="multicolortext">Customer Portal</h1>
              <h4>{currentTime.toLocaleTimeString()}</h4>
          </header>
          <section className="Form-header">
              <Banner/>
              <LoginForm/>
          </section>
      </div>
  );
}

export default App;

/*
export class App extends Component{
    constructor(props, context) {
        super(props, context);
        this.state={
            currentTime:new Date()
        }
    }

    timerEvent=()=>{
        this.setState({
            currentTime:new Date()
        })
    }


    componentDidMount() {
        //super.componentDidMount();
        setInterval(this.timerEvent,1000);

    }

    render() {
       return(
           <div className="App">
               <header className="App-header">
               <Logo/>
               <h1 className="multicolortext">Customer Portal</h1>
               <h4>{this.state.currentTime.toLocaleTimeString()}</h4>
               </header>
           </div>
       );
    }
}
*/