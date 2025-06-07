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

  // 食数選択
  const handleMealCount = (value) => {
    setMealCount(value);
  };

  return (
    <div className="budget-selector">
      <div className="section-title">ミールカード金額選択</div>
      <div className="button-group">
        <button
          className={selectedBudget === "700" ? "button-selected" : ""}
          onClick={() => handleBudgetSelect("700")}
        >
          700
        </button>
        <button
          className={selectedBudget === "1250" ? "button-selected" : ""}
          onClick={() => handleBudgetSelect("1250")}
        >
          1250
        </button>
        <button
          className={selectedBudget === "1650" ? "button-selected" : ""}
          onClick={() => handleBudgetSelect("1650")}
        >
          1650
        </button>
      </div>

      {/* 任意の金額入力 */}
      <div className="input-group">
        <input
          type="number"
          placeholder="任意の金額"
          value={customBudget}
          onChange={(e) => {
            setCustomBudget(e.target.value);
            setSelectedBudget("");
          }}
        />
      </div>

      <div className="section-title">食数選択</div>
      <div className="button-group">
        {[1, 2, 3].map((count) => (
          <button
            key={count}
            className={mealCount === count ? "button-selected" : ""}
            onClick={() => handleMealCount(count)}
          >
            <img
              src={`/${count}syoku.png`}
              alt={`${count}食`}
              width="40"
              style={{ display: "block", margin: "0 auto 0.2rem" }}
            />
            {count}食
          </button>
        ))}
      </div>
    </div>
  );
};

export default BudgetSelector;
