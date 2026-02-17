// useStateとuseEffectを使う
import React, { useState, useEffect } from "react";

// 最初から入っているデータ（この3つは削除できない）
const defaultCards = [
  { kanji: "日", meaning: "ひ ・ にち" },
  { kanji: "学", meaning: "まなぶ" },
  { kanji: "生", meaning: "いきる ・ なま" },
];

// 履歴ページ
function HistoryPage() {
  // ユーザーが追加したカード
  const [userCards, setUserCards] = useState([]);

  // チェックされたカードを管理する
  // 例：{0: true, 2: true}
  const [selected, setSelected] = useState({});

  // ページが開いたときlocalStorageからデータを読む
  useEffect(() => {
    const data = localStorage.getItem("kanjiCards");

    if (data !== null) {
      const parsedData = JSON.parse(data);
      setUserCards(parsedData);
    }
  }, []);

  // チェックボックスを押したとき
  const handleCheck = (index) => {
    const newSelected = {
      ...selected,
    };

    if (newSelected[index] === true) {
      newSelected[index] = false;
    } else {
      newSelected[index] = true;
    }

    setSelected(newSelected);
  };

  // 選択されたカードを削除する
  const deleteSelected = () => {
    const newUserCards = userCards.filter(function (card, index) {
      if (selected[index] === true) {
        return false; // チェックされたものは消す
      } else {
        return true; // チェックされていないものは残す
      }
    });

    setUserCards(newUserCards);

    // localStorageも更新する
    localStorage.setItem("kanjiCards", JSON.stringify(newUserCards));

    // チェック状態をリセット
    setSelected({});
  };

  return (
    <div>
      {/* タイトル */}
      <h2 style={{ marginBottom: "20px" }}>追加された漢字リスト</h2>

      <div className="history-list">
        {/* デフォルトカード（削除できない） */}
        {defaultCards.map(function (card, i) {
          return (
            <div className="history-card" key={"default-" + i}>
              <span>{card.kanji}</span>
              <small>{card.meaning}</small>
              <small style={{ marginTop: "8px", color: "#999" }}>
                削除できません
              </small>
            </div>
          );
        })}

        {/* ユーザー追加カード */}
        {userCards.map(function (card, i) {
          return (
            <div className="history-card" key={"user-" + i}>
              <input
                type="checkbox"
                checked={selected[i] === true}
                onChange={function () {
                  handleCheck(i);
                }}
              />

              <span>{card.kanji}</span>
              <small>{card.meaning}</small>
            </div>
          );
        })}
      </div>

      {/* ユーザーカードがあるときだけ表示 */}
      {userCards.length > 0 ? (
        <button
          className="danger"
          style={{ marginTop: "30px" }}
          onClick={deleteSelected}
        >
          選択削除
        </button>
      ) : null}
    </div>
  );
}

export default HistoryPage;
