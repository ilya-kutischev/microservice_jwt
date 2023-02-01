import React, {useEffect, useRef, useState} from 'react';
import classes from "./Canvas.module.css";
import CanvasDraw from "react-canvas-draw";

const Canvas = ({setPicture}) => {
    const canvas = useRef(null)


    function URLToFile() {
        const url = canvas.current.getDataURL(false, false, 'white')
        const filename = 'tmp.png'
        const mimeType = 'image/png'

        fetch(url)
            .then(function (res) {
                return res.arrayBuffer();
            })
            .then(function (buf) {
                return new File([buf], filename, {type: mimeType});
            }).then((data)=> setPicture(data))
    }

    return (
        <div className={classes.wrapper}>
            <CanvasDraw onChange={URLToFile} ref={canvas} canvasWidth={700} hideGrid={true} brushRadius={3} lazyRadius={0} style={{margin: "10px", border: "1px solid black"}}/>
            <div className={classes.btns}>
                <button onClick={(e) => {e.preventDefault(); canvas.current.clear(); setPicture('')}}>Clear</button>
            </div>
        </div>
    );
};

export default Canvas;
