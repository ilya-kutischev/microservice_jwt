import "./styles/style.css"
import {useState} from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";


function App() {
    const [posts,setPosts] = useState([
        {id: 1, title: "Python", text:"кайф"},
        {id: 2, title: "PHP", text:"кайф"},
        {id: 3, title: "Go", text:"кайф"}
    ])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <PostForm create={createPost}/>
            {posts.length
                ? <PostList posts={posts} title={"Посты про кайф"} remove={removePost}/>
                : <h1 style={{textAlign: "center"}}>Постов нет</h1>
            }
        </div>
    );
}

export default App;
