// scrollTo函数的实现
export function scrollTo(element: HTMLElement, to: number, duration: number) {
  if (duration < 0) return
  //算出需要滚动的距离
  const distance = to - element.scrollTop
  //根据duration算出每10ms需要滚动的距离
  const perDistance = (distance / duration) * 10

  setTimeout(() => {
    element.scrollTop = element.scrollTop + perDistance
    //滚动的距离已经达到，停止递归
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}
