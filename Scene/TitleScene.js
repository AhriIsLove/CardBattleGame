//#region 객체 선언부
var m_BackgroundImg = new CImage();
var m_TitleImg = new CImage();

//UI:게임시작 버튼
var m_GameStartButton = document.getElementById('GameStartButton');
//버튼 위에서도 마우스 좌표 인식(필요없을지도)
m_GameStartButton.addEventListener("mousemove", function(e) {
    //마우스 좌표 캔버스 내 좌표로 변환
    m_CanvasMouse = ConvertToCanvasMouse(e.clientX, e.clientY);
});
m_GameStartButton.addEventListener("click", function(e) {
    //캐릭터 선택 씬으로 이동
    ChangeScene(SCENE.SELECT);
});
//#endregion

function LoadingTitleScene(){
    m_BackgroundImg.img.src = "Images/UI/background.png";
    m_TitleImg.img.src = "Images/UI/IngameTitle.png";
}
function InitTitleScene(p_Animation = false){
    //타이틀 위치 조정
    SetImagePosition(m_TitleImg, 0.3, 0.1, 0.4, 0.2);
    SetImageOpacity(m_TitleImg, 1);

    SetButton(m_GameStartButton, BUTTONSTATE.OFF, 0.4, 0.4, 0.2, 0.1);

    //객체 액션 발동
    if(p_Animation)
    {
        //사용할 객체 생성
        //슬라이드 루프
        SlideButton(m_GameStartButton);
    }
    else
    {
        //사용할 객체 생성
        SetButton(m_GameStartButton, BUTTONSTATE.ON);
    }
}
function DrawTitleScene(){
    //배경 그리기
    m_BackgroundImg.x = -0.25 - (m_CanvasMouse.x/m_Canvas.width)*0.5;
    m_BackgroundImg.y = -0.25 - (m_CanvasMouse.y/m_Canvas.height)*0.5;
    m_BackgroundImg.w = 2;
    m_BackgroundImg.h = 2;
    m_BackgroundImg.DrawImage();

    //타이틀 그리기
    m_TitleImg.DrawImage();
}
function ExitTitleScene(){
    //사용한 객체 비활성화
    SetButton(m_GameStartButton, BUTTONSTATE.OFF);
}