// 队列执行异步任务
// 串行的执行多个异步任务
module.exports = async function queueExec (func, list, { maxLength = 5 }) {
  let queueList = []
  let resultList = []
  let loopLength = list.length >= maxLength ? maxLength : list.length
  let currentIndex = 0
  
  for (let i = 0; i < loopLength; i++) {
    queueList[i] = execute
  }

  return new Promise((resolve, reject) => {
    /**
     * 执行异步任务
     * @param {*} index 
    */
    async function execute (index, next) {
      const args = list[index]
      const filepath = await func.apply(null, args)
      resultList.push(filepath)
      if (resultList.length >= list.length) {
        resolve(resultList)
      }
      next()
    }

    function next () {
      if (currentIndex >= list.length) {
        return
      }
      // 指针向前移动一位
      let curr = list[++currentIndex]
      curr(currentIndex, next)
    }

    execute(currentIndex, next)
  })
}