import React, {useState} from 'react';
import MyButton from "./UI/button/MyButton";
import {useMatch, useNavigate} from "react-router-dom";
const PostItem = (props) => {
    const [post, setPost] = useState();
    const router = useNavigate();

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btn">
                <MyButton onClick={() => {
                    router('/posts/'+ props.post.id)
                }}>Открыть</MyButton>

                <MyButton onClick={() => {
                    props.remove(props.post)
                }}>Удалить</MyButton>

            </div>
        </div>
    );
};

export default PostItem;