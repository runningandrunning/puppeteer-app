module.exports = async function queneExecAsyncFunc (func, list, { maxLen = 5 }) {
  const resultList = []
  const loopLen = list.length < maxLen ? list.length : maxLen
  let execIndex = -1

  return new Promise((resolve, reject) => {
    addNewItem(0)

    // 执行异步任务
    async function execute (index) {
      if (index >= list.length) {
        reject(new Error('quene max'))
        return Promise.reject(new Error('error'))
      }
      const args = list[index]
      const result = await func.apply(null, args)
      resultList.push(result)
      if (resultList.length >= list.length) {
        resolve(resultList)
      }
    }

    function addNewItem () {
      execIndex++
      if (execIndex >= list.length) {
        return
      }
      execute(execIndex).then(() => {
        if (execIndex < list.length) {
          addNewItem()
        }
      }).catch(error => {
        reject(error)
      })
    }

  })
}