import React from "react";

const Recommendations = ({
  selectedBudget,
  customBudget,
  mealCount,
  recommendations,
  setRecommendations,
}) => {
  // APIからおすすめ提案を取得する処理
  const fetchRecommendations = async () => {
    const budget = customBudget || selectedBudget;
    const finalBudget = parseInt(budget);
    if (!finalBudget || isNaN(finalBudget)) {
      alert("有効な金額を入力または選択してください");
      return;
    }
    const perMealBudget = Math.floor(finalBudget / mealCount);
    const results = [];
    for (let i = 0; i < mealCount; i++) {
      const res = await fetch(`http://127.0.0.1:5000/recommend/${perMealBudget}`);
      const data = await res.json();
      results.push({ mealIndex: i + 1, data });
    }
    setRecommendations(results);
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
      <div className="results-container">
        <h2>おすすめ組み合わせ</h2>
        {setCount > 0 ? (
          [...Array(setCount)].map((_, setIdx) => {
            // 各セットの合計金額計算
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
          <p>組み合わせが見つかりませんでした。</p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
