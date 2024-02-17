import { useBusiness, useClipboard } from "@doing-business/cadabra/src";

export function App() {
  const {
    money,
    income,
    incomeLevel,
    incomeNextLevelIncrease,
    incomeUpgradeCost,

    earnIncome,
    levelUpIncome,
  } = useBusiness();
  const { copy } = useClipboard();

  return (
    <div>
      <div>
        <div>CURRENT MONEY: {money}</div>
        <div>
          Income: {income} (level {incomeLevel})<br />
          <button
            onClick={() => {
              earnIncome();
              copy(money);
              console.log("copied money to clipboard, try pasting it!");
            }}
          >
            Earn income!
          </button>
        </div>
        <div>
          Level up your income!
          <br />
          Increase it by {incomeNextLevelIncrease}
          <br />
          Price: {incomeUpgradeCost}
          <br />
          <button
            onClick={() => levelUpIncome()}
            disabled={money < incomeUpgradeCost}
          >
            Level up income!
          </button>
        </div>
      </div>
    </div>
  );
}
