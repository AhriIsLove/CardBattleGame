//#region 객체 선언부
var m_MainFrameImg = new CImage();
var m_FrameText = new CText();
//var m_LineHImg = new CImage();

var m_LeftFrameImg = new CImage();
var m_LeftSubFrameImg = new CImage();
var m_CharacterIllustImg = new CImage();
var m_CharacterSprite = new CSprite();

var m_RightFrameImg = new CImage();
var m_CharacterStateText = new CText();

//UI:뒤로가기 버튼
var m_BackButton = document.getElementById('BackButton');
//버튼 위에서도 마우스 좌표 인식(필요없을지도)
m_BackButton.addEventListener("mousemove", function(e) {
    //마우스 좌표 캔버스 내 좌표로 변환
    m_CanvasMouse = ConvertToCanvasMouse(e.clientX, e.clientY);
});
m_BackButton.addEventListener("click", function(e) {
    //캐릭터 선택 씬으로 이동
    ChangeScene(SCENE.TITLE);
});

//캐릭터
var m_MapCharacters = new Map();
//소서리스
var m_Sorceress = new CCharacter("SORCERESS", "소서리스");
m_MapCharacters.set("SORCERESS", m_Sorceress);
var m_SorceressIcon = document.getElementById('SorceressIcon');
//버튼 위에서도 마우스 좌표 인식(필요없을지도)
m_SorceressIcon.addEventListener("mousemove", function(e) {
    //마우스 좌표 캔버스 내 좌표로 변환
    m_CanvasMouse = ConvertToCanvasMouse(e.clientX, e.clientY);
});
var m_SorceressIconText = new CText();
//가로쉬
var m_Garrosh = new CCharacter("GARROSH", "가로쉬");
m_MapCharacters.set("GARROSH", m_Garrosh);
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
            SetSelectedCharacter(current.id);
        }
    });
});
//캐릭터 설정
function SetSelectedCharacter(p_Character){
    if(p_Character == undefined){
        m_CharacterIllustImg.img.src = "";
        m_CharacterSprite.img.src = "";
        SetText(m_CharacterStateText, "");
        return;
    }

    //일러스트
    m_CharacterIllustImg.img.src = "Images/Character/" + p_Character + "_Illustration.png";
    //스프라이트
    m_CharacterSprite.img.src = "Images/Character/" + p_Character + "_Idle.png";

    //데이터
    var characterInfo = m_MapCharacters.get(p_Character);
    SetText(m_CharacterStateText, 
        "이름 : " + characterInfo.Name + "\n" +  
        "최대체력 : " + characterInfo.MaxHP + "\n" +  
        "체력회복 : " + characterInfo.HPRecovery + "\n" +  
        "최대자원 : " + characterInfo.MaxRP + "\n" +  
        "자원회복 : " + characterInfo.RPRecovery + "\n" +  
        "방어력 : " + characterInfo.Armor + "\n" +  
        "피해량 : " + characterInfo.Attack + "%\n" +  
        "공격속도 : " + characterInfo.AttackSpeed + "%\n" +  
        "행운 : " + characterInfo.ItemLuck + "%\n" +  
        "추가골드 : " + characterInfo.CoinLuck + "%\n" +  
        "새로고침 : " + characterInfo.ItemReroll + "\n");
       
        //게임시작 버튼 활성화
        m_GameStartButton.disabled = false;//활성화
}
//#endregion
function LoadingSelectScene()
{
    m_MainFrameImg.img.src = "Images/UI/Frame_Main.png";
    SetImagePosition(m_MainFrameImg, 0.2, 0.0, 0.6, 1.0);
    SetImageOpacity(m_MainFrameImg, 0);//슬라이드 할 예정이라 투명하게
    SetText(m_FrameText, "캐릭터 선택\n", FONTSIZE.LEVEL4, "magenta", "center", 0.3, 0.1, 0.4);
    SetTextOpacity(m_FrameText, 0);//슬라이드 할 예정이라 투명하게

    SetText(m_SorceressIconText, m_Sorceress.Name, FONTSIZE.LEVEL2, "white", "center",0.25, 0.4, 0.1);
    SetTextOpacity(m_SorceressIconText, 0);//슬라이드 할 예정이라 투명하게
    SetText(m_GarroshIconText, m_Garrosh.Name, FONTSIZE.LEVEL2, "white", "center", 0.35, 0.4, 0.1);
    SetTextOpacity(m_GarroshIconText, 0);//슬라이드 할 예정이라 투명하게
    
    //m_LineHImg.img.src = "Images/UI/Line_H.png";
    //SetImagePosition(m_LineHImg, 0.25, 0.7, 0.5, 0.02);
    //SetImageOpacity(m_LineHImg, 0);//슬라이드 할 예정이라 투명하게
    
    m_LeftFrameImg.img.src = "Images/UI/Frame_Sub.png";
    SetImagePosition(m_LeftFrameImg, 0.01, 0.05, 0.2, 0.6);
    SetImageOpacity(m_LeftFrameImg, 0);//슬라이드 할 예정이라 투명하게
    m_LeftSubFrameImg.img.src = "Images/UI/Frame_Sub.png";
    SetImagePosition(m_LeftSubFrameImg, 0.01, 0.65, 0.2, 0.3);
    SetImageOpacity(m_LeftSubFrameImg, 0);//슬라이드 할 예정이라 투명하게

    //m_CharacterIllustImg = "";
    SetImagePosition(m_CharacterIllustImg, 0.02, 0.07, 0.18, 0.55);
    SetImageOpacity(m_CharacterIllustImg, 1);
    SetSprite(m_CharacterSprite, 0.055, 0.72, 0.09, 0.16, 1, 4);

    m_RightFrameImg.img.src = "Images/UI/Frame_Sub.png";
    SetImagePosition(m_RightFrameImg, 0.79, 0.05, 0.2, 0.9);
    SetImageOpacity(m_RightFrameImg, 0);//슬라이드 할 예정이라 투명하게
    SetText(m_CharacterStateText, "", FONTSIZE.LEVEL2, "white", "left", 0.81, 0.1, 0.16);
    SetTextOpacity(m_CharacterStateText, 1);
}
function InitSelectScene(p_Animation = false)
{
    SetButton(m_BackButton, BUTTONSTATE.OFF, 0.25, 0.08, 0.05, 0.05*CANVAS_RATE);

    SetButton(m_SorceressIcon, BUTTONSTATE.OFF, 0.25, 0.2, 0.1, 0.1*CANVAS_RATE);
    SetButton(m_GarroshIcon, BUTTONSTATE.OFF, 0.35, 0.2, 0.1, 0.1*CANVAS_RATE);
    
    SetButton(m_GameStartButton, BUTTONSTATE.OFF, 0.81, 0.8, 0.16, 0.1);
    m_GameStartButton.disabled = true;//비활성화

    //객체 액션 발동
    if(p_Animation)
    {
        //객체 액션 0단계 시작
        InitSelectScene_Step0();
    }
    else
    {
        SetButton(m_BackButton, BUTTONSTATE.ON);

        SetButton(m_SorceressIcon, BUTTONSTATE.ON);
        SetButton(m_GarroshIcon, BUTTONSTATE.ON);
        
        SetButton(m_GameStartButton, BUTTONSTATE.ON);
    }
}
function InitSelectScene_Step0(){
    //프레임 배경 슬라이드
    SlideImage(m_MainFrameImg, 10, 0.05, InitSelectScene_Step1);
}
function InitSelectScene_Step1(){
    //프레임 제목 슬라이드
    SlideText(m_FrameText, 10, 0.05, InitSelectScene_Step2);

    //뒤로가기 버튼 슬라이드
    SlideButton(m_BackButton, 10, 0.05);
}
function InitSelectScene_Step2(){
    //캐릭터 버튼 슬라이드
    SlideButton(m_SorceressIcon, 10, 0.05, InitSelectScene_Step3);
    SlideText(m_SorceressIconText, 10, 0.05);
    SlideButton(m_GarroshIcon, 10, 0.05);
    SlideText(m_GarroshIconText, 10, 0.05);
}
function InitSelectScene_Step3(){
    ////프레임 구분선 슬라이드
    //SlideImage(m_LineHImg, 10, 0.05);

    //좌측 프레임 슬라이드
    SlideImage(m_LeftFrameImg, 10, 0.05);
    SlideImage(m_LeftSubFrameImg, 10, 0.05);

    //우측 프레임 슬라이드
    SlideImage(m_RightFrameImg, 10, 0.05, InitSelectScene_Step4);
}
function InitSelectScene_Step4(){
    //게임시작 버튼 슬라이드
    SlideButton(m_GameStartButton);
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
    
    ////프레임 구분선
    //m_LineHImg.DrawImage();

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
    //사용한 객체 비활성화
    SetImageOpacity(m_MainFrameImg, 0);
    SetTextOpacity(m_FrameText, 0);

    SetButton(m_BackButton, BUTTONSTATE.OFF);

    SetTextOpacity(m_SorceressIconText, 0);
    SetTextOpacity(m_GarroshIconText, 0);

    //SetImageOpacity(m_LineHImg, 0);

    SetImageOpacity(m_LeftFrameImg, 0);
    SetImageOpacity(m_LeftSubFrameImg, 0);

    SetImageOpacity(m_RightFrameImg, 0);

    SetButton(m_SorceressIcon, BUTTONSTATE.OFF);
    SetButton(m_GarroshIcon, BUTTONSTATE.OFF);

    SetTextOpacity(m_CharacterStateText, 0);
    //캐릭터 선택 정보 삭제
    m_SelectedCharacter.forEach((radio) => {
        radio.checked = false;
    })
    SetSelectedCharacter();

    SetButton(m_GameStartButton, BUTTONSTATE.OFF);
}