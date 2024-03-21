import Footer from "./components/ui/Footer";
import Navbar from "./components/ui/Navbar";
import { Route,Routes } from "react-router-dom";
import Home from "./page/Home";
import AllBook from "./page/AllBook";
import NotFound from "./page/NotFound";
import Login from "./page/Login";
import Signup from "./page/Signup";
import { useAppDispatch } from "./redux/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { setLoading, setUser } from "./redux/features/userSlice";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(setLoading(true))
    onAuthStateChanged(auth,(user)=>{
      if(user){
        dispatch(setUser(user.email))
        dispatch(setLoading(false))
      }else{
        dispatch(setLoading(false))
      }
    })
  },[dispatch])
  
  return (
    <>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/allbook" element={<AllBook/>} />
            <Route path="/signin" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/*" element={<NotFound/>} />
          </Routes>
        </main>
        <footer>
          <Footer/>
        </footer>
    </>
  );
};

export default App;
