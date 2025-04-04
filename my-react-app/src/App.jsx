import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import BudgetSelector from "./components/BudgetSelector";
import Recommendations from "./components/Recommendations";

function App() {
  // おすすめ提案のデータを管理（API呼び出し結果）
  const [recommendations, setRecommendations] = useState([]);
  // 選択または入力された金額
  const [selectedBudget, setSelectedBudget] = useState("1250");
  const [customBudget, setCustomBudget] = useState("");
  // 食数（1食/2食/3食）
  const [mealCount, setMealCount] = useState(1);

  return (
    <>
      <Header />
      <div className="container">
        <BudgetSelector
          selectedBudget={selectedBudget}
          customBudget={customBudget}
          mealCount={mealCount}
          setSelectedBudget={setSelectedBudget}
          setCustomBudget={setCustomBudget}
          setMealCount={setMealCount}
        />
        <Recommendations
          selectedBudget={selectedBudget}
          customBudget={customBudget}
          mealCount={mealCount}
          recommendations={recommendations}
          setRecommendations={setRecommendations}
        />
      </div>
    </>
  );
}

export default App;
