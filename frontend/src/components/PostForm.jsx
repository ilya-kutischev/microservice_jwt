import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {

    const [post, setPost] = useState({
        title: "",
        text: ""
    })


    const addNewPost = (e) => {
        e.preventDefault()
        console.log(post)
        const newPost = {...post, id: Date.now()}
        create(newPost)
        setPost({title: "", text: ""})
    }

    return (
        <form>
            <MyInput
                type="text"
                placeholder="Название поста"
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})}
            />

            <MyInput
                type="text"
                placeholder="Описание поста"
                value={post.text}
                onChange={(e) => setPost({...post, text: e.target.value})}
            />
            <MyButton
                onClick={addNewPost}
            >Создать</MyButton>
        </form>
    );
};

export default PostForm;