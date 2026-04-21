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
  
  // 將攝影機影像繪製到畫布的指定位置與大小
  image(capture, x, y, videoWidth, videoHeight);
}

// 加入這個函式：當瀏覽器視窗大小改變時，動態調整畫布大小以維持全螢幕
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
