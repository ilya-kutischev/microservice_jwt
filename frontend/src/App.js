import "./styles/style.css"
import {useState, useMemo} from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "Python", text: "кайф"},
        {id: 2, title: "PHP", text: "кайф"},
        {id: 3, title: "Go", text: "кайф"}
    ])

    const [filter, setFilter] = useState({sort: "", query: ""})

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }


    const sortedPosts = useMemo(e => {
        console.log("ASD")
        if (filter.sort) {
            return [...posts].sort((p1, p2) => p1[filter.sort].localeCompare(p2[filter.sort]))
        }
        return posts
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(e => {
        console.log("qwe")
        return sortedPosts.filter(post =>
            post.title.toLowerCase().includes(filter.query.toLowerCase()))


    }, [filter.query, sortedPosts])


    return (
        <div className="App">
            <PostForm create={createPost}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <PostList posts={sortedAndSearchedPosts} title={"Посты про кайф"} remove={removePost}/>
        </div>
    );
}

export default App;
