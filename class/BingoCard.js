// ビンゴカード
export default class BingoCard {
  constructor() {
    this.card = this.createCard()
  }

  // カード生成
  // カード作るところを5回処理を書くのではなくループで処理する
  createCard() {
    const col_B_list = Array(15)
      .fill(null)
      .map((_, i) => i + 1)
    const col_I_list = Array.from({ length: 15 }, (_, i) => i + 16)
    const col_N_list = Array.from({ length: 15 }, (_, i) => i + 31)
    const col_G_list = Array.from({ length: 15 }, (_, i) => i + 46)
    const col_O_list = Array.from({ length: 15 }, (_, i) => i + 61)

    this.card = Array.from(new Array(5), () =>
      new Array(5).fill().map((_, i) => {
        switch (i) {
          case 0:
            const col_B_index = Math.floor(Math.random() * col_B_list.length)
            const col_B_bingo = col_B_list[col_B_index]
            col_B_list.splice(col_B_index, 1)
            return {
              num: col_B_bingo,
              judge: true,
            }

          case 1:
            const col_I_index = Math.floor(Math.random() * col_I_list.length)
            const col_I_bingo = col_I_list[col_I_index]
            col_I_list.splice(col_I_index, 1)
            return {
              num: col_I_bingo,
              judge: true,
            }

          case 2:
            const col_N_index = Math.floor(Math.random() * col_N_list.length)
            const col_N_bingo = col_N_list[col_N_index]
            col_N_list.splice(col_N_index, 1)
            return {
              num: col_N_bingo,
              judge: true,
            }

          case 3:
            const col_G_index = Math.floor(Math.random() * col_G_list.length)
            const col_G_bingo = col_G_list[col_G_index]
            col_G_list.splice(col_G_index, 1)
            return {
              num: col_G_bingo,
              judge: true,
            }

          case 4:
            const col_O_index = Math.floor(Math.random() * col_O_list.length)
            const col_O_bingo = col_O_list[col_O_index]
            col_O_list.splice(col_O_index, 1)
            return {
              num: col_O_bingo,
              judge: true,
            }

          default:
            break
        }
      })
    )

    this.card[2][2].judge = false
    return this.card
  }

  // カードに当たりがあるかチェック
  checkNumber(lotteryNumber) {
    this.card.map((value, index) => {
      value.map((obj, i) => {
        if (obj.num === lotteryNumber) {
          return (this.card[index][i].judge = false)
        }
      })
    })
    return this.card
  }

  // 出力済みのあたり判定
  lottedNumbers(num) {
    let breakNumber = false
    this.card.map((value) => {
      value.map((obj) => {
        if (obj.num === num) {
          breakNumber = true
        }
      })
    })
    return breakNumber
  }

  // ビンゴチェックとリーチチェックの処理を共通化する
  isLineCheck(line) {
    let unBreakLength = 0
    let breakLength = 0
    line.map((el) => {
      if (el) {
        unBreakLength++
      } else {
        breakLength++
      }
    })

    if (breakLength === 5) {
      return "bingo"
    } else if (unBreakLength === 1 && breakLength === 4) {
      return "reach"
    }
  }

  // ビンゴとリーチの数をチェック
  checkResult() {
    const bingo =
      this.horizontalResult.bingoResult +
      this.verticalResult.bingoResult +
      this.crossLineResult.bingoResult
    const reach =
      this.horizontalResult.reachResult +
      this.verticalResult.reachResult +
      this.crossLineResult.reachResult
    const result = { bingo, reach }

    return result
  }

  // 横の列チェック
  get horizontalResult() {
    let bingoResult = 0
    let reachResult = 0
    for (let i = 0; i < 5; i++) {
      const row = this.card[i].map((val) => {
        return val.judge
      })
      if (this.isLineCheck(row) === "bingo") {
        bingoResult++
      } else if (this.isLineCheck(row) === "reach") {
        reachResult++
      }
    }
    return { bingoResult, reachResult }
  }

  // 縦の列チェック
  get verticalResult() {
    let bingoResult = 0
    let reachResult = 0
    for (let index = 0; index < 5; index++) {
      const col = [...new Array(5)].map((_, key) => {
        return this.card[key][index].judge
      })
      if (this.isLineCheck(col) === "bingo") {
        bingoResult++
      } else if (this.isLineCheck(col) === "reach") {
        reachResult++
      }
    }
    return { bingoResult, reachResult }
  }

  // 斜の列チェック
  get crossLineResult() {
    let bingoResult = 0
    let reachResult = 0

    const crossLineArr = [[], []]
    for (let i = 0; i < 5; i++) {
      crossLineArr[0].push(this.card[i][i].judge)
      crossLineArr[1].push(this.card[i][this.card.length - i - 1].judge)
    }

    for (let i = 0; i < crossLineArr.length; i++) {
      const line = crossLineArr[i]
      if (this.isLineCheck(line) === "bingo") {
        bingoResult++
      } else if (this.isLineCheck(line) === "reach") {
        reachResult++
      }
    }
    return { bingoResult, reachResult }
  }
}
