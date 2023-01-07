## ビンゴゲーム

https://bingogame-4t1enmwez-webroaster.vercel.app/

class ディレクトリにそれぞれのクラスを作成。 pages/index.js 部分で画面の描画や抽
選した数字をステートとして保存し出力

### BingoBall

- ランダムに数字が出る
- 一度出た数字は出ない
- 出た数字を画面に描画

### BingoCard

- ランダムにビンゴ角を作成
- BINGO カード内の数字配列のルール
  - B 列：1〜15
  - I 列：16〜30
  - N 列：31〜45
  - G 列：46〜60
  - O 列：61〜75
- BINGO カードは２次元配列
- 一つのカード内に同じ数字は出現しない
- 真ん中は FREE
- カードを画面に表示する
