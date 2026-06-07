// useStateを使うためにimportする
import React, { useState } from "react";

// それぞれのページを読み込む
import FlashCardPage from "./FlashCardPage.jsx";
import HistoryPage from "./HistoryPage.jsx";

// Appコンポーネント
function App() {
  // どちらの画面を表示するか管理する
  // true → フラッシュカード画面
  // false → 履歴画面
  const [showFlash, setShowFlash] = useState(true);

  // ボタンを押したときの処理
  const changePage = () => {
    if (showFlash === true) {
      setShowFlash(false);
    } else {
      setShowFlash(true);
    }
  };

  return (
    <div className="container">
      {/* タイトル */}
      <h1>漢字フラッシュカード</h1>

      {/* ボタンエリア */}
      <div style={{ marginBottom: "30px" }}>
        <button className="primary" onClick={changePage}>
          {
            showFlash === true
              ? "追加履歴" // フラッシュ画面のとき
              : "戻る" // 履歴画面のとき
          }
        </button>
      </div>

      {/* 条件によって表示を変える */}
      {showFlash === true ? <FlashCardPage /> : <HistoryPage />}
    </div>
  );
}

// exportする
export default App;
