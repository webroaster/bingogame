import { useRouter } from "next/router"
import { useState } from "react"
import BingoBall from "../class/BingoBall"
import BingoCard from "../class/BingoCard"

const bingoBall = new BingoBall()
const bingoCard = new BingoCard()
console.log(bingoCard.card)

export default function Home() {
  const router = useRouter()
  const [outNumbers, setOutNumbers] = useState([])

  const handleClick = () => {
    // ナンバーを出す
    const bingoNumber = bingoBall.outNumber()

    setOutNumbers([...outNumbers, bingoNumber])

    // ナンバー抽選
    bingoCard.checkNumber(bingoNumber)
  }

  const handleReset = () => {
    router.reload()
  }

  return (
    <div className='container'>
      <h1 className='title'>BINGO GAME</h1>
      {bingoCard.checkResult().bingo !== 12 ? (
        <button className='startButton' onClick={() => handleClick()}>
          ビンゴを回す
        </button>
      ) : (
        <button className='startButton fin' onClick={() => handleReset()}>
          ビンゴをリセット
        </button>
      )}
      <div className='alertFlex'>
        <p>抽選回数：{outNumbers.length}</p>
        <p>ビンゴの数：{bingoCard.checkResult().bingo}</p>
        <p>リーチの数：{bingoCard.checkResult().reach}</p>
      </div>
      <div className='bingoFlex'>
        <div>
          <table className='bingoCard'>
            <tbody>
              {bingoCard.card.map((value, index) => (
                <tr key={index} suppressHydrationWarning={true}>
                  {value.map((obj, i) => {
                    if (obj.judge) {
                      return (
                        <td key={i} suppressHydrationWarning>
                          {obj.num}
                        </td>
                      )
                    } else if (index === 2 && i === 2) {
                      return (
                        <td key={i} suppressHydrationWarning className='break'>
                          FREE
                        </td>
                      )
                    } else {
                      return (
                        <td key={i} suppressHydrationWarning className='break'>
                          {obj.num}
                        </td>
                      )
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <p className='nowOutNumber'>{outNumbers[outNumbers.length - 1]}</p>
          <div className='outNumbers'>
            {outNumbers.map((value) => {
              if (bingoCard.lottedNumbers(value)) {
                return (
                  <span className='outNumber break' key={value}>
                    {value}
                  </span>
                )
              } else {
                return (
                  <span className='outNumber' key={value}>
                    {value}
                  </span>
                )
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
