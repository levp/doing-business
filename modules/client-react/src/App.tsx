import { useBusiness, useClipboard } from "@doing-business/cadabra/src/react";

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
  const { copy, copied } = useClipboard();

  return (
    <div>
      <div>
        <div>CURRENT MONEY: {money}</div>
        <div>
          Income: {income} (level {incomeLevel})<br />
          <button
            onClick={() => {
              earnIncome();
              // IMPORTANT NOTE: Needs a rerender to consider the earnIncome call(effect)...
              // I mean any react lifecycle method works like this, but this one isn't idempotent and has side effect, should rethink it...
              // or we ignore this and let earnIncome return the new money value, but that might "contradict" with react's mental model of "state"...
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
