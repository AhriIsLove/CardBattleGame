//#region 객체 선언부
var m_MainFrameImg = new CImage();
var m_FrameText = new CText();

var m_LeftFrameImg = new CImage();
var m_LeftSubFrameImg = new CImage();
var m_CharacterIllustImg = new CImage();
var m_CharacterSprite = new CSprite();

var m_RightFrameImg = new CImage();
var m_CharacterStateText = new CText();

//소서리스
var m_Sorceress = new CCharacter("Sorceress", "소서리스", 100, 50);
var m_SorceressIcon = document.getElementById('SorceressIcon');
//버튼 위에서도 마우스 좌표 인식(필요없을지도)
m_SorceressIcon.addEventListener("mousemove", function(e) {
    //마우스 좌표 캔버스 내 좌표로 변환
    m_CanvasMouse = ConvertToCanvasMouse(e.clientX, e.clientY);
});
var m_SorceressIconText = new CText();
//가로쉬
var m_Garrosh = new CCharacter("Garrosh", "가로쉬", 100, 0);
var m_GarroshIcon = document.getElementById('GarroshIcon');
//버튼 위에서도 마우스 좌표 인식(필요없을지도)
m_GarroshIcon.addEventListener("mousemove", function(e) {
    //마우스 좌표 캔버스 내 좌표로 변환
    m_CanvasMouse = ConvertToCanvasMouse(e.clientX, e.clientY);
});
var m_GarroshIconText = new CText();

//캐릭터 선택 이벤트
var m_SelectedCharacter = document.querySelectorAll("input[name='Character']");
m_SelectedCharacter.forEach((radio) => {
    radio.addEventListener("change", (e) => {
        const current = e.currentTarget;
        if(current.checked){
            m_SelectedCharacter = current.id;
            m_CharacterIllustImg.img.src = "Images/Character/" + m_SelectedCharacter + "_Illustration.png";
            
            m_CharacterSprite.img.src = "Images/Character/" + m_SelectedCharacter + "_Idle.png";
            //프레임 수 설정을 여기서 해줘야 할것 같기도 하고
            
            //선택한 캐릭터의 정보를 표시
            SetText(m_CharacterStateText, 
                "체력 : " + 123 + "\n" +  
                "마나 : " + 123 + "\n" +  
                "체력 : " + 123 + "\n" +  
                "체력 : " + 123 + "\n" +  
                "체력 : " + 123 + "\n");
        }
    });
});
//#endregion
function LoadingSelectScene()
{
    m_MainFrameImg.img.src = "Images/Frame_Main.png";
    SetImage(m_MainFrameImg, 0.2, 0.0, 0.6, 1.0, 0);//슬라이드 할 예정이라 투명하게
    SetText(m_FrameText, "캐릭터 선택\n", FONTSIZE.LEVEL4, "magenta", "center", 0.3, 0.1, 0.4, 0);

    SetText(m_SorceressIconText, m_Sorceress.name, FONTSIZE.LEVEL2, "white", "center",0.25, 0.4, 0.1, 0);
    SetText(m_GarroshIconText, m_Garrosh.name, FONTSIZE.LEVEL2, "white", "center", 0.35, 0.4, 0.1, 0);
    
    m_LeftFrameImg.img.src = "Images/Frame_Sub.png";
    SetImage(m_LeftFrameImg, 0.01, 0.05, 0.2, 0.6, 0);//슬라이드 할 예정이라 투명하게
    m_LeftSubFrameImg.img.src = "Images/Frame_Sub.png";
    SetImage(m_LeftSubFrameImg, 0.01, 0.65, 0.2, 0.3, 0);//슬라이드 할 예정이라 투명하게

    //m_CharacterIllustImg = "";
    SetImage(m_CharacterIllustImg, 0.02, 0.07, 0.18, 0.55, 1);
    SetSprite(m_CharacterSprite, 0.055, 0.72, 0.09, 0.16, 1, 4);

    m_RightFrameImg.img.src = "Images/Frame_Sub.png";
    SetImage(m_RightFrameImg, 0.79, 0.05, 0.2, 0.9, 0);//슬라이드 할 예정이라 투명하게
    SetText(m_CharacterStateText, "", FONTSIZE.LEVEL2, "white", "left", 0.81, 0.1, 0.16, 1);
}
function InitSelectScene(p_Animation = false)
{
    SetButton(m_SorceressIcon, BUTTONSTATE.OFF, 0.25, 0.2, 0.1, 0.1*CANVAS_RATE);
    SetButton(m_GarroshIcon, BUTTONSTATE.OFF, 0.35, 0.2, 0.1, 0.1*CANVAS_RATE);

    //객체 액션 발동
    if(p_Animation)
    {
        //객체 액션 0단계 시작
        InitSelectScene_Step0();
    }
    else
    {
        SetButton(m_SorceressIcon, BUTTONSTATE.ON);
        SetButton(m_GarroshIcon, BUTTONSTATE.ON);
    }
}
function InitSelectScene_Step0(){
    //프레임 배경 슬라이드
    SlideImage(m_MainFrameImg, 10, 0.05, InitSelectScene_Step1);
}
function InitSelectScene_Step1(){
    //프레임 제목 슬라이드
    SlideText(m_FrameText, 10, 0.05, InitSelectScene_Step2);
}
function InitSelectScene_Step2(){
    //캐릭터 버튼 슬라이드
    SlideButton(m_SorceressIcon, 10, 0.05, InitSelectScene_Step3);
    SlideText(m_SorceressIconText, 10, 0.05);
    SlideButton(m_GarroshIcon, 10, 0.05);
    SlideText(m_GarroshIconText, 10, 0.05);
}
function InitSelectScene_Step3(){
    //좌측 프레임 슬라이드
    SlideImage(m_LeftFrameImg, 10, 0.05);
    SlideImage(m_LeftSubFrameImg, 10, 0.05);

    //우측 프레임 슬라이드
    SlideImage(m_RightFrameImg, 10, 0.05);
}
function DrawSelectScene()
{
    //배경 그리기
    m_BackgroundImg.x = -0.25 - (m_CanvasMouse.x/m_Canvas.width)*0.5;
    m_BackgroundImg.y = -0.25 - (m_CanvasMouse.y/m_Canvas.height)*0.5;
    m_BackgroundImg.w = 2;
    m_BackgroundImg.h = 2;
    m_BackgroundImg.DrawImage();

    //프레임 배경
    m_MainFrameImg.DrawImage();
    //프레임 제목 : 캐릭터 선택
    m_FrameText.DrawText();

    //캐릭터
    m_SorceressIconText.DrawText();
    m_GarroshIconText.DrawText();

    //좌측 프레임
    m_LeftFrameImg.DrawImage();
    m_CharacterIllustImg.DrawImage();
    m_LeftSubFrameImg.DrawImage();
    m_CharacterSprite.DrawSprite();
    
    //우측 프레임
    m_RightFrameImg.DrawImage();
    m_CharacterStateText.DrawText();
}
function ExitSelectScene(){
    //사용한 객체 삭제
    SetButton(m_SorceressIcon, BUTTONSTATE.OFF);
    SetButton(m_GarroshIcon, BUTTONSTATE.OFF);
}