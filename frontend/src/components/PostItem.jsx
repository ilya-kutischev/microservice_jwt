import React, {useState} from 'react';
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {
    const [post, setPost] = useState();

    return (
        <div className="post">
          <div className="post__content">
              <strong>{props.number}. {props.post.title}</strong>
              <div>
                  {props.post.text}
              </div>
          </div>
          <div className="post__btn"></div>
            <MyButton onClick={() => {
                props.remove(props.post)
            }}>Удалить</MyButton>
      </div>
    );
};

export default PostItem;