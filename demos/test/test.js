import { getDiffieHellman } from "crypto";
import download from "download";
import { doesNotMatch } from "assert";

(function() {
    let $box = document.querySelector('#box');
    console.log($box);

    let onDrag = false;
    let startX = 0, startY = 0;
    let width = window.innerWidth, height = window.innerHeight;
    let boxWidth = 40, boxHeight = 40;
    console.log(width, height);

    // [100,100] [140,100] [100,140] [140,140]
    // [x,y] [x+40, y] [x, y+40] [x+40, y+40]

    // x+40 < 100
    // x > 140
    
    // y+40 < 100
    // y+40 > 140

    $box.addEventListener('mousedown', function(e) {
        console.log(e);
        console.log(e.x, e.y);
        onDrag = true;
        startX += e.offsetX;
        startY += e.offsetY;
    });

    document.documentElement.addEventListener('mousemove', function(e) {
        // console.log('mousemove');
        if (onDrag) {
            let { x, y } = e;
            // $box.style.left = x + 'px';
            // $box.style.top = y + 'px';
            let offsetX = x - startX;
            let offsetY = y - startY;

            if (offsetX < 0) {
                offsetX = 0;
            } else if (offsetX + boxWidth > width) {
                console.log('=====x', offsetX, width);
                offsetX = width - boxWidth;
            }
            if (offsetY < 0) {
                offsetY = 0;
            } else if (offsetY + boxHeight > height) {
                console.log('=====y', offsetY, height);
                offsetY = height - boxHeight;
            }
            if ((offsetX >=60 && offsetX <= 140) && (offsetY >= 60 && offsetY <= 140)) {
                console.log('collide');
            }
            let style = `left:${offsetX}px; top:${offsetY}px;`;

            // console.log('mousemove:', style);
            $box.style.cssText = style;
        }
    });

    // document.body.addEventListener('mousemove', function(){
    //     console.log('mousemove body');
    // });

    document.documentElement.addEventListener('mouseup', function(e){
        console.log('mouseup')
        onDrag = false;
        startX = 0;
        startY = 0;
    });

})();


const STATE_INITIAL = 0;
const STATE_START = 1;
const STATE_STOP = 2;
const LOADING = 1;
const LOADED = 2;
const LOAD_FAIL = 0;
const TASK_SYNC = 0;
const TASK_ASYNC = 1;


import LoadImage from 'LoadImage';
class Animation {
    constructor() {
        this.taskQueue = [];
        this.index = 0;
        this.state = STATE_INITIAL;
    }
    loadImage(imgList) {
        let taskFn = function(next) {
            LoadImage(imgList.slice(0), next);
        }

    }
    changePosition(ele, positions, imgUrl) {

    }
    changeSrc(ele, imgList) {

    }
    enterFrame(fn) {

    }
    then(callback) {

    }
    start(interval) {

    }
    repeat(times) {

    }
    repeatForever() {

    }
    wait(time) {

    }
    pause() {

    }
    restart() {

    }
    dispose() {

    }
}

class LoadImage {
    constructor(images, callback, timeout) {
        this.count = 0;
        this.success = false;
        this.timeoutId;
        this.isTimeout = false;
        this.callback = callback;
        this.timeout = timeout;

        for (let key in images) {
            if (!images.hasOwnProperty(key)) {
                continue;
            }
            let item = images[key];
            if (typeof item === 'string') {
                item = images[key] = {
                    src: item
                }
            }
            if (!item || !item.src) {
                continue;
            }
            this.count++;
            item.id = '__img__'+ key + this.getID();
            item.img = window[item.id] = new Image();
            doLoad(item)
        }
        if (!count) {
            this.callback(this.success);
        } else if (timeout) {
            timeoutId = setTimeout(onTimeout, this.timeout);
        }
    }
    onTimeout() {
        this.isTimeout = true;
        this.callback(this.isTimeout);
    }
    getID() {
        return this.count;
    }
    doLoad(item) {
        item.status = LOADING;
        let img = item.img;
        img.onload = function() {
            this.success = this.success & true;
            item.status = LOADED;
            done(item);
        }
        img.onerror = function() {
            this.success = false;
            item.status = LOAD_FAIL;
            done(item);
        }
        img.src = item.src;
    }
    done(item) {
        item.img.onload = item.img.onerror = null;
        try {
            delete window[item.id]
        } catch (e) {

        }
        if (!--this.count) {
            clearTimeout(this.timeoutId);
            this.callback(this.success);
        }
    }
}

export default LoadImage;