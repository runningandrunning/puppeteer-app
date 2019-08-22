<template>
  <div class="animation-container">
    <div class="item"
      v-for="(item, index) in list" 
      :key="index"
      :class="[`item-${index + 1}`]"
      @click="handleClick(item)"
      :ref="`box-${index}`"
      >
      hi，{{ item.content }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const list = Array.from({ length: 9 }).map((item, index) => {
      return {
        // dom元素中的坐标值，永远保持不变
        x: parseInt(index / 3),
        y: index % 3,
        // 当前元素在页面中的坐标值，随着元素移动而改变
        positionX: parseInt(index / 3),
        positionY: index % 3,
        content: index + 1
      }
    })
    return {
      list: list
    }
  },

  methods: {
    handleClick ({ x, y, positionX, positionY }) {
      // 当前点击元素位置
      let currentPosition = positionX * 3 + positionY
      this.$nextTick(() => {
        this.list.forEach((item, i) => {
          const box = this.$refs[`box-${i}`][0]
          const gap = 10
          const width = box.offsetWidth
          const moveWidth = (parseInt(width) + gap)
          const height = box.offsetHeight
          const moveHeight = (parseInt(height) + gap)
          const itemPostion = item.positionX * 3 + item.positionY

          let moveX = ''
          let moveY = ''
          let targetPositionX
          let targetPositionY
          // 首先将目标元素移动到第一个位置
          if (itemPostion === currentPosition) {
            targetPositionX = 0
            targetPositionY = 0
          } else if (itemPostion < currentPosition) { // 排在目标元素之前的元素顺次移动
            // 是否是每一行的最后一列
            if (item.positionY === 2) {
              targetPositionX = item.positionX + 1
              targetPositionY = 0
            } else {
              targetPositionX = item.positionX
              targetPositionY = item.positionY + 1
            }
          } else {
            return
          }
          moveY = (((targetPositionX - item.x) * moveWidth)) + 'px'
          moveX = (((targetPositionY - item.y) * moveHeight)) + 'px'
          item.positionX = targetPositionX
          item.positionY = targetPositionY
          this.list.splice(i, 1, item)
          box.style.transform = `translate(${moveX}, ${moveY})`
          box.style.transition = `all 0.5s`
        })
      })
    }
  }
}
</script>

<style>
.animation-container {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  justify-content: center;
  align-items: center;
}
.item {
  width: 100px;
  height: 100px;
  line-height: 100px;
  flex-shrink: 0;
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  margin-bottom: 10px;
}
.item-1 {
  background-color: #ef342a;
}

.item-2 {
  background-color: #f68f26;
}

.item-3 {
  background-color: #4ba946;
}

.item-4 {
  background-color: #0376c2;
}

.item-5 {
  background-color: #c077af;
}

.item-6 {
  background-color: #f8d29d;
}

.item-7 {
  background-color: #b5a87f;
}

.item-8 {
  background-color: #d0e4a9;
}

.item-9 {
  background-color: #4dc7ec;
}
</style>


