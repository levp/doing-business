import {useBusiness} from './providers/Business.provider.tsx';
import {useSignal} from './core/signal.hook.tsx';

export function App() {
  const business = useBusiness();

  const money = useSignal(business.money);
  const income = useSignal(business.income);
  const incomeLevel = useSignal(business.incomeLevel);
  const incomeNextLevelIncrease = useSignal(business.incomeNextLevelIncrease);
  const incomeUpgradeCost = useSignal(business.incomeUpgradeCost);

  return <div>
    <div>
      <div>CURRENT MONEY: {money}</div>
      <div>
        Income: {income} (level {incomeLevel})<br />
        <button onClick={() => business.earnIncome()}>
          Earn income!
        </button>
      </div>
      <div>
        Level up your income!<br />
        Increase it by {incomeNextLevelIncrease}<br />
        Price: {incomeUpgradeCost}<br />
        <button
          onClick={() => business.levelUpIncome()}
          disabled={money < incomeUpgradeCost}
        >
          Level up income!
        </button>
      </div>
    </div>
  </div>;
}
