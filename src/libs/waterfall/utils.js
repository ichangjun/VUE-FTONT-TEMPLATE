/**
 * 从item中获取所有的img标签
 */

export const getImgElements = (itemElements) => {
  const imgElements = []
  itemElements.forEach((item) => {
    imgElements.push(...item.getElementsByTagName('img'))
  })
  return imgElements
}

/**
 * 获取img标签中的图片
 */
export const getImgSrc = (imgElements) => {
  return imgElements.map((img) => img.src)
}

/**
 * 监听图片加载完成（异步程序，通过promise完成）
 */

export const onComplateImg = (imgs) => {
  // 定义promise集合
  const promiseAll = []
  // 循环构建promiseAll
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      const imageObj = new Image()
      imageObj.src = img
      imageObj.onload = () => {
        resolve({
          img,
          index,
        })
      }
    })
  })
  return Promise.all(promiseAll)
}

/**
 * 返回列高对象中的最小的高度
 */
export const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  // console.log('minHeight:', columnHeightArr)
  return Math.min(...columnHeightArr)
}

/**
 * 返回列高对象中的最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj) => {
  // 拿到最小的高度
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight
  })
}

/**
 * 返回列高对象中的最大的高度
 */
export const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}
