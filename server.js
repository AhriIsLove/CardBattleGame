//express 라이브러리 참조
const express = require('express');
const app = express();
const port = 9999;

//서버 생성
app.listen(port, function(){
    console.log(`Example app listening on port ${port}`)
});

//경로로 들어오는 요청에 대해 로컬 폴더 경로를 지정
app.use('', express.static(__dirname+'/'))

///서버의 요청 페이지 별 응답 페이지 할당
//localhost:8080
app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/Main.html')
});
//localhost:8080/page
//app.get('/page', function(요청, 응답){
//    응답.send('페이지')
//    //응답.sendFile(__dirname + '/Main.html')
//});