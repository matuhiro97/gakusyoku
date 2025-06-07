import React, { useState } from "react";

const Recommendations = ({
  selectedBudget,
  customBudget,
  mealCount,
  recommendations,
  setRecommendations,
}) => {
  const [loading, setLoading] = useState(false); // ← ローディング状態を管理

  // APIからおすすめ提案を取得する処理
  const fetchRecommendations = async () => {
    const budget = customBudget || selectedBudget;
    const finalBudget = parseInt(budget);
    if (!finalBudget || isNaN(finalBudget)) {
      alert("有効な金額を入力または選択してください");
      return;
    }

    setLoading(true); // ← 読み込み開始
    const perMealBudget = Math.floor(finalBudget / mealCount);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      const results = await Promise.all(
        [...Array(mealCount)].map(async (_, i) => {
          const res = await fetch(
            `${baseUrl}/recommend/${perMealBudget}`
          );
          const data = await res.json();
          return { mealIndex: i + 1, data };
        })
      );
      setRecommendations(results);
    } catch (e) {
      console.error(e);
      alert("通信エラーが発生しました");
    } finally {
      setLoading(false); // ← 読み込み終了
    }
  };

  // セット数（各食の候補件数の最小値）
  const setCount =
    recommendations.length > 0
      ? Math.min(...recommendations.map((rec) => rec.data.length))
      : 0;

  return (
    <div className="recommendations">
      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? "読み込み中..." : "提案を見る"}
      </button>
      {/* 以下、recommendationsの表示ロジック */}
    </div>
  );
};

export default Recommendations;
