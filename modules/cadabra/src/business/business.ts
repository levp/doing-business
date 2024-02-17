import { computed, signal, SignalView } from "../core/signal";

export class Business {
  #money = signal(0);
  #income = signal(5);
  #incomeLevel = signal(1);
  #incomeNextLevelIncrease = computed([this.#incomeLevel], (incomeLevel) => {
    console.log("nani incomeNextLevelIncrease");
    return 1 + incomeLevel * 2;
  });
  #incomeUpgradeCost = computed([this.#incomeLevel], (incomeLevel) => {
    console.log("nani incomeUpgradeCost");
    return 50 + incomeLevel * 25;
  });

  #spendMoney(amount: number): boolean {
    if (this.#money.value < amount) {
      return false;
    }
    this.#money.value -= amount;
    return true;
  }

  earnIncome(): void {
    this.#money.value += this.#income.value;
  }

  levelUpIncome(): void {
    const cost = this.#incomeUpgradeCost.value;
    if (!this.#spendMoney(cost)) {
      return;
    }
    const incomeNextLevelIncrease = this.#incomeNextLevelIncrease.value;
    this.#incomeLevel.value++;
    this.#income.value += incomeNextLevelIncrease;
  }

  get money(): SignalView<number> {
    return this.#money;
  }

  get income(): SignalView<number> {
    return this.#income;
  }

  get incomeLevel(): SignalView<number> {
    return this.#incomeLevel;
  }

  get incomeNextLevelIncrease(): SignalView<number> {
    return this.#incomeNextLevelIncrease;
  }

  get incomeUpgradeCost(): SignalView<number> {
    return this.#incomeUpgradeCost;
  }
}
