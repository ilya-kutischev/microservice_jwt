import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import {PostService} from "../API/PostService";
import {getPageCount, getPagesArray} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/Pagination/Pagination";
import {useEffect, useMemo, useState} from "react";

function Posts() {
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


export const postsLoader = async ({request, params}) => {
    console.log(123)
    return 1;
}
export default Posts;
