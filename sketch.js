let capture;

function setup() {
  // 產生一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);
  
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  
  // 隱藏預設產生的 HTML 影片元素，讓我們可以自行將影像畫在 p5.js 的畫布上
  capture.hide(); 
}

function draw() {
  // 設定畫布背景顏色為 e7c6ff
  background('#e7c6ff');
  
  // 計算顯示的影像寬高，設定為整個畫布寬高的 60%
  let videoWidth = width * 0.6;
  let videoHeight = height * 0.6;
  
  // 計算影像的 X, Y 座標，使其能置中於畫布
  let x = (width - videoWidth) / 2;
  let y = (height - videoHeight) / 2;
  
  // 修正攝影機左右顛倒：利用 push() 和 pop() 限定座標系統的變更範圍
  push();
  // 將畫布的起始原點移動到影像預計顯示的右側邊界位置
  translate(x + videoWidth, y);
  // 進行水平翻轉 (-1 代表水平顛倒，1 代表垂直維持原樣)
  scale(-1, 1);
  // 繪製影像：因為原點和方向已經翻轉，只要從 (0,0) 開始畫即可達到置中且鏡像的效果
  image(capture, 0, 0, videoWidth, videoHeight);
  pop();
}

// 加入這個函式：當瀏覽器視窗大小改變時，動態調整畫布大小以維持全螢幕
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
