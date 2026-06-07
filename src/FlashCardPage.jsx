// useStateとuseEffectを使うためにimportする
import React, { useState, useEffect } from "react";

// フォームコンポーネントを読み込む
import KanjiForm from "./KanjiForm.jsx"

// 最初から入っている漢字データ（この3つは消えない）
const defaultCards = [
  { kanji: "日", meaning: "ひ ・ にち" },
  { kanji: "学", meaning: "まなぶ" },
  { kanji: "生", meaning: "いきる ・ なま" },
];

// フラッシュカードページ
function FlashCardPage() {
  // ユーザーが追加したカードを保存する
  const [userCards, setUserCards] = useState([]);

  // 今表示しているカードの番号
  const [index, setIndex] = useState(0);

  // カードが裏か表かを管理する
  const [flipped, setFlipped] = useState(false);

  // デフォルト＋ユーザー追加カードを合わせる
  const cards = defaultCards.concat(userCards);

  // ページが開いたときlocalStorageから読み込む
  useEffect(() => {
    const data = localStorage.getItem("kanjiCards");

    if (data !== null) {
      const parsedData = JSON.parse(data);
      setUserCards(parsedData);
    }
  }, []);

  // 次のカードに進む
  const nextCard = () => {
    if (index + 1 >= cards.length) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }

    // 表に戻す
    setFlipped(false);
  };

  // カードを追加する処理
  const addCard = (kanji, meaning) => {
    // 入力チェック
    if (kanji === "" || meaning === "") {
      alert("漢字と意味を入力してください！");
      return;
    }

    // 新しい配列を作る
    const newCard = { kanji: kanji, meaning: meaning };
    const newUserCards = userCards.concat(newCard);

    // state更新
    setUserCards(newUserCards);

    // localStorageに保存
    localStorage.setItem("kanjiCards", JSON.stringify(newUserCards));

    alert("保存しました！");
  };

  return (
    <div>
      {/* フラッシュカード表示エリア */}
      <div
        className="card"
        onClick={() => {
          if (flipped === true) {
            setFlipped(false);
          } else {
            setFlipped(true);
          }
        }}
      >
        <div className={flipped ? "inner flip" : "inner"}>
          <div className="front">{cards[index] ? cards[index].kanji : ""}</div>

          <div className="back">{cards[index] ? cards[index].meaning : ""}</div>
        </div>
      </div>

      {/* 次へボタン */}
      <button onClick={nextCard}>次へ</button>

      {/* 漢字追加フォーム */}
      <KanjiForm addCard={addCard} />
    </div>
  );
}

// exportする
export default FlashCardPage;
