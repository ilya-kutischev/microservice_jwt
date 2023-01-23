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
import {useFetching} from "./hooks/useFetching";
import {getPageCount, getPagesArray} from "./utils/pages";
import Pagination from "./components/UI/Pagination/Pagination";


function App() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort: "", query: ""})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const [fetchPosts, loading, postError] = useFetching(async e => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    const getPages =
        useMemo(() => {
            return getPagesArray(totalPages)
        }, [totalPages])

    useEffect(() => {
        fetchPosts()
    }, [page])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)

    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))

    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: "30px"}} onClick={e => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <PostFilter filter={filter} setFilter={setFilter}/>
            {
                postError && <h1>Произошла ошибка {postError}</h1>
            }
            {loading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}>
                    <Loader/>
                </div>
                : <PostList posts={sortedAndSearchedPosts} title={"Посты про кайф"} remove={removePost}/>
            }
            <Pagination
                page={page}
                totalPages={totalPages}
                changePage={changePage}
                getPages={getPages}
            />
        </div>
    );
}

export default App;
