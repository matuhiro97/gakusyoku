import React, { useState } from "react";

const Recommendations = ({
  selectedBudget,
  customBudget,
  mealCount,
  recommendations,
  setRecommendations,
}) => {
  const [loading, setLoading] = useState(false);   // 読み込み中
  const [hasFetched, setHasFetched] = useState(false); // ← 追加：問い合わせ済みか

  // ----------------------------------------
  //  API からおすすめ提案を取得
  // ----------------------------------------
  const fetchRecommendations = async () => {
    const budget = customBudget || selectedBudget;
    const finalBudget = parseInt(budget, 10);

    if (!finalBudget || isNaN(finalBudget)) {
      alert("有効な金額を入力または選択してください");
      return;
    }

    setLoading(true);
    setHasFetched(false);              // 毎回リセット
    const perMealBudget = Math.floor(finalBudget / mealCount);
    const results = [];

    try {
      for (let i = 0; i < mealCount; i++) {
        const res = await fetch(
          `https://gakusyokubackend.onrender.com/recommend/${perMealBudget}`
        );
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const data = await res.json();
        results.push({ mealIndex: i + 1, data });
      }
      setRecommendations(results);
    } catch (e) {
      console.error(e);
      setRecommendations([]);          // エラー時は空に
    } finally {
      setLoading(false);
      setHasFetched(true);             // ← 問い合わせ完了
    }
  };

  // セット数（各食の候補件数の最小値）
  const setCount =
    recommendations.length > 0
      ? Math.min(...recommendations.map((rec) => rec.data.length))
      : 0;

  return (
    <div className="recommendations">
      <button
        className="proposal-button"
        onClick={fetchRecommendations}
        disabled={loading}
      >
        {loading ? "計算中…" : "提案を見る"}
      </button>

      {/* ローディング中 */}
      {loading && <p style={{ marginTop: "1rem" }}>読み込み中...</p>}

      {/* ▼ここから下は「問い合わせ済み」のときだけ描画 ---------- */}
      {hasFetched && (
        <div className="results-container">
          <h2>おすすめ組み合わせ</h2>

          {/* 候補があれば表示、なければメッセージ */}
          {setCount > 0 ? (
            [...Array(setCount)].map((_, setIdx) => {
              const setTotal = recommendations.reduce((acc, rec) => {
                return acc + (rec.data[setIdx]?.total || 0);
              }, 0);

              return (
                <div key={setIdx} className="set-box">
                  <h3>
                    セット {setIdx + 1}（合計: {setTotal}円）
                  </h3>

                  {recommendations.map((rec, mealIdx) => {
                    const combo = rec.data[setIdx];
                    return (
                      <div key={mealIdx} className="combo-box">
                        <h4>
                          {rec.mealIndex}食目: {combo.pattern}
                          （合計: {combo.total}円）
                        </h4>
                        <ul>
                          {combo.items.map((item, i) => (
                            <li key={i}>
                              {item.foodImageUrl && (
                                <img
                                  src={item.foodImageUrl}
                                  alt={item.foodName || item.name}
                                  width="60"
                                  style={{ marginRight: "0.5rem" }}
                                />
                              )}
                              {item.foodName || item.name} - {item.price}円
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <p>組み合わせが見つかりませんでした。</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
