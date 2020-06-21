export interface appReducerState {
  readonly loadingTodoList: boolean,
  readonly loadingFinishList: boolean,
  readonly alert: {text:string, type: string},
  readonly visible: boolean,
  readonly routes: [
    {path:string, name:string, Component: any},
    {path:string, name:string, Component: any}
  ]
}
