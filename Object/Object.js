//캔버스내 마우스 좌표
var m_CanvasMouse = {x:0, y:0, state: MOUSESTATE.NONE};
//이미지들
class CImage{
    img = new Image();
    x = 0;
    y = 0;
    w = 0;
    h = 0;
    opacity = 1.0;

    DrawImage(){
        //투명도 설정
        m_Ctx.globalAlpha = this.opacity;

        m_Ctx.drawImage(this.img, 
            m_Canvas.width*this.x, m_Canvas.height*this.y, 
            m_Canvas.width*this.w, m_Canvas.height*this.h);

        //투명도 복구
        m_Ctx.globalAlpha = 1;
    }
}
class CText{
    text = "";
    fontsize = FONTSIZE.LEVEL4;
    color = "magenta";
    align = "center";
    x = 0;
    y = 0;
    width = 0;
    opacity = 1.0;

    DrawText(){
        //투명도 설정
        m_Ctx.globalAlpha = this.opacity;

        //테스트로 텍스트 전시할 박스 먼저 그려보기
        m_Ctx.strokeRect(m_Canvas.width*this.x, m_Canvas.height*this.y, m_Canvas.width*this.width, this.fontsize * (m_Canvas.width/100));
        
        //박스 안에 텍스트 줄바꿔 넣기
        m_Ctx.font = "bold " + this.fontsize * (m_Canvas.width/100)+"px Arial";
        m_Ctx.fillStyle = this.color;
        m_Ctx.lineWidth = 1;
        m_Ctx.textBaseline = "top";
        var line = "";
        var currentY = m_Canvas.height*this.y;
        var drawX;
        for(var i=0; i<this.text.length; i++) {
            var tempLine = line + this.text[i];
            //글자 넓이
            var tempWidth = m_Ctx.measureText(tempLine).width;
            if (tempWidth < m_Canvas.width*this.width && this.text[i] != '\n') {
                line = tempLine;
            }
            else {
                if(this.align == "center")
                {
                    drawX = m_Canvas.width*this.x + (m_Canvas.width*this.width - tempWidth)*0.5;
                }else{
                    drawX = m_Canvas.width*this.x;
                }
                m_Ctx.fillText(line, drawX, currentY);
                if(this.text[i] != '\n') line = this.text[i];
                else line = "";
                currentY += this.fontsize * (m_Canvas.width/100)*1.0;
            }
        }
        if(this.align == "center")
        {
            drawX = m_Canvas.width*this.x + (m_Canvas.width*this.width - tempWidth)*0.5;
        }else{
            drawX = m_Canvas.width*this.x;
        }
        m_Ctx.fillText(line, drawX, currentY);
        
        //투명도 복구
        m_Ctx.globalAlpha = 1;
    }
}
class CSprite{
    img = new Image();
    x = 0;
    y = 0;
    w = 0;
    h = 0;
    opacity = 1.0;
    FrameWidth = 256;
    FrameHeight = 256;
    maxFrame = 0;
    currentFrame = 0;
    frameSpeed = 10;
    speed = 0;
    
    DrawSprite(){
        //투명도 설정
        m_Ctx.globalAlpha = this.opacity;

        m_Ctx.drawImage(this.img, 
            this.currentFrame * this.FrameWidth, 0 * this.FrameHeight,
            this.FrameWidth, this.FrameHeight,
            m_Canvas.width*this.x, m_Canvas.height*this.y, 
            m_Canvas.width*this.w, m_Canvas.height*this.h);

        if(this.speed-- <= 0) 
        {
            this.speed = this.frameSpeed;
            if(++this.currentFrame >= this.maxFrame) this.currentFrame = 0;
        }

        //투명도 복구
        m_Ctx.globalAlpha = 1;
    }
}
class CCharacter{
    id = "";
    name = "";
    healthPoint = 100;
    resourcePoint = 50;

    constructor(p_id, p_name, p_healthPoint, p_resourcePoint){
        this.id = p_id;
        this.name = p_name;
        this.healthPoint = p_healthPoint;
        this.resourcePoint = p_resourcePoint;
    }
}

///캔버스
function InitEvent(){
    //최초 화면 사이즈 조절
    ResizeCanvas();
    //화면 사이즈 조절 이벤트
    window.onresize = ResizeCanvas;

    //마우스 무브 이벤트
    m_Canvas.addEventListener("mousemove", function(e) {
        //마우스 좌표 캔버스 내 좌표로 변환
        m_CanvasMouse = ConvertToCanvasMouse(e.clientX, e.clientY);
    });
}
function ResizeCanvas(){
    //가로 비율이 더 긴 경우
    if(window.innerWidth * 9/16 > window.innerHeight){
        m_Canvas.width = window.innerHeight * 16/9;
        m_Canvas.height = window.innerHeight;
    }
    //세로 비율이 더 긴 경우
    else{
        m_Canvas.width = window.innerWidth;
        m_Canvas.height = window.innerWidth * 9/16;
    }

    //현재 씬에 해당하는 객체 스타일 동기화
    switch(m_CurrentScene){
        case SCENE.TITLE:
            InitTitleScene();
            break;
        case SCENE.SELECT:
            InitSelectScene();
            break;
        default:
            break;
    }
}
function ConvertToCanvasMouse(x, y){
    //캔버스 기준 마우스 좌표 리턴
    return { 
        x: x - m_Canvas.offsetLeft,
        y: y - m_Canvas.offsetTop}
}

///이미지
function SetImage(p_object, p_x, p_y, p_w, p_h, p_opacity){
    p_object.x = p_x;
    p_object.y = p_y;
    p_object.w = p_w;
    p_object.h = p_h;
    p_object.opacity = p_opacity;
}
//이미지 객체 액션
function SlideImage(p_object, p_Count = 10, p_Range = 0.01, callback = null)
{
    //애니메이션 속도
    var speed = p_Range/p_Count;
    //애니메이션 횟수
    var count = 0;

    //애니메이션 전 위치 설정
    p_object.y = p_object.y + p_Range;

    var loop = setInterval(() => {
        p_object.y = p_object.y - speed;
        p_object.opacity = count/p_Count;

        if(count++ >= p_Count){
            clearInterval(loop);
            if(callback != null)
            {
                callback();
            }
        }
    }, 16);
}

///텍스트
function SetText(p_object, p_Text, p_FontSize, p_Color, p_Align, p_x, p_y, p_width, p_opacity){
    p_object.text = p_Text;
    //텍스트만 변경할 경우
    if(p_FontSize == undefined/*NULL*/) return;
    p_object.fontsize = p_FontSize;
    p_object.color = p_Color;
    p_object.align = p_Align;
    p_object.x = p_x;
    p_object.y = p_y;
    p_object.width = p_width;
    p_object.opacity = p_opacity;
}
//텍스트 객체 액션
function SlideText(p_object, p_Count = 10, p_Range = 0.01, callback = null){
    //애니메이션 속도
    var speed = p_Range/p_Count;
    //애니메이션 횟수
    var count = 0;

    //애니메이션 전 위치 설정
    p_object.y = p_object.y + p_Range;

    var loop = setInterval(() => {
        p_object.y = p_object.y - speed;
        p_object.opacity = count/p_Count;

        if(count++ >= p_Count){
            clearInterval(loop);
            if(callback != null)
            {
                callback();
            }
        }
    }, 16);
}

///버튼
function SetButton(p_button, p_able, p_x = 0, p_y = 0, p_w = 0, p_h = 0)
{
    //버튼 상태 설정
    p_button.style.display = p_able;

    if(p_w != 0 && p_h != 0)
    {
        p_button.style.left = m_Canvas.offsetLeft + m_Canvas.width*p_x + "px";
        p_button.style.top = m_Canvas.offsetTop + m_Canvas.height*p_y + "px";
        p_button.style.width = m_Canvas.width*p_w+ "px";
        p_button.style.height = m_Canvas.height*p_h + "px";
    }
}
//버튼 객체 액션
function SlideButton(p_object, p_Count = 10, p_Range = 10.0, callback = null)
{
    //애니메이션 속도
    var speed = p_Range/p_Count;
    //애니메이션 횟수
    var count = 0;

    //목표 위치 설정
    var goalPosition = p_object.style.top;
    goalPosition = goalPosition.replace("px", "");

    //투명도 초기화
    p_object.style.opacity = "0%";
    p_object.style.display = BUTTONSTATE.ON;

    var loop = setInterval(() => {
        p_object.style.top = +(goalPosition) + p_Range + "px";
        p_object.style.opacity = count/p_Count * 100 + "%";

        p_Range = p_Range - speed;
        if(count++ >= p_Count){
            clearInterval(loop);
            if(callback != null)
            {
                callback();
            }
        }
    }, 16);
}

function SetSprite(p_object, p_x, p_y, p_w, p_h, p_opacity, p_maxFrame){
    p_object.x = p_x;
    p_object.y = p_y;
    p_object.w = p_w;
    p_object.h = p_h;
    p_object.opacity = p_opacity;
    p_object.maxFrame = p_maxFrame;
}