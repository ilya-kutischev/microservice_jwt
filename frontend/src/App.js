import "./styles/style.css"
import {useState} from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

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

    const [selectedsort, setSelectedSort] = useState("")

    const getSortedPosts  = () => {
        console.log("ASD")
        if (selectedsort) {
            return [...posts].sort((p1, p2) => p1[selectedsort].localeCompare(p2[selectedsort]))
        }
        return posts
    }

    const sortedPosts = getSortedPosts()

    const sortPosts = (sort) => {
        setSelectedSort(sort)
    }

    const [searchquery, setSearchQuery] = useState("")

    return (
        <div className="App">
            <PostForm create={createPost}/>
            <div>
                <MyInput
                    value={searchquery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Поиск"
                />
                <MySelect
                    value={selectedsort}
                    onChange={sortPosts}
                    defaultValue="Сортировка"
                    options={[
                        {value: "title", name: "По названию"},
                        {value: "text", name: "По описанию"}

                    ]}
                />
            </div>

            {posts.length
                ? <PostList posts={sortedPosts} title={"Посты про кайф"} remove={removePost}/>
                : <h1 style={{textAlign: "center"}}>Постов нет</h1>
            }
        </div>
    );
}

export default App;
