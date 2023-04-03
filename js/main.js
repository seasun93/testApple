//즉시 호출 함수
(()=>{
    let yOffset = 0; // pageYOffset 변수
    let prevScrollHeight = 0; //현재 스크롤 위치 이전 섹션들의 높이 합
    let currentScene  = 0; //현재 활성화된 scoll-section 번호
    let enterNewScene = false; // 새로운 scene이 시작되는 순간 false
    const sceneInfo = [ //애니메이션 정보
        {
            //0
            type : 'sticky',
            heightNum : 5, //브라우저 높이의 5배로 scrollHeight 셋팅하겠다.
            scrollHeight : 0,
            objs:{
                container : document.querySelector('#scroll-section-0'),
                massageA : document.querySelector('#scroll-section-0 .main-message.main-a'),
                massageB : document.querySelector('#scroll-section-0 .main-message.main-b'),
                massageC : document.querySelector('#scroll-section-0 .main-message.main-c'),
                massageD : document.querySelector('#scroll-section-0 .main-message.main-d'),
                canvas : document.querySelector('#video-canvas-0'),
                context : document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages : [],
            },
            values:{
                messageA_opacity_in : [0, 1, {start : 0.1, end : 0.2}],
                messageA_opacity_out : [1, 0, {start : 0.25, end : 0.3}],
                messageA_translateY_in : [20, 0, {start : 0.1, end : 0.2}],
                messageA_translateY_out : [0, -20, {start : 0.25, end : 0.3}],

                messageB_opacity_in : [0, 1, {start : 0.3, end : 0.4}],
                messageB_opacity_out : [1, 0, {start : 0.45, end : 0.5}],
                messageB_translateY_in : [20, 0, {start : 0.3, end : 0.4}],
                messageB_translateY_out : [0, -20, {start : 0.45, end : 0.5}],

                messageC_opacity_in : [0, 1, {start : 0.5, end : 0.6}],
                messageC_opacity_out : [1, 0, {start : 0.65, end : 0.7}],
                messageC_translateY_in : [20, 0, {start : 0.5, end : 0.6}],
                messageC_translateY_out : [1, 0, {start : 0.65, end : 0.7}],

                messageD_opacity_in : [0, 1, {start : 0.7, end : 0.8}],
                messageD_opacity_out : [1, 0, {start : 0.85, end : 0.9}],
                messageD_translateY_in : [20, 0, {start : 0.7, end : 0.8}],
                messageD_translateY_out : [0, -20, {start : 0.85, end : 0.9}],

                //이미지 갯수와, 순서 등을 설정
                videoImageCount : 300,
                imageSequence : [0,299],
                canvas_opacity: [1,0, {start:0.9, end : 1}],
            }
        },
        {
            //1
            type : 'normal',
            //heightNum : 5, // 노말의 경우에는 높이값이 default값이 들어가기때문에 설정에서 제외
            scrollHeight : 0,
            objs:{
                container : document.querySelector('#scroll-section-1'),
                content : document.querySelector('#scroll-section-1 .description'),
            },
        },
        {
            //2
            type : 'sticky',
            heightNum : 5, //브라우저 높이의 5배로 scrollHeight 셋팅하겠다.
            scrollHeight : 0,
            objs:{
                container : document.querySelector('#scroll-section-2'),
                massageA : document.querySelector('#scroll-section-2 .main-message.main-a'),
                massageB : document.querySelector('#scroll-section-2 .desc-message.main-b'),
                massageC : document.querySelector('#scroll-section-2 .desc-message.main-c'),
                massageB_pin : document.querySelector('#scroll-section-2 .desc-message.main-b .pin'),
                massageC_pin : document.querySelector('#scroll-section-2 .desc-message.main-c .pin'),
                canvas : document.querySelector('#video-canvas-1'),
                context : document.querySelector('#video-canvas-1').getContext('2d'),
                videoImages : [],
            },
            values: {
                messageA_opacity_in : [0,1,{start:0.15, end: 0.2}],
                messageA_translateY_in : [20,0,{start:0.15, end: 0.2}],
                messageA_opacity_out : [1,0,{start:0.3, end: 0.35}],
                messageA_translateY_out : [0,-20,{start:0.3, end: 0.35}],

                messageB_opacity_in : [0,1,{start:0.5, end: 0.55}],
                messageB_translateY_in : [30,0,{start:0.5, end: 0.55}],
                messageB_scaleY_in:[0.5,1,{start:0.5, end: 0.55}],
                messageB_opacity_out : [1,0,{start:0.58, end: 0.63}],
                messageB_translateY_out : [0,-30,{start:0.58, end: 0.63}],
                messageB_scaleY_out:[1,0.5,{start:0.58, end: 0.63}],
                
                messageC_opacity_in : [0,1,{start:0.72, end: 0.77}],
                messageC_translateY_in : [30,0,{start:0.72, end: 0.77}],
                messageC_scaleY_in:[0.5,1,{start:0.72, end: 0.77}],
                messageC_opacity_out : [1,0,{start:0.85, end: 0.9}],
                messageC_translateY_out : [0,-30,{start:0.85, end:  0.9}],
                messageC_scaleY_out:[1,0.5,{start:0.85, end: 0.9}],

                videoImageCount : 960, // start 7027
                imageSequence : [0,959],
                canvas_opacity_in : [0,1,{start : 0, end : 0.1}],
                canvas_opacity_out : [1,0,{start : 0.95, end : 1}],
            },
        },
        {
            //3
            type : 'sticky',
            heightNum : 5, //브라우저 높이의 5배로 scrollHeight 셋팅하겠다.
            scrollHeight : 0,
            objs:{
                container : document.querySelector('#scroll-section-3'),
                canvasCaption : document.querySelector('.canvas-caption'),
                canvas : document.querySelector('.image-blend-canvas'),
                context : document.querySelector('.image-blend-canvas').getContext('2d'),
                imagePath : [
                    './images/blend-image-1.jpg',
                    './images/blend-image-2.jpg',
                ],
                images : [],
            },
            values:{
                rect1X : [0, 0, {start:0, end:0}],
                rect2X : [0, 0, {start:0, end:0}],
                blendHeight : [0, 0, {start:0, end:0}],
                canvas_scale : [0, 0, {start:0, end:0}],
                canvasCaption_opacity : [0, 1, {start:0, end:0}],
                canvasCaption_translateY : [20,0,{start:0, end:0}],
                rectStartY : 0,
            },
        },
    ];

    function setCanvasImages(){
        let imgElem ;
        for (let i =0; i<sceneInfo[0].values.videoImageCount; i++){
            imgElem = new Image; // 혹은 document.createElement('img');
            imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }
        let imgElem2 ;
        //console.log(sceneInfo[2].values.videoImageCount)
        for (let i =0; i<sceneInfo[2].values.videoImageCount; i++){
            imgElem2 = new Image; // 혹은 document.createElement('img');
            imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }
        let imgElem3;
        for(let i = 0; i<sceneInfo[3].objs.imagePath.length; i++){
            imgElem3 = new Image;
            imgElem3.src = sceneInfo[3].objs.imagePath[i];
            sceneInfo[3].objs.images.push(imgElem3);
        }
        //console.log(sceneInfo[0].objs.videoImages);
        //console.log(sceneInfo[2].objs.videoImages);
    }
    setCanvasImages()

    function checkMenu(){
        if(yOffset > 44){
            document.body.classList.add('local-nav-sticky');
        } else {
            document.body.classList.remove('local-nav-sticky');
        }
    }
    

    function setLayout() {
        //각 스크롤 섹션의 높이를 셋팅한다
        for(let i = 0; i <sceneInfo.length; i++){
            if(sceneInfo[i].type === 'sticky'){
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; // 윈도우의 전역 객체는 window 생략가능
            } else if(sceneInfo[i].type ==='normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
        //console.log(sceneInfo)
        let totalScrollHeight = 0;
        yOffset = window.pageYOffset;
        for(let i = 0; i<sceneInfo.length; i++){
            totalScrollHeight +=sceneInfo[i].scrollHeight;
            //console.log(i);
            if(totalScrollHeight >= yOffset){
                currentScene = i;
                break;
                
            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);
        const heightRatio = window.innerHeight/1080;
        //console.log(heightRatio)
        sceneInfo[0].objs.canvas.style.transform =  `translate3d(-50%, -50%, 0) scale(${heightRatio}) `;
        sceneInfo[2].objs.canvas.style.transform =  `translate3d(-50%, -50%, 0) scale(${heightRatio}) `;
    }
    function calcValues(values, currentYOffset){
        let rv;
        //스크롤에 따른 비율 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        //분기처리하기 
        if(values.length === 3){
            //start-end 사잉 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
                rv =(currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if(currentYOffset < partScrollStart) {
                rv = values[0];
            } else if (currentYOffset > partScrollEnd) {
                rv = values[1];
            }
        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }
        
        return rv;
    }
    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        switch(currentScene){
            case 0:
                //console.log('0 play');
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence],0,0);
                objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

                if(scrollRatio <= 0.22){
                    objs.massageA.style.opacity = calcValues(values.messageA_opacity_in,currentYOffset);
                    objs.massageA.style.transform = `translate3d(0,${calcValues(values.messageA_translateY_in,currentYOffset)}%,0)`
                } else {
                    objs.massageA.style.opacity = calcValues(values.messageA_opacity_out,currentYOffset);
                    objs.massageA.style.transform = `translate3d(0,${calcValues(values.messageA_translateY_out,currentYOffset)}%,0)`
                }
                if(scrollRatio <= 0.42){
                    objs.massageB.style.opacity = calcValues(values.messageB_opacity_in,currentYOffset)
                    objs.massageB.style.transform = `translate3d(0,${calcValues(values.messageB_translateY_in,currentYOffset)}%,0)`
                } else {
                    objs.massageB.style.opacity = calcValues(values.messageB_opacity_out,currentYOffset)
                    objs.massageB.style.transform = `translate3d(0,${calcValues(values.messageB_translateY_out,currentYOffset)}%,0)`
                }
                if(scrollRatio <= 0.62){
                    objs.massageC.style.opacity = calcValues(values.messageC_opacity_in,currentYOffset)
                    objs.massageC.style.transform = `translate3d(0,${calcValues(values.messageC_translateY_in,currentYOffset)}%,0)`
                } else {
                    objs.massageC.style.opacity = calcValues(values.messageC_opacity_out,currentYOffset)
                    objs.massageC.style.transform = `translate3d(0,${calcValues(values.messageC_translateY_out,currentYOffset)}%,0)`
                }
                if(scrollRatio <= 0.82){
                    objs.massageD.style.opacity = calcValues(values.messageD_opacity_in,currentYOffset)
                    objs.massageD.style.transform = `translate3d(0,${calcValues(values.messageD_translateY_in,currentYOffset)}%,0)`
                } else {
                    objs.massageD.style.opacity = calcValues(values.messageD_opacity_out,currentYOffset)
                    objs.massageD.style.transform = `translate3d(0,${calcValues(values.messageD_translateY_out,currentYOffset)}%,0)`
                }
                //console.log(messageA_opacity_in)
                //calcValues();
                break;
            case 1:
                //console.log('1 play');
                //console.log(currentScene,currentYOffset)
                break;
            case 2:
                let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence2],0,0);

                if(scrollRatio <= 0.5) {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_in,currentYOffset);
                } else {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_out,currentYOffset);
                }

                if(scrollRatio <= 0.25){
                    objs.massageA.style.opacity = calcValues(values.messageA_opacity_in,currentYOffset);
                    objs.massageA.style.transform = `translate3d(0,${calcValues(values.messageA_translateY_in,currentYOffset)}%,0)`
                } else {
                    objs.massageA.style.opacity = calcValues(values.messageA_opacity_out,currentYOffset);
                    objs.massageA.style.transform = `translate3d(0,${calcValues(values.messageA_translateY_out,currentYOffset)}%,0)`
                }
                if(scrollRatio <= 0.57){
                    objs.massageB.style.opacity = calcValues(values.messageB_opacity_in,currentYOffset);
                    objs.massageB.style.transform = `translate3d(0,${calcValues(values.messageB_translateY_in,currentYOffset)}%,0)`
                    objs.massageB_pin.style.transform = `scaleY(${calcValues(values.messageB_scaleY_in,currentYOffset)})`
                } else {
                    objs.massageB.style.opacity = calcValues(values.messageB_opacity_out,currentYOffset);
                    objs.massageB.style.transform = `translate3d(0,${calcValues(values.messageB_translateY_out,currentYOffset)}%,0)`
                    objs.massageB_pin.style.transform = `scaleY(${calcValues(values.messageB_scaleY_out,currentYOffset)})`
                }
                if(scrollRatio <= 0.83){
                    objs.massageC.style.opacity = calcValues(values.messageC_opacity_in,currentYOffset);
                    objs.massageC.style.transform = `translate3d(0,${calcValues(values.messageC_translateY_in,currentYOffset)}%,0)`
                    objs.massageC_pin.style.transform = `scaleY(${calcValues(values.messageC_scaleY_in,currentYOffset)})`
                } else {
                    objs.massageC.style.opacity = calcValues(values.messageC_opacity_out,currentYOffset);
                    objs.massageC.style.transform = `translate3d(0,${calcValues(values.messageC_translateY_out,currentYOffset)}%,0)`
                    objs.massageC_pin.style.transform = `scaleY(${calcValues(values.messageC_scaleY_out,currentYOffset)})`
                }
                //console.log('2 play');

                //3번canvas가 그려지도록(이미지 튀는것 방지) == 미리보기
                if(scrollRatio > 0.9){
                    const objs = sceneInfo[3].objs;
                    const values = sceneInfo[3].values;
                    const widthRatio = document.body.offsetWidth / objs.canvas.width;
                    const heightRatio = window.innerHeight / objs.canvas.height;
                    //console.log(widthRatio, heightRatio)
                    let canvasScaleRatio;
    
                    if(widthRatio <= heightRatio) {
                        canvasScaleRatio = heightRatio;
                        //console.log('heightRatio로 결정');
                    } else {
                        canvasScaleRatio = widthRatio;
                        //console.log('widthRatio로 결정');
                    }
                    objs.canvas.style.transform = `scale(${canvasScaleRatio})`
                    objs.context.fillStyle = 'white';
                    objs.context.drawImage(objs.images[0],0,0);

                    //캔버스 사이즈 구하기/
                    const recalculatedInnerWidth = window.innerWidth / canvasScaleRatio;
                    const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

                    const whiteRectWidth  = recalculatedInnerWidth * 0.15;
                    values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
                    values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                    values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                    values.rect2X[1] = values.rect2X[0] + whiteRectWidth;
                    
                    objs.context.fillRect(parseInt(values.rect1X[0]), 0, parseInt(whiteRectWidth), objs.canvas.height )
                    objs.context.fillRect(parseInt(values.rect2X[0]), 0, parseInt(whiteRectWidth), objs.canvas.height )
                }
                break;
            case 3:
                //console.log('3 play');
                //가로*세로 꽉 차게 하기 위한 계산 셋팅
                let step = 0;
                const widthRatio = document.body.offsetWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;
                //console.log(widthRatio, heightRatio)
                let canvasScaleRatio;

                if(widthRatio <= heightRatio) {
                    canvasScaleRatio = heightRatio;
                    //console.log('heightRatio로 결정');
                } else {
                    canvasScaleRatio = widthRatio;
                    //console.log('widthRatio로 결정');
                }
                objs.canvas.style.transform = `scale(${canvasScaleRatio})`
                objs.context.fillStyle = 'white';
                objs.context.drawImage(objs.images[0],0,0);

                //캔버스 사이즈 구하기/
                const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
                //const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

                if(!values.rectStartY) {
                    //values.rectStartY = objs.canvas.getBoundingClientRect().top
                    values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
                    values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight ;
                    values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight ;
                    values.rect1X[2].end = values.rectStartY / scrollHeight
                    values.rect2X[2].end = values.rectStartY / scrollHeight
                    //console.log(values.rectStartY);
                    //console.log(values.rect1X[2].end);
                }

                const whiteRectWidth  = recalculatedInnerWidth * 0.15;
                values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
                values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                values.rect2X[1] = values.rect2X[0] + whiteRectWidth;
                //objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                //objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height )
                objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height )

            if( scrollRatio < values.rect1X[2].end ) { //캔버스가 브라우저 상단에 닿지 않는 경
                step = 1;
                //console.log('닿기 전')
                objs.canvas.classList.remove('sticky');
            } else {
                step = 2;
                //console.log('닿은 후')
                values.blendHeight[0] = 0; // x
                values.blendHeight[1] = objs.canvas.height; //캔버스의 높이 = ㅛ
                values.blendHeight[2].start = values.rect1X[2].end; //시작타이밍
                values.blendHeight[2].end = values.blendHeight[2].start + 0.2 //끝 타이밍 = 시작 시간 + 내가 원하는 시간

                const blendHeight  = calcValues(values.blendHeight, currentYOffset);

                objs.context.drawImage(
                    objs.images[1],
                    0,
                    objs.canvas.height - blendHeight,
                    objs.canvas.width,
                    blendHeight,
                    0,
                    objs.canvas.height - blendHeight,
                    objs.canvas.width,
                    blendHeight
                )
                objs.canvas.classList.add('sticky');
                objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;

                if(scrollRatio > values.blendHeight[2].end){
                    //console.log('축소시작');
                    values.canvas_scale[0] = canvasScaleRatio;
                    values.canvas_scale[1] = document.body.offsetWidth/( 1.5 * objs.canvas.width);
                    //console.log(`values.canvas_scale[0] + ${values.canvas_scale[0]},  values.canvas_scale[1] + ${values.canvas_scale[1]}`)
                    values.canvas_scale[2].start = values.blendHeight[2].end;
                    values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

                    //적용시키기
                    objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
                    objs.canvas.style.marginTop = `0px`;
                }

                if(scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end  > 0){
                    console.log('스크롤시작');
                    objs.canvas.classList.remove('sticky');
                    objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

                    values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
                    values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;
                    objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
                    
                    values.canvasCaption_translateY[2].start = values.canvas_scale[2].end;
                    values.canvasCaption_translateY[2].end = values.canvasCaption_translateY[2].start + 0.1;
                    objs.canvasCaption.style.transform = `translate3d(0,${calcValues(values.canvasCaption_translateY, currentYOffset)}%,0)`;
                }
            }

                break;
        }
    }
    function scrollLoop(){
        enterNewScene = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }
        if(yOffset < prevScrollHeight){
            enterNewScene = true;
            if(currentScene === 0) return; // 모바일 브라우저 바운스 효과로 scroll이 마이너스가 되는것을 방지하기 위해
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }
        if(enterNewScene) return;
        playAnimation();
        //console.log(prevScrollHeight);
        //console.log(currentScene);
        
    }
    window.addEventListener('scroll',()=>{
        yOffset = window.pageYOffset;
        scrollLoop();
        checkMenu();
    })
    setLayout();
    window.addEventListener('resize',setLayout)
    window.addEventListener('load',()=>{
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0],0,0);
    }) //load대신 DOMContentLoaded로 대체 가능
    //load와 DOMContentLoaded의 차이점 :: load는 전부 로드 됐을 때 함수실행, DOMContentLoaded는 html DOM 구조만 읽었을 때 함수실행, 그래서 load보다 조금 더 빠름(img같은것들은 로드가 안돼도 함수를 실행하기때)
})();