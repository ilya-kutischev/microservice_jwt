import React, {useRef} from 'react';
import classes from "./Canvas.module.css";
import CanvasDraw from "react-canvas-draw";

const Canvas = ({getPicture}) => {
    const canvas = useRef(null)

    function urltoFile(url, filename, mimeType) {
        localStorage.setItem("elephant", url);
        return fetch(url)
            .then(function (res) {
                return res.arrayBuffer();
            })
            .then(function (buf) {
                return new File([buf], filename, {type: mimeType});
            })
    }

    return (
        <div className={classes.wrapper}>
            <CanvasDraw ref={canvas} canvasWidth={700} hideGrid={true} brushRadius={3} lazyRadius={0} style={{margin: "10px", border: "1px solid black"}}/>
            <div className={classes.btns}>
                <button onClick={(e) => {e.preventDefault(); canvas.current.clear()}}>Clear</button>
                <button onClick={(e) => {e.preventDefault(); getPicture(urltoFile(canvas.current.getDataURL(false, false, 'white'), 'tmp.png','image/png'))}}>Save</button>
            </div>
        </div>
    );
};

export default Canvas;
