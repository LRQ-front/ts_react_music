import React, { PureComponent } from 'react'

interface IProps {
  name: string
  age?: number
}

interface IState {
  count: number
}

interface ISnap {
  n: string
  a: number
}

export default class Demo02 extends PureComponent<IProps, IState, ISnap> {
  state = {
    count: 0
  }
  getSnapshotBeforeUpdate(): ISnap | null {
    return { n: 'zs', a: 1 }
  }
  render() {
    return <div>{/* <div>{this.props.name}</div> */}</div>
  }
}
