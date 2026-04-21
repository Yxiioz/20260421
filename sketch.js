let capture;
let pg; // 宣告 Graphics 變數

function setup() {
  // 產生一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);
  
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  
  // 隱藏預設產生的 HTML 影片元素，讓我們可以自行將影像畫在 p5.js 的畫布上
  capture.hide();

  // 利用 createGraphics 產生一個與視訊畫面一樣寬高的圖層 (Graphics)
  let videoWidth = width * 0.6;
  let videoHeight = height * 0.6;
  pg = createGraphics(videoWidth, videoHeight);
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

  // 在 Graphics 圖層上繪製內容：每次先清空背景以保持透明
  pg.clear();
  pg.fill(255, 255, 255, 150); // 設定為半透明的白色
  pg.noStroke();
  pg.circle(pg.width / 2, pg.height / 2, 100); // 在圖層正中央畫一個圓

  // 將這個 Graphics 圖層顯示在視訊畫面的上方，座標與視訊相同 (x, y)
  image(pg, x, y);
}

// 加入這個函式：當瀏覽器視窗大小改變時，動態調整畫布大小以維持全螢幕
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // 視窗縮放時，同步重新調整 Graphics 圖層的大小
  pg.resizeCanvas(width * 0.6, height * 0.6);
}
