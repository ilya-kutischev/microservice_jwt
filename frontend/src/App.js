import "./styles/style.css"
import {useState, useMemo, useEffect} from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import {usePosts, useSortedPosts} from "./hooks/usePosts";
import axios from "axios";
import {PostService} from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import useFetching from "./hooks/useFetching";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "Python", body: "кайф"},
        {id: 2, title: "PHP", body: "кайф"},
        {id: 3, title: "Go", body: "кайф"}
    ])

    const [filter, setFilter] = useState({sort: "", query: ""})
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)

    // const [] = useFetching(async () => {
    //     const posts = await PostService.getAll()
    //         setPosts(posts)
    //         setLoading(false)
    // })

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    async function fetchPosts() {
        setLoading(true)
        setTimeout(async e => {
            const posts = await PostService.getAll()
            setPosts(posts)
            setLoading(false)
        },1000)

    }


    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className="App">
            <MyButton style={{marginTop: "30px"}} onClick={e => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <PostFilter filter={filter} setFilter={setFilter}/>
            {loading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}>
                    <Loader/>
                </div>
                : <PostList posts={sortedAndSearchedPosts} title={"Посты про кайф"} remove={removePost}/>
            }
        </div>
    );
}

export default App;
