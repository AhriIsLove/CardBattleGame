//TitleScene.js 참조
document.write('<script src="/Object/Object.js"></script>');
document.write('<script src="/Scene/TitleScene.js"></script>');
document.write('<script src="/Scene/SelectScene.js"></script>');

//#region 상수 선언부
const MOUSESTATE = {
    NONE: 0,
    CLICK: 1,
}
const BUTTONSTATE = {
    ON: "BLOCK",
    OFF: "NONE",
}
const SCENE = {
    NONE: 0,
    TITLE: 1,
    SELECT: 2,
}
const FONTSIZE = {
    LEVEL1: 1,
    LEVEL2: 2,
    LEVEL3: 3,
    LEVEL4: 4,
}
const CHARACTER = {
    NONE:0,
    SORCERESS:1,
    GARROSH:2,
}
const CANVAS_RATE = 16/9;
//#endregion

//#region 변수 선언부
//캔버스
var m_Canvas = document.getElementById('canvas');
var m_Ctx = m_Canvas.getContext('2d');
//현재 씬 정보
var m_CurrentScene = SCENE.TITLE;

//루프
var m_MainLoop;
//#endregion

//#region 함수 선언부
function Init(){
    //이미지 초기화
    LoadingTitleScene();
    LoadingSelectScene();
    
    //이벤트 추가
    InitEvent();

    //타이틀 씬 시작
    ChangeScene(SCENE.TITLE);
}
function ChangeScene(p_scene){
    //이전 씬 삭제
    switch(m_CurrentScene){
        case SCENE.TITLE:
            ExitTitleScene();
            break;
        case SCENE.SELECT:
            ExitSelectScene();
            break;
        default:
            break;
    }

    //씬 변경
    m_CurrentScene = p_scene;
    
    //현재 씬 초기화
    switch(m_CurrentScene){
        case SCENE.TITLE:
            InitTitleScene(true);
            break;
        case SCENE.SELECT:
            InitSelectScene(true);
            break;
        default:
            break;
    }
}

function MainLoop(){
    //이전 이미지 삭제
    m_Ctx.clearRect(0,0,m_Canvas.width, m_Canvas.height);

    //현재 화면 그리기
    switch(m_CurrentScene)
    {
        //타이틀 씬 그리기
        case SCENE.TITLE:
            DrawTitleScene();
            break;
        case SCENE.SELECT:
            DrawSelectScene();
            break;
        default:
            break;
    }
}
//#endregion

//딜레이
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms))
}

window.onload = function() {
    //초기화
    Init();
    
    //60fps
    m_MainLoop = setInterval(MainLoop, 16)
}
