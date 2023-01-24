import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {PostService} from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import '../styles/style.css'
import MyButton from "../components/UI/button/MyButton";
const PostDetail = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })

    const [fetchCommentsById, isCommentLoading, errorComment] = useFetching(async () => {
        const response = await PostService.getCommentsById(id);
        setComments(response.data);
    })


    useEffect(() => {
        fetchPostById();
        fetchCommentsById();
    }, [id])

    return (
        <div className='post__detail'>
            <MyButton onClick={() => navigate(-1)} style={{marginTop: "15px"}}>
                Назад
            </MyButton>
            <div className='post__detail'>
                <h1>Пост {id}</h1>
                <h4>{post.body}</h4>
                {isLoading || isCommentLoading
                    ? <Loader></Loader>
                    // по хорошему надо сделать отдельно компонент Comment
                    : <div>
                        {comments.map( (com) =>
                            <div className='comment' style={{margin: "20px"}}>
                                <h3>{com.email}</h3>
                                <div>{com.body}</div>
                            </div>
                        )}
                    </div>
                }

            </div>

        </div>
    );
};

export default PostDetail;