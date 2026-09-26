import { createReducer, on } from "@ngrx/store";
import { increaseCounter } from "./counter.action";
const inialState=0
const counterreducer = createReducer(
  inialState,
  on(increaseCounter,(state)=>state+1)

)
