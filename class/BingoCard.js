// ビンゴカード
export default class BingoCard {
  constructor() {
    this.card = this.createCard()
  }

  // カード生成
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

  // ビンゴを検証
  isBingoLine(line) {
    return line.every((el) => !el)
  }

  // ビンゴの数チェック
  checkBingo() {
    const horizontalBingo = this.horizontalResult
    const verticalBingo = this.verticalResult
    const crossLineBingo = this.crossLineResult

    return horizontalBingo + verticalBingo + crossLineBingo
  }

  // 横の列チェック
  get horizontalResult() {
    let result = 0
    for (let i = 0; i < 5; i++) {
      const row = this.card[i].map((val) => {
        return val.judge
      })
      if (this.isBingoLine(row)) {
        result++
      }
    }
    return result
  }

  // 縦の列チェック
  get verticalResult() {
    let result = 0
    for (let index = 0; index < 5; index++) {
      const col = [...new Array(5)].map((_, key) => {
        return this.card[key][index].judge
      })
      if (this.isBingoLine(col)) {
        result++
      }
    }
    return result
  }

  // 斜の列チェック
  get crossLineResult() {
    let result = 0

    const crossLineArr = [[], []]
    for (let i = 0; i < 5; i++) {
      crossLineArr[0].push(this.card[i][i].judge)
      crossLineArr[1].push(this.card[i][this.card.length - i - 1].judge)
    }

    for (let i = 0; i < crossLineArr.length; i++) {
      const line = crossLineArr[i]
      if (this.isBingoLine(line)) {
        result++
      }
    }
    return result
  }

  // リーチになったらtrueを返す
  isReachLine(line) {
    let trueNumber = 0
    let falseNumber = 0
    line.map((el) => {
      if (el) {
        trueNumber++
      } else {
        falseNumber++
      }
    })
    return trueNumber === 1 && falseNumber === 4
  }

  // リーチの数チェック
  checkReach() {
    const horizontalReach = this.horizontalReachResult
    const verticalReach = this.verticalReachResult
    const crossLineReach = this.crossLineReachResult

    return horizontalReach + verticalReach + crossLineReach
  }

  // 横リーチチェック
  get horizontalReachResult() {
    let result = 0
    for (let i = 0; i < 5; i++) {
      const row = this.card[i].map((val) => {
        return val.judge
      })
      if (this.isReachLine(row)) {
        result++
      } else if (this.isBingoLine(row)) {
        ;-result
      }
    }
    return result
  }

  // 縦リーチ列チェック
  get verticalReachResult() {
    let result = 0
    for (let index = 0; index < 5; index++) {
      const col = [...new Array(5)].map((_, key) => {
        return this.card[key][index].judge
      })
      if (this.isReachLine(col)) {
        result++
      } else if (this.isBingoLine(col)) {
        ;-result
      }
    }
    return result
  }

  // 斜リーチ列チェック
  get crossLineReachResult() {
    let result = 0

    const crossLineArr = [[], []]
    for (let i = 0; i < 5; i++) {
      crossLineArr[0].push(this.card[i][i].judge)
      crossLineArr[1].push(this.card[i][this.card.length - i - 1].judge)
    }

    for (let i = 0; i < crossLineArr.length; i++) {
      const line = crossLineArr[i]
      if (this.isReachLine(line)) {
        result++
      } else if (this.isBingoLine(line)) {
        ;-result
      }
    }
    return result
  }
}
