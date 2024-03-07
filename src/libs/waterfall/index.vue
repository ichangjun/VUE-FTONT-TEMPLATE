<template>
  <div ref="containerTarget" class="relative" :style="{ height: containerHeight + 'px' }">
    <template v-if="columnWidth && data.length">
      <!-- 通过动态的style来计算对应的列宽、left、top -->
      <div
        class="i-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px',
        }"
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <div v-else class="text-[13px] text-zinc-600">加载中...</div>
  </div>
</template>
<script lang="js" name="iWaterfall" setup>
import { defineProps, ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue'
import { getImgElements, getImgSrc, onComplateImg, getMinHeightColumn, getMinHeight, getMaxHeight } from './utils'
const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识的 key
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    default: 2,
    type: Number
  },
  // 列间距
  columnSpacing: {
    default: 20,
    type: Number
  },
  // 行间距
  rowSpacing: {
    default: 20,
    type: Number
  },
  // 是否需要进行图片预读取
  picturePreReading: {
    type: Boolean,
    default: true
  }
})
// 容器的总高度 = 最该的这一列的高度
const containerHeight = ref(0)
// 记录每列高度的容器 key: 所在列 val: 列高
const columnHeightObj = ref({})
/**
 * 构建记录每列高度的对象
 */
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}
// 容器示例
const containerTarget = ref(null)
// 容器的总宽度：不包含padding、margin、border
const containerWidth = ref(0)
// 容器的左边距
const containerLeft = ref(0)
/**
 * 计算容器宽度
 */
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(containerTarget.value, null)
  // 容器宽度
  containerWidth.value = containerTarget.value.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}
// 列宽
const columnWidth = ref(0)
// 列间距合计
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})
/**
 * 计算列宽
 */
const useColumnWidth = () => {
  // 获取容器的宽度
  useContainerWidth()
  // 计算每一列的宽度
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}

// 每项item 高度集合
const itemHeights = ref([])
/**
 * 需要图片预渲染 ==== 监听图片加载完成
 */
const waitImgComplate = () => {
  // 重置item 高度集合
  itemHeights.value = []
  // 首先拿到所有的元素
  let itemElements = [...document.getElementsByClassName('i-waterfall-item')]
  // 获取元素内所有的img标签
  const imgElements = getImgElements(itemElements)
  // 获取img标签中的图片
  const allImgs = getImgSrc(imgElements)
  // 图片加载完成，获取高度
  onComplateImg(allImgs).then(() => {
    itemElements.forEach((el) => {
      itemHeights.value.push(el.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
  })
}
/**
 * 不需要图片预渲染 === 计算item的高度
 */
const useItemHeight = () => {
// 重置item 高度集合
itemHeights.value = []
  // 首先拿到所有的元素
  let itemElements = [...document.getElementsByClassName('i-waterfall-item')]
  itemElements.forEach((el) => {
    itemHeights.value.push(el.offsetHeight)
  })
   // 渲染位置
   useItemLocation()
}
/**
 * 为每个item生成位置属性
 */
const useItemLocation = () => {
  // 遍历数据源
  props.data.forEach((item, index) => {
    // 避免重复计算
    if (item._style) {
      return
    }
    // 生成 _style属性
    item._style = {}
    // left
    item._style.left = getItemLeft()
    // top
    item._style.top = getItemTop()
    // 指定列高度自增
    increasingHeight(index)
  })
  // 指定容器高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}
 /**
  * 返回下一个item的left
  */
const getItemLeft = () => {
  // 拿到最小宽度的列
  const column = getMinHeightColumn(columnHeightObj.value)
  return (column * (columnWidth.value + props.columnSpacing) + containerLeft.value)
}
 /**
  * 返回下一个item的top
  */
const getItemTop = () => {
  return getMinHeight(columnHeightObj.value)
}
 /**
  * 指定列高度自增
  */
 const increasingHeight = (index) => {
	// 最小高度所在的列
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
   // 该列高度自增
  columnHeightObj.value[minHeightColumn] +=
    itemHeights.value[index] + props.rowSpacing
}

const resetFlow = () => {
  setTimeout(() => {
    // 重新计算列宽
    useColumnWidth()
    // 重置所有的定位数据
    props.data.forEach(item => {
      item._style = null
    })
  }, 300);
 }

onMounted(() => {
  useColumnWidth()
})
/**
 * 组件销毁，清除所有的_style
 */
onUnmounted(()=> {
  props.data.forEach((item) => {
    delete item._style;
  })
})
watch(() => props.data, (newVal) => {
  nextTick(() => {
    // 重置数据源
    const resetColumuHeight = newVal.every(item => !item._style);
  if (resetColumuHeight) {
    // 构建高度记录器
    useColumnHeightObj()
  }
    if (props.picturePreReading) {
      waitImgComplate()
    } else {
      useItemHeight()
    }
  })
}, {
  immediate: true,
  deep: true
})
// 重新渲染列宽
watch(() => props.column, () => {
  if (props.picturePreReading) {
    columnWidth.value = 0
  }
  resetFlow()
})
</script>
