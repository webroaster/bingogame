// ビンゴカード
export default class BingoCard {
  bingoWidth
  constructor() {
    this.init()
    this.card = this.createCard()
  }

  // ビンゴの列の数を定義
  init() {
    this.bingoWidth = 7
  }

  // カード生成
  createCard() {
    // 1〜75が入ったリストをそれぞれのカラムで15個ずつ２次元配列で定義
    let num = 1
    const list = Array.from(new Array(this.bingoWidth), () =>
      new Array(15).fill().map(() => {
        const add = num
        num++
        return add
      })
    )

    // カード作成
    this.card = Array.from(new Array(this.bingoWidth), () =>
      new Array(this.bingoWidth).fill().map((_, i) => {
        const randomIndex = Math.floor(Math.random() * list[i].length)
        const cardNum = list[i][randomIndex]
        list[i].splice(randomIndex, 1)
        return {
          num: cardNum,
          judge: true,
        }
      })
    )

    // 真ん中をFreeで開けておく
    const center = Math.floor(this.bingoWidth / 2)
    this.card[center][center].judge = false

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

    if (breakLength === this.bingoWidth) {
      return "bingo"
    } else if (unBreakLength === 1 && breakLength === this.bingoWidth - 1) {
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
    for (let i = 0; i < this.bingoWidth; i++) {
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
    for (let index = 0; index < this.bingoWidth; index++) {
      const col = [...new Array(this.bingoWidth)].map((_, key) => {
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
    for (let i = 0; i < this.bingoWidth; i++) {
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
