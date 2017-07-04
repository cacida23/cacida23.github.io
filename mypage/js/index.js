//构建一个函数，movePage
// 参数：滑动的方向
//功能：根据滑动的方向，显示页面切换的效果
//需求:1.每次切换页面，页面中的图片重新执行入场动画
//     2.有滑动边界，到达边界页后相应方向的滑动失效
//     3.每次上下滑动，如果存在page-n-1/page-n-2，总是显示page-n-1

//实现思路:1.单页展示：本项目的特点是单页展示，每一页都与容器等大，屏幕只展示一个页面
//          根据本项目的页面结构，实现这一功能方法是，将不展示的页面设为display：none；
//              1.1 但在切换时出场页面和入场页面同时得到展示，这就要确保此时两个页面的
//               都为display：block；


//在进入逻辑前nowPage就是page-1-1
var nowPage = {col:1,row:1};
var lastPage = {col:0,row:0};
var dir = {up:"up",right:"right",down:"down",left:"left"}


//滑动的响应逻辑
//由于在滑动后nowPage会变成lastPage，且会根据lastPage决定是否响应换页
//条件限制，页面第一次之后只有触发swipeUp时才会触发movePage（）；
//上滑逻辑
$(document).swipeUp(function () {
    lastPage.col = nowPage.col;
    lastPage.row = nowPage.row;
    if (lastPage.col === 5 ){
        return;
    }else{
        movePage(dir.up)
    }
});

//向下的逻辑
$(document).swipeDown(function () {
    lastPage.col = nowPage.col;
    lastPage.row = nowPage.row;
    if (lastPage.col === 1) {
        return;
    } else {
        movePage(dir.down)
    }
});
//向左逻辑,在这个逻辑里要考虑 第一行和最后一行都是单页
$(document).swipeLeft(function () {
    lastPage.col = nowPage.col;
    lastPage.row = nowPage.row;
    if (lastPage.row === 2 ||lastPage.col === 1||lastPage.col ===5) {
        return;
    } else {
        movePage(dir.left)
    }
});

//向右逻辑
$(document).swipeRight(function () {
    lastPage.col = nowPage.col;
    lastPage.row = nowPage.row;
    if (lastPage.row === 1) {
        return;
    } else {
        movePage(dir.right)
    }
});

var isMoving =false;
function movePage(dirFlag) {
    //每次进入逻辑前判断是否在执行页面切换，如果已经在执行，直接返回不进入逻辑
    if(isMoving){
        return;
    }


    var outClass = "";
    var inClass = "";
    //根据滑动方向确定入场页 --nowPage
    switch (dirFlag){
        case dir.up:
            nowPage.col = nowPage.col+1;
            nowPage.row = 1;
            outClass = "moveToTop";
            inClass = "moveFormBottom";
             break;
        case dir.right:
            nowPage.col = lastPage.col;
            nowPage.row = lastPage.row-1;
            outClass = "moveToRight";
            inClass = "moveFormLeft";
            break;
        case dir.down:
            nowPage.col = nowPage.col-1;
            nowPage.row = 1;
            console.log(nowPage.col);
            console.log(nowPage.row);
            outClass = "moveToBottom";
            inClass = "moveFormTop";
            break;
        case dir.left:
            nowPage.col = lastPage.col;
            nowPage.row = lastPage.row+1;
            outClass = "moveToLeft";
            inClass = "moveFormRight";
            break;
    }
    console.log(nowPage.col,nowPage.row)
    var last =".page-"+lastPage.col+"-"+lastPage.row;
    var now =".page-"+nowPage.col+"-"+nowPage.row;

    $(last).addClass(outClass);
    //在即将切换之前将isMoving置为true
    isMoving = true;
    //在执行进场动画之前需要让他现行
    //让即将进场的页的图片隐藏
    $(now).removeClass("hide");
    // $(now).find("img").addClass("hide");
    $(now).addClass(inClass);


    setTimeout(function () {
        //在页面动画结束之后，图片开始“加载”
        $(now).find("img").removeClass("hide");
        //出场页和它的图片子元素隐藏，方便下次入场时出现“加载效果”
        $(last).addClass("hide");
        $(last).find("img").addClass("hide");
        //动画结束后，将isMoving置为false
        isMoving = false
        //撤销动画类
        $(now).removeClass(inClass);
        $(last).removeClass(outClass);


    },600)
}







