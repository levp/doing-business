<script setup>
import { useClipboard, useBusiness } from "@doing-business/cadabra/src/vue";

const { copy, copied } = useClipboard();
const {
  money,
  income,
  incomeLevel,
  incomeNextLevelIncrease,
  incomeUpgradeCost,

  earnIncome,
  levelUpIncome,
} = useBusiness();
</script>

<template>
  <div>
    <div>
      <div>CURRENT MONEY: {{ money }}</div>
      <div>
        Income: {{ income }} (level {{ incomeLevel }})<br />
        <button
          @click="
            () => {
              earnIncome();
              copy(money);
              console.log('copied money to clipboard, try pasting it!');
            }
          "
        >
          Earn income!
        </button>
      </div>
      <div>
        Level up your income!
        <br />
        Increase it by {{ incomeNextLevelIncrease }}
        <br />
        Price: {{ incomeUpgradeCost }}
        <br />
        <button
          @click="
            () => {
              levelUpIncome();
            }
          "
          :disabled="money < incomeUpgradeCost"
        >
          Level up income!
        </button>
      </div>
    </div>
  </div>
</template>
