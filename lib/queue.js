module.exports = async function queneExecAsyncFunc (func, list, { maxLen = 5 }) {
  const queueList = []
  const resultList = []
  const loopLen = list.length < maxLen ? list.length : maxLen
  let execIndex = -1

  return new Promise((resolve, reject) => {
    for (let i = 0; i < loopLen; i++) {
      addNewItem(i)
    }

    function exec (index) {
      if (index >= list.length) {
        reject(new Error('quene max'))
        return Promise.reject(new Error('error'))
      }
      const args = list[index]
      console.log(list[index])
      return Promise.resolve()
        .then(() => {
          return func.apply(null, args)
        })
        .then((result) => {
          resultList[index] = result
        })
        .catch(reject)
    }

    function addNewItem (index) {
      execIndex++
      if (execIndex >= list.length) {
        return
      }
      queueList[index] = exec(execIndex).then(() => {
        queueList[index] = undefined
        if (execIndex < list.length) {
          addNewItem(index)
        }
        if (checkAllReady()) {
          resolve(resultList)
        }
      })
    }

    function checkAllReady () {
      return execIndex >= list.length && queueList.every(item => !item)
    }

  })
}