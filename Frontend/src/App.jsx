import Addpost from "./components/Addpost"
import Posts from "./components/Posts"
import {Route,Routes} from "react-router-dom"
import Update from "./components/Update"
import NotFound from "./components/NotFound"
import Header from "./components/Header"
function App() {
  return (<div className="h-screen">
      <Header/>
      <Routes>
        <Route path="/" element={<Posts/>}/>
        <Route path="/addpost" element={<Addpost/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        <Route path="*" element={<NotFound/>}/>
        </Routes>
        </div>
  )
}

export default App;
