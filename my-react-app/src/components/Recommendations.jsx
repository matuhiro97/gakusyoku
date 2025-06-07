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

    try {
      const results = await Promise.all(
        [...Array(mealCount)].map(async (_, i) => {
          const res = await fetch(
            `https://gakusyokubackend.onrender.com/recommend/${perMealBudget}`
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
      <button className="proposal-button" onClick={fetchRecommendations}>
        提案を見る
      </button>

      {/* ローディング中表示 */}
      {loading && <p style={{ marginTop: "1rem" }}>読み込み中...</p>}

      <div className="results-container">
        <h2>おすすめ組み合わせ</h2>
        {!loading && setCount > 0 ? (
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
                        {rec.mealIndex}食目: {combo.pattern}（合計: {combo.total}円）
                      </h4>
                      <ul>
                        {combo.items.map((item, i) => (
                          <li key={i}>
                            {item.foodImageUrl ? (
                              <img
                                src={item.foodImageUrl}
                                alt={item.foodName || item.name}
                                width="60"
                                style={{ marginRight: "0.5rem" }}
                              />
                            ) : null}
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
          !loading && <p>組み合わせが見つかりませんでした。</p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
