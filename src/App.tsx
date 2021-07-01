import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNav from './components/MyNav'
import Home from './components/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Reservations from './components/Reservations'
import Menu from './components/Menu'

function App() {
  return (
    <div>
      <Router>
        <MyNav title="Strivestaurant" />
        <Route exact path="/" render={(routerProps) => <Home {...routerProps} title="Strivestaurant" />} />
        <Route path="/reservations" component={Reservations} />
        <Route path="/menu" component={Menu} />
      </Router>
    </div>
  )
}

export default App
