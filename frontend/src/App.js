import React from "react";
import "./styles/style.css"
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
} from "react-router-dom";
import About from "./pages/About";
import Posts, {postsLoader} from "./pages/Posts";
import Error from "./pages/Error";
import Layout from "./components/UI/Layout";
import PostDetail from "./pages/PostDetail";

function App() {

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<Layout/>}>
            <Route path='' element={<Navigate to='/posts' replace/>}/>
            <Route path='posts' element={<Posts/>} loader={postsLoader}/>
            <Route path='posts/:id' element={<PostDetail/>}/>
            <Route path='about' element={<About/>}/>
            <Route path='*' element={<Error/>}/>
        </Route>
    ))

    return (
        <RouterProvider router={router}/>
    )
}

export default App;
