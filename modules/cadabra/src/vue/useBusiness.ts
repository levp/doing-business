import { Business } from "../core";
import { useSignal } from "./useSignal";

export function useBusiness() {
  // let's keep this scoped
  const business = new Business();

  const money = useSignal(business.money);
  const income = useSignal(business.income);
  const incomeLevel = useSignal(business.incomeLevel);
  const incomeNextLevelIncrease = useSignal(business.incomeNextLevelIncrease);
  const incomeUpgradeCost = useSignal(business.incomeUpgradeCost);

  return {
    money,
    income,
    incomeLevel,
    incomeNextLevelIncrease,
    incomeUpgradeCost,

    // "this" binding issues...I really don't like using classes in JS
    earnIncome: () => business.earnIncome(),
    levelUpIncome: () => business.levelUpIncome(),
  };
}
