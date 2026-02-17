// useStateを使うためにimportする
import React, { useState } from "react";

// 漢字を追加するフォーム
function KanjiForm(props) {
  // 入力した漢字を保存する
  const [kanji, setKanji] = useState("");

  // 入力した意味を保存する
  const [meaning, setMeaning] = useState("");

  // フォーム送信の処理
  const handleSubmit = function (event) {
    // ページのリロードを止める
    event.preventDefault();

    // 親コンポーネントのaddCardを呼び出す
    props.addCard(kanji, meaning);

    // 入力欄を空にする
    setKanji("");
    setMeaning("");
  };

  return (
    <form className="input-area" onSubmit={handleSubmit}>
      {/* タイトル */}
      <h3>新しい漢字を追加</h3>

      {/* 漢字入力 */}
      <input
        placeholder="漢字"
        value={kanji}
        onChange={function (event) {
          setKanji(event.target.value);
        }}
      />

      {/* 意味入力 */}
      <input
        placeholder="意味（日本語）"
        value={meaning}
        onChange={function (event) {
          setMeaning(event.target.value);
        }}
      />

      {/* 追加ボタン */}
      <button type="submit" className="primary">
        追加
      </button>
    </form>
  );
}

// exportする
export default KanjiForm;
