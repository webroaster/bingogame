export default class BingoBall {
  constructor() {
    this.list = new Array(75).fill(null).map((_, i) => i + 1)
  }

  // リスト内の数字をランダムに返す
  outNumber() {
    const index = Math.floor(Math.random() * this.list.length)
    const bingo = this.list[index]
    this.list.splice(index, 1)
    return bingo
  }
}
