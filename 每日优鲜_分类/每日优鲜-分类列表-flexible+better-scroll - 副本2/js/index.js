
function $(id) {
    return document.getElementById(id);
}

var currentIndex = 0;

// 存储高度的数据
var heightArr = null;

// 获取左边父元素
var lMenu = $('l-menu-con');
// 获取右边的菜单元素
var topMenu = $('top-menu');

// 产品列表的容器
var proContent = $('product-content');

// 左边的bs
var lMenuBs = new BScroll('#l-menus', {
    click: true
});

// 右上边
var topMenuBs = new BScroll('.menu-con', {
    scrollX: true,
    click: true
});

// 右下边
var contentListBs = new BScroll('.content-list', {
    probeType: 3
});

// 监听滚动
contentListBs.on('scroll', function (size) {
    console.log(size);

    // 判断滚到到哪个位置上了，返的数组的长度 - 1 对应的就是菜单的下标    
    var res = heightArr.filter(function (item) {
        return -size.y > item;
    });

    // 排他
    for (var i = 0; i< topMenu.children.length; i++) {
        topMenu.children[i].classList.remove('current');
    }

    // 专属的加上
    console.log(topMenu.children, res.length)
    //  边界值的判定
    var idx = res.length <= 0 ? 0 : res.length;
    idx = res.length >=  heightArr.length ? heightArr.length - 1 : res.length;

    // 让指定的菜单加上类名
    topMenu.children[idx].classList.add('current');
    // 让指定的菜单居中
    topMenuBs.scrollToElement(topMenu.children[idx], 500 ,true, true);

});


// 左边菜单
lMenu.addEventListener('click', function (e) {
    // 兼容
    var event = e || window.event;
    var target = event.target || event.srcElement;

    // 判断点击的元素是否为LI
    if (target.nodeName === 'LI') {
        console.log(target);

        // 排他
        for (var k = 0; k < this.children.length; k++) {
            this.children[k].classList.remove('current');
        }

        // 给当前的加上样式
        target.classList.add('current');


        // 当当前的下标 和你点击的下标相等的时候是不需要重新触发渲染
        if (+target.dataset.id !== +currentIndex) {
            console.log('重新渲染', target.dataset.id)
            currentIndex = target.dataset.id;

            rightRender(currentIndex);
        }
    

    }
});

// 右上菜单

topMenu.addEventListener('click', function (e) {
    var event = e || window.event;

    var target = event.target || event.srcElement;

    if (target.nodeName === 'LI') {
        console.log(target.dataset.index);
        // 点击右上菜单的子元素的时候： 子元素需要滚动到中间
        // scrollToElement(指定的元素, 时间, x, y)
                                // 滚动到指定的元素  x    y
        topMenuBs.scrollToElement(target, 500 ,true, true);
        // 右下的bs
        // 让指定的item滚动到指定的位置
        contentListBs.scrollToElement(proContent.children[target.dataset.index], 500 ,0, 0);
    }
})

// -----------------------------------------


// 渲染左边菜单
function renderLeftMenu(data, parent, callBack) {
    let html = '';

    for (var i = 0; i < data.length; i++) {
        html += `<li data-id=${i} class="${i === 0 ? 'current' : '' }">${data[i].name}</li>`;
    }

    // 渲染至页面上
    parent.innerHTML = html;
    callBack && callBack();
}

renderLeftMenu(lMenuData, lMenu, function () {
   // bs
});


// 渲染右上边的菜单
function renderRMenu(data, parent, callBack) {
    var html = '';

    for (var i = 0; i < data.length; i++) {
        html += `<li data-index="${i}" class="${i === 0 ? 'current' : '' }">${data[i].name}</li>`
    }

    parent.innerHTML = html;

    callBack && callBack();
}

/**
 * 渲染产品列表
 * @param {Object} data
 * @param {Element} parent 
 */
function renderProList(data, parent, callBack) {
    var html = '';

    // 循环小组
    for (var i = 0; i < data.length; i++) {
        html += ` <div class="class-item">
        <h4 class="item-title">${data[i].title}</h4>
        <div class="product-list">`;
        // 循环小组里的成员
        for (var j = 0; j< data[i].list.length; j++) {
            var item = data[i].list[j];
            html += `
            <dl>
                <dt>
                    <img src="./images/6f8d07844018465095861a6e2685c406.jpg" alt="">
                </dt>
                <dd>
                    <h4 class="procuct-title">${item.name}</h4>
                    <h5 class="procuct-subtitle">${item.subtitle}</h5>
                    <div class="price-area">
                        <div class="sub-price">${item.vip.price}</div>
                        <div class="main-price">${item.noVip.price}</div>
                    </div>
                    <div class="product-ctrl">
                        <div class="com-btn main-car"><img src="./images/addcar.png" alt=""></div>
                        <div class="num-con">
                            <div class="com-btn count-down"><img src="./images/countdown.png"
                                    alt=""></div>
                            <span class="product-num">${item.productNum}</span>
                            <div class="com-btn add"><img src="./images/add.png" alt=""></div>
                        </div>
                    </div>
                </dd>
            </dl>`
        }

        html += '</div></div>';
    }

    parent.innerHTML = html;
    callBack && callBack();
}


// 初始化右边
rightRender(currentIndex);
// 渲染右边内容
function rightRender(ind) {
    // 渲染右边列表
    renderProList(rConData[ind].cellList, proContent, function () {
        // bs
                    // 将伪数组转为数组
        heightArr = Array.from(proContent.children).map(function (item) {
            return item.offsetTop;
        });



        console.log(heightArr)
    });

    // 渲染右上菜单
    renderRMenu(rConData[ind].menuInfo, topMenu, function () {
        // bs
    });
}










 













// window.addEventListener('load', function () {
//     // 实例化better-scroll
//     var lMenu = new BScroll('#l-menus', {
//         scrollbar: true,
//         click: true
//     });

//     var TMenu = new BScroll('.menu-con', {
//         scrollX: true,
//         scrollbar: true,
//         click: true

//     });

//     var conList = new BScroll('.content-list', {
//         scrollX: true,
//         click: true,
//         // 第一步： 设置为3，监听滚动，实现联动效果
//         probeType: 3
//     });

//     // 获取元素
//     // 1. 左边菜单容器
//     var lMenuCon = document.getElementById('l-menu-con');
//     // 2. 顶部菜单容器
//     var topMenu = document.getElementById('top-menu');

//     // 3. 获取内容区域容器
//     var productContent = document.getElementById('product-content');

//     // 脚注
//     var footerNode = document.getElementById('footer');
//     // 提示产品数量
//     var shopcarNumTip = null;

//     // 定义当前下标
//     var currentIdx = 0;

//     // 标题列表
//     var itemTitles = null;
//     // 购物车对象
//     var shopCar = {
//         length: 0
//     };

//     // 第一步： 渲染左边菜单
//     // 初始化左边菜单
//     function initMenu(data, site, callBack) {
//         var lis = '';
//         for (var i = 0; i < data.length; i++) {
//             // 默认第一个选中
//             lis += `<li  class="${i === 0 ? 'current' : ''}" data-index="${i}">${data[i].name}</li>`;
//         }

//         site.innerHTML = lis;

//         // 如果函数有，则执行
//         callBack && callBack();
//     }

//     // 第二步： 渲染右边顶部菜单
//     // 右侧顶部menu
//     function changeTopMenu(data, site, callBack) {
//         var lis = '';

//         for (var i = 0; i < data.length; i++) {
//             lis += `<li class="${i === 0 ? 'current' : ''}" data-index="${i}">${data[i].name}</li>`
//         }

//         site.innerHTML = lis;
//         callBack && callBack();
//     }

//     // 第三步： 渲染内容区域
//     // 渲染内容区域
//     function changeContent(data, site, callBack) {

//         var html = '';
//         for (var i = 0; i < data.length; i++) {
//             html += `<div class="class-item"><h4 class="item-title">${data[i].title}</h4><div class="product-list">`;
//             for (var j = 0; j < data[i].list.length; j++) {
//                 var temp = data[i].list[j];
//                 html += `
//                         <dl>
//                         <dt>
//                             <img src="./images/6f8d07844018465095861a6e2685c406.jpg" alt="">
//                         </dt>
//                         <dd>
//                             <h4 class="procuct-title">${temp.name}</h4>
//                             <h5 class="procuct-subtitle">${temp.subtitle}</h5>
//                             <div class="price-area">
//                                 <div class="sub-price">${temp.vip.price}</div>
//                                 <div class="main-price">${temp.noVip.price}</div>
//                             </div>
//                             <div class="product-ctrl">
//                                 <div class="com-btn main-car" data-par="${i}" data-self="${j}"><img src="./images/addcar.png" alt=""></div>
//                                 <div class="num-con">
//                                     <div class="com-btn count-down" data-id="${temp.pId}" data-par="${i}" data-self="${j}"><img src="./images/countdown.png"
//                                             alt=""></div>
//                                     <span class="product-num">1</span>
//                                     <div class="com-btn add" data-par="${i}" data-self="${j}"><img src="./images/add.png" alt=""></div>
//                                 </div>
//                             </div>
//                         </dd>
//                     </dl>`;
//             }
//             html += '</div></div>';
//         }
//         site.innerHTML = html;

//         callBack && callBack();

//     }

//     // 绑定左侧栏事件
//     function addEventLMenu() {
//         lMenuCon.onclick = function (e) {
//             var target = e.target;
//             if (target.nodeName === 'LI') {

//                 // 清除兄弟选中样式
//                 for (var j = 0; j < lMenuCon.children.length; j++) {
//                     lMenuCon.children[j].classList.remove('current');
//                 }
//                 // 然后给自己加上
//                 target.classList.add('current');

//                 // 拿到了每一个下标
//                 currentIdx = target.dataset.index;

//                 // 初始化右侧的视图和事件
//                 initRContent();
                
//             }
//         }
//     }

//     // 绑定顶部菜单事件
//     function addEventTopMenu() {
//         topMenu.onclick = function (e) {
//             var target = e.target;
//             if (target.nodeName === 'LI') {
//                 // 清除兄弟选中样式
//                 for (var j = 0; j < topMenu.children.length; j++) {
//                     topMenu.children[j].classList.remove('current');
//                 }
//                 // 然后给自己加上
//                 target.classList.add('current');

//                 // 获取到了下标
//                 var itemIndex = target.dataset.index
//                 // 滚到中间
//                 TMenu.scrollToElement(topMenu.children[itemIndex], 500, true, true);
//                 // 滚到指定元素
//                 conList.scrollToElement(itemTitles[itemIndex], 1000);
                
//             }
//         }
//     }

//     // 绑定内容区域事件
//     function addEventConent() {
//         // 重点：
//         // 添加购物车的功能
//         // 购物车按钮
//         var mainCar = document.getElementsByClassName('main-car');
//         // 加减盒子
//         var numContent = document.getElementsByClassName('num-con');
//         // 加按钮
//         var addBtns = document.getElementsByClassName('add');
//         // 减按钮
//         var countDowns = document.getElementsByClassName('count-down');
//         // 数量
//         var proNum = document.getElementsByClassName('product-num');

//         for (var i = 0; i < mainCar.length; i++) {
//             (function (idx) {
//                 // 加入购物车
//                 mainCar[idx].onclick = function () {
//                     this.classList.add('hide-btn');
//                     numContent[idx].classList.add('show-num');

//                     // 将该商品加入购物车
//                     var parIndex = this.dataset.par;
//                     var selfIndex = this.dataset.self;
//                     var pId = rConData[currentIdx].cellList[parIndex].list[selfIndex].pId;

//                     // 将产品id作为键 将商品的对象存入购物车对象中
//                     shopCar[pId] = rConData[currentIdx].cellList[parIndex].list[selfIndex];

//                     // 购物车款数
//                     shopCar.length++;

//                     // var parIndex = this.dataset.par;
//                     // var selfIndex = this.dataset.self;
//                     // var tempProduct = rConData[currentIdx].cellList[parIndex].list[selfIndex];
//                     // var pId = tempProduct.pId;

//                     // shopCar[pId] = tempProduct;
//                     // shopCar.length = shopCar.length ? shopCar.length + 1 : 1;
                    
//                     // shopcarNumTip.style.display = 'block';
//                     // shopcarNumTip.innerText = shopCar.length;

//                     // console.log(shopCar);
//                     // // 存储至本地
//                     // localStorage.setItem('shopcarData', JSON.stringify(shopCar));

//                 }

//                 // 加的功能
//                 addBtns[idx].onclick = function () {
//                     var val = proNum[idx].innerText;
//                     val++;
//                     proNum[idx].innerText = val;

//                     var parIndex = this.dataset.par;
//                     var selfIndex = this.dataset.self;
//                     var pId = rConData[currentIdx].cellList[parIndex].list[selfIndex].pId;


//                     shopCar[pId].productNum++;

//                     console.log(shopCar);

//                     // var parIndex = this.dataset.par;
//                     // var selfIndex = this.dataset.self;
//                     // var pId = rConData[currentIdx].cellList[parIndex].list[selfIndex].pId;

//                     // shopCar[pId].productNum++;

//                     // console.log(shopCar);
//                     // 存储至本地
//                     // localStorage.setItem('shopcarData', JSON.stringify(shopCar));
//                 }

//                 // 减的功能
//                 countDowns[idx].onclick = function () {
//                     var val = proNum[idx].innerText;
//                     val--;

//                     var pId = this.dataset.id;
                    
//                     if (val <= 0) {
//                         val = 1;
                        
//                         mainCar[idx].classList.remove('hide-btn');
//                         numContent[idx].classList.remove('show-num');
                      
//                         // 从购物车中删除商品
//                         delete shopCar[pId];

//                         shopCar.length--;

//                     } else {
//                         shopCar[pId].productNum--;
//                     }

//                     // 本地     
//                     //    key    值
//                     // 对象的序列化         
//                     // JSON.stringify(shopCar) : 将shopCar对象 转为字符串，
//                     localStorage.setItem('shopCar', JSON.stringify(shopCar));


//                     console.log(shopCar);

                   




//                     // var parIndex = this.dataset.par;
//                     // var selfIndex = this.dataset.self;
//                     // var pId = rConData[currentIdx].cellList[parIndex].list[selfIndex].pId;
                    
//                     // if (val <= 0) {
//                     //     val = 1;
//                     //     mainCar[idx].classList.remove('hide-btn');
//                     //     numContent[idx].classList.remove('show-num');
                        
//                     //     delete shopCar[pId];
//                     //     shopCar.length--;
//                     //     shopcarNumTip.innerText = shopCar.length;
//                     //     if (shopCar.length === 0) {
//                     //         shopcarNumTip.style.display = 'none';
//                     //     }
//                     // } else  {
//                     //     shopCar[pId].productNum = val;
//                     // }

//                     proNum[idx].innerText = val;
                    
//                     // // 存储至本地
//                     // localStorage.setItem('shopcarData', JSON.stringify(shopCar));
//                 }
//             })(i)
//         }

//         // 我们要在渲染完成之后(callback函数里面)，获取所有标题距离顶部的距离，存入数组中
//         var topArr = [];
//         // console.log(itemTitles);

//         // 循环提取标题的offsetTop
//         for (var i = 0; i < itemTitles.length; i++) {
//             topArr.push(itemTitles[i].offsetTop);
//         }

//         console.log(topArr);

//         conList.on('scroll', function (obj) {
//             // 取为正值
//             var y = -obj.y;
//             // 边界值的判断
//             // if (y <= 0) {
//             //     y = 0;
//             // }

//             // if (y >= topArr[topArr.length - 1]) {
//             //     y = topArr[topArr.length - 1];
//             // }
//             y = y <= 0 ? 0 : (y >= topArr[topArr.length - 1] ? topArr[topArr.length - 1] : y);
//             console.log()
//             // 循环判断滚动的高度
//             var targetIndex = topArr.filter(function (item) {
//                 // 判定条件 滚动的距离要 大于或者等于 item
            
//                 return item <= y;
//             }).length - 1;

//             // 去掉所有标题样式
//             for (var  i = 0 ; i < topMenu.children.length; i++) {
//                 topMenu.children[i].classList.remove('current');
//             }
//             // 给指定标题的加上样式
//             topMenu.children[targetIndex].classList.add('current');
//             // 让指定的标题滚动到居中的位置
//             TMenu.scrollToElement(topMenu.children[targetIndex], 550, true, true);

                
            
            
//         })

//         // 重点：
//     //     var topArr = [];
//     //     // 存储每一个产品类的数组
//     //     for (var i = 0; i < itemTitles.length; i++) {
//     //         topArr.push(itemTitles[i].offsetTop);
//     //     }
//     //    // 监听滚动： 滚动到某个产品类的时候，顶部的menu也应该跟着动
//     //     conList.on('scroll', function (size) {
//     //         // 滚动到中间
//     //         var y = -size.y + (productContent.parentNode.clientHeight / 2);

//     //         // 限定范围
//     //         y = y <= 0 ? 0 : (y >= topArr[topArr.length - 1] ? topArr[topArr.length - 1] : y);

//     //         // 过滤，找到符合条件的下标， 下标  = 返回数组的长度 - 1；
//     //         var scrollIndex = topArr.filter(function (item) {
//     //             return item <= y;
//     //         }).length - 1;

//     //         for (var j = 0; j < topMenu.children.length; j++) {
//     //             topMenu.children[j].classList.remove('current');
//     //         }

//     //         // 然后给自己加上
//     //         topMenu.children[scrollIndex].classList.add('current');
//     //         TMenu.scrollToElement(topMenu.children[scrollIndex], 200, true, true);
//     //     });
//     }

//     // 初始化右侧的视图和事件
//     function initRContent() {
//         // 置顶
//         TMenu.scrollTo(0, 0);
//         conList.scrollTo(0, 0);

//         changeTopMenu(rConData[currentIdx].menuInfo, topMenu, function () {
//             TMenu.refresh();
//             addEventTopMenu();
//         });

//         changeContent(rConData[currentIdx].cellList, productContent, function () {
//             conList.refresh();
//             itemTitles = productContent.getElementsByClassName('item-title');
//             // 绑定内容区域事件
//             addEventConent();
//         });
//     }

//     // 初始化右侧的视图和事件
//     function initLContent() {
//         // callBack: 回调函数: 回头调用的函数
//         initMenu(lMenuData, lMenuCon, function () {
//             // 刷新better-scroll
//             lMenu.refresh();
//             // 事件代理绑定事件  优化的时候可拆分
//             addEventLMenu();
//         });
//     }

//     initLContent();
//     initRContent();

//     function initFooter(data, site, callBack) {
//         var html = ''
//         for (var  i = 0; i < data.length; i++) {
//             html += `
//                 <div>
//                     <div class="${i === 1 ? 'active' : ''}">
//                         <img src="${data[i].src}" alt="">
//                         <img src="${data[i].checkSrc}" alt="">
//                     </div>
//                     <span>${data[i].name} </span>
//                     ${ data[i].name === '购物车' ? '<b id="shopcar-num-tip"></b>' : ''}
//                 </div>`;
//         }

//         site.innerHTML = html;
//         callBack && callBack();
//     }

//     initFooter(footerData, footerNode, function () {
//         shopcarNumTip = document.getElementById('shopcar-num-tip')
//     });





//     // // 初始化左边栏
//     // // 当前坐标
//     // var currentIndex = 0;


//     // var lMenuCon = this.document.getElementById('l-menu-con');
//     // // 左侧菜单视图
//     // function initLMenu(data, site, callBack) {
//     //     var lis = '';
//     //     for (var i = 0; i < data.length; i++) {
//     //         lis += `<li class="${i === 0 ? 'current' : ''}" data-index="${i}">${data[i].name}</li>`
//     //     }

//     //     site.innerHTML = lis;
//     //     callBack();
//     // }

//     // // 左侧菜单事件
//     // function addEventLMenu() {
//     //     lMenuCon.onclick = function (e) {
//     //         var target = e.target;

//     //         for (var i = 0; i < lMenuCon.children.length; i++) {
//     //             lMenuCon.children[i].classList.remove('current');
//     //         }
//     //         target.classList.add('current');
//     //         // 更新当前坐标
//     //         var tempIndex = +target.dataset.index;

//     //         if (currentIndex !== tempIndex) {
//     //             currentIndex = tempIndex;

//     //             changeRCMenu(rConData[currentIndex].menuInfo, topMenu, function () {
//     //                 TMenu.refresh();
//     //                 TMenu.scrollTo(0, 0);
//     //                 addEventRCmenu();
//     //             });
//     //             changeRCPro(rConData[currentIndex].cellList, proContent, function () {
//     //                 conList.refresh();
//     //                 conList.scrollTo(0, 0);
//     //                 itemTitle = proContent.getElementsByClassName('item-title');
//     //                 addEventCar()
//     //             });
//     //         }
//     //     }
//     // }


//     // // 初始化右侧顶部菜单
//     // var topMenu = this.document.getElementById('top-menu');

//     // // 初始化右侧顶部菜单
//     // function changeRCMenu(data, site, callBack) {
//     //     // 渲染头部
//     //     var lis = '';
//     //     for (var i = 0; i < data.length; i++) {
//     //         lis += `<li class="${i === 0 ? 'current' : ''}" data-index="${i}">${data[i].name}</li>`;
//     //     }
//     //     site.innerHTML = lis;
//     //     callBack && callBack();
//     // }

//     // // 右侧顶部菜单绑定事件
//     // function addEventRCmenu() {
//     //     topMenu.onclick = function (e) {
//     //         // 事件目标： 触发事件的具体元素
//     //         var target = e.target;
//     //         if (target.nodeName === 'LI') {
//     //             // 获取自定义属性 data-
//     //             var tarIndex = target.dataset.index;

//     //             conList.scrollToElement(itemTitle[tarIndex], 1000);
//     //             for (var i = 0; i < topMenu.children.length; i++) {
//     //                 topMenu.children[i].classList.remove('current');
//     //             }
//     //             target.classList.add('current');
//     //         }
//     //     }
//     // }



//     // var proContent = this.document.getElementById('product-content');
//     // // 标题
//     // var itemTitle = null;

//     // // 初始化产品区
//     // function changeRCPro(data, site, callBack) {
//     //     var html = '<div class="class-item">';
//     //     for (var i = 0; i < data.length; i++) {
//     //         html += `<h4 class="item-title">${data[i].title}</h4><div class="product-list">`

//     //         for (var j = 0; j < data[i].list.length; j++) {
//     //             var temp = data[i].list[j];
//     //             html += `
//     //                     <dl>
//     //                         <dt>
//     //                             <img src="./images/6f8d07844018465095861a6e2685c406.jpg" alt="">
//     //                         </dt>
//     //                         <dd>
//     //                             <h4 class="procuct-title">${temp.name}</h4>
//     //                             <h5 class="procuct-subtitle">${temp.subtitle}</h5>
//     //                             <div class="price-area">
//     //                                 <div class="sub-price">￥${temp.vip.price}</div>
//     //                                 <div class="main-price">￥${temp.noVip.price}</div>
//     //                             </div>
//     //                             <div class="product-ctrl">
//     //                                 <div class="com-btn main-car" data-parindex="${i}" data-index="${j}"><img src="./images/addcar.png" alt=""></div>
//     //                                 <div class="num-con">
//     //                                     <div class="com-btn count-down" data-parindex="${i}" data-index="${j}"><img src="./images/countdown.png"
//     //                                             alt=""></div>
//     //                                     <span class="product-num">${temp.productNum}</span>
//     //                                     <div class="com-btn add" data-parindex="${i}" data-index="${j}"><img src="./images/add.png" alt=""></div>
//     //                                 </div>
//     //                             </div>
//     //                         </dd>
//     //                     </dl>`
//     //         }

//     //         html += '</div>';
//     //     }

//     //     html += '</div>';
//     //     site.innerHTML = html;
//     //     callBack && callBack();
//     // }



//     // function addEventCar() {
//     //     // 获取购物车按钮
//     //     var mainCar = proContent.getElementsByClassName('main-car');

//     //     // 按钮容器
//     //     var btnCon = proContent.getElementsByClassName('num-con');

//     //     // 加减按钮
//     //     var coundDown = proContent.getElementsByClassName('count-down');
//     //     var addBtn = proContent.getElementsByClassName('add');

//     //     // 数量
//     //     var productNum = proContent.getElementsByClassName('product-num');

//     //     for (var i = 0; i < mainCar.length; i++) {
//     //         (function (ind) {
//     //             mainCar[ind].onclick = function () {
//     //                 this.classList.add('hide-btn');
//     //                 btnCon[ind].classList.add('show-num');

//     //                 var parIndex = this.dataset.parindex; 
//     //                 var slefIndex = this.dataset.index;
//     //                 addShopCart(parIndex, slefIndex, true)
//     //             }

//     //             coundDown[ind].onclick = function () {
//     //                 var val = productNum[ind].innerText;
//     //                 if (val - 1 <= 0) {
//     //                     // 隐藏掉
//     //                     mainCar[ind].classList.remove('hide-btn');
//     //                     btnCon[ind].classList.remove('show-num');
//     //                 } else {
//     //                     val--;
//     //                 }
//     //                 productNum[ind].innerText = val;
//     //                 var parIndex = this.dataset.parindex; 
//     //                 var slefIndex = this.dataset.index;
//     //                 addShopCart(parIndex, slefIndex)

//     //             }

//     //             addBtn[ind].onclick = function () {
//     //                 var val = productNum[ind].innerText;
//     //                 console.log(val)
//     //                 val++;
//     //                 productNum[ind].innerText = val;
//     //                 var parIndex = this.dataset.parindex; 
//     //                 var slefIndex = this.dataset.index;
//     //                 addShopCart(parIndex, slefIndex, true);
//     //             }
//     //         })(i)
//     //     }
//     // }

//     // var shopCartList = {

//     // }

//     // function addShopCart(parentIndex, selfIndex, isAdd) {
//     //     var tempProduct = rConData[currentIndex].cellList[parentIndex].list[selfIndex];
//     //     var pId = tempProduct.pId;
//     //     console.log(tempProduct);
//     //     if (isAdd) {
//     //         if (shopCartList[pId]) {
//     //             shopCartList[pId].productNum++;
//     //         } else {
//     //             shopCartList[pId] = tempProduct;
//     //         }

//     //     } else {
//     //         shopCartList[tempProduct.pId].productNum--;
//     //         if (shopCartList[pId].productNum <= 0 ) {
//     //             delete shopCartList[pId];

//     //         }
//     //     }

//     //     console.log(shopCartList)
//     // }


//     // function iniiView() {

//     //     changeRCPro(rConData[0].cellList, proContent, function () {
//     //         conList.refresh();
//     //         itemTitle = proContent.getElementsByClassName('item-title');
//     //         addEventCar()
//     //     });

//     //     changeRCMenu(rConData[0].menuInfo, topMenu, function () {
//     //         TMenu.refresh();
//     //         addEventRCmenu();
//     //     });

//     //     initLMenu(lMenuData, lMenuCon, function () {
//     //         lMenu.refresh();
//     //         addEventLMenu();
//     //     });
//     // }

//     // iniiView();


























//     // var mainBtn = document.getElementsByClassName('main-car');
//     // var numCon = this.document.getElementsByClassName('num-con');
//     // var addBtn = document.getElementsByClassName('add');
//     // var countdown = document.getElementsByClassName('count-down');
//     // var productNum = this.document.getElementsByClassName('product-num');
//     // var topMenus = document.getElementsByClassName('top-menu');

//     // var contentLists = this.document.getElementsByClassName('content-list');

//     // for (var i = 0; i < mainBtn.length; i++) {

//     //     (function (idx) {
//     //         mainBtn[idx].onclick = function () {
//     //             this.classList.add('hide-btn');
//     //             numCon[idx].classList.add('show-num');
//     //         }

//     //         countdown[idx].onclick = function () {
//     //             var val = productNum[idx].innerText;

//     //             if (val - 1 <= 0) {
//     //                 mainBtn[idx].classList.remove('hide-btn');
//     //                 numCon[idx].classList.remove('show-num');
//     //                 val = 1;
//     //             } else {
//     //                 val = val - 1;
//     //             }

//     //             productNum[idx].innerText = val;
//     //         }

//     //         addBtn[idx].onclick = function () {

//     //             var val = productNum[idx].innerText;
//     //             val++;
//     //             productNum[idx].innerText = val;

//     //         }

//     //     })(i);
//     // }


//     // for (var i = 0; i < topMenus.length; i++) {
//     //     (function (idx) {
//     //         topMenus[idx].addEventListener('click', function (e) {
//     //             var event = e || window.event;
//     //             var target = event.target || event.scrElement;
//     //             if (target.nodeName === 'LI') {
//     //                 // console.log(target.dataset.index);
//     //                 var index = target.dataset.index;
//     //                var classItems =  contentLists[idx].getElementsByClassName('class-item');
//     //                console.log(classItems[index]);
//     //                conList.scrollToElement(classItems[index], 1000, 0, 0)
//     //             }
//     //         })
//     //     })(i)
//     // }
// });


// // 加入购物车的功能
// // 1. 首先要有一个购物车的对象
// // 2. 然后将商品添加到购物车里面
// // 3. 当点击购物车内，有的商品的时候，添加数量
// // 4. 当商品的数量小于= 0的，购物车清除这个商品对象