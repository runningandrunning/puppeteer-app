module.exports = async function excuteAsyncFunc (func, list) {
  let resultList = []
  let currentIndex = 0

  async function excute (index) {
    let args = list[index]
    let result = await func.apply(null, args)
    resultList.push(result)
  }

  list.reduce((previous, item, index, arr) => {
    return previous().then(res => {
      return excute(index)
    })
  }, excute(currentIndex))
}