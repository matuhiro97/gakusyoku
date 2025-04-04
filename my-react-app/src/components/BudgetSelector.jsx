import React from "react";

const BudgetSelector = ({
  selectedBudget,
  customBudget,
  mealCount,
  setSelectedBudget,
  setCustomBudget,
  setMealCount,
}) => {
  // 「700」「1250」「1650」ボタンをクリック
  const handleBudgetSelect = (value) => {
    setSelectedBudget(value);
    setCustomBudget("");
  };

  // 任意金額入力
  const handleCustomBudgetChange = (e) => {
    setCustomBudget(e.target.value);
    setSelectedBudget("");
  };

  // 食数選択
  const handleMealCount = (value) => {
    setMealCount(value);
  };

  return (
    <div className="budget-selector">
      <div className="section-title">ミールカード金額選択</div>
      <div className="button-group">
        <button onClick={() => handleBudgetSelect("700")}>700</button>
        <button onClick={() => handleBudgetSelect("1250")}>1250</button>
        <button onClick={() => handleBudgetSelect("1650")}>1650</button>
      </div>

      <div className="section-title">金額入力</div>
      <div className="input-group">
        <input
          type="number"
          placeholder="任意の金額入力"
          value={customBudget}
          onChange={handleCustomBudgetChange}
          disabled={selectedBudget !== ""}
        />
      </div>

      <div className="section-title">食数選択</div>
      <div className="button-group">
        <button onClick={() => handleMealCount(1)}>1食</button>
        <button onClick={() => handleMealCount(2)}>2食</button>
        <button onClick={() => handleMealCount(3)}>3食</button>
      </div>
    </div>
  );
};

export default BudgetSelector;
