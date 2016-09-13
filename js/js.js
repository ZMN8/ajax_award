/**
 * Created by Administrator on 2016/9/13.
 */
function autoFun(winW){
    var windowWidth=document.documentElement.clientWidth;//显示器宽度
    if(windowWidth>winW){
        document.documentElement.style.fontSize=625+"%";
    }else{
        document.documentElement.style.fontSize=windowWidth/winW*625+"%";
    }
}
autoFun(640);
window.onresize= function () {
    autoFun(640);
};
function setCookie(theName,theVal,theTime,thePath){
    var nowTime=new Date;
    nowTime.setTime(nowTime.getTime()+theTime*1000);
    thePath=thePath==null?"/":thePath;
    document.cookie=theName+"="+theVal+";expires="+theTime+";path="+thePath;
}
function getCookie(theName){
    var startPos=document.cookie.indexOf(theName);
    startPos=startPos+theName.length+1;
    var endPos=document.cookie.indexOf(";",startPos);
    if(endPos==-1){
        endPos=document.cookie.length;
    }
    return document.cookie.substring(startPos,endPos);
}

$(".btn").click(function () {
    if(document.cookie.indexOf("award")==-1){
        var zhuanPan=$(".award_box i");
        $.ajax({
            url:"../json/json.json",
            dataType:"json",
            type:"get",
            success: function (arr) {
                var Num=arr.length;
                var angle=360/Num;//转动角度
                var randomNum=Math.floor(Math.random()*Num+0.1);//随机产生0-8
                angle=angle*randomNum+360*5;
                zhuanPan.css("transform","rotate("+angle+"deg)");//转动
                var text=arr[randomNum].main;
                setCookie("award",text,60);
                console.log(document.cookie);
            },
            error: function (a,b,c) {
               console.log(a,b,c);
            }
        })
    }else{
        var award= getCookie("award");
        alert("每人每天只能抽奖一次，您的奖品是“"+award+"”");
    }


})
$(".little_box").click(function () {
    $(".btn").click();
})