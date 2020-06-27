export default class Util {
  /**
   * 矩形的包含判断
   * @param outRect :{x:number,y:number,width:number,height:number}   包含者
   * @param innerRect :{x:number,y:number,width:number,height:number}   被包含者
   * @returns : boolean   表示包含者是否包含被包含者
   *
   * # 注意
   * 包含及相等都属于包含
   */
  static rectIsContain(outRect, innerRect) {
    const left = outRect.x <= innerRect.x
    const right = outRect.width + outRect.x >= innerRect.width + innerRect.x
    const top = outRect.y <= innerRect.y
    const bottom =
      outRect.height + outRect.y >= innerRect.height + innerRect.y

    return left && right && top && bottom
  }
}
