import { createReducer, on } from "@ngrx/store";
import { decreaseCounter, increaseCounter } from "./counter.action";
import { languageAction } from "../language/language.action";
const inialState=0

export const counterreducer = createReducer(
  inialState,
  on(increaseCounter,(state)=>state+1),
  on(decreaseCounter,(state)=>state-1),


)
const intialStatelang='en'
export const languageReducer =  createReducer(
  intialStatelang,
  on(languageAction,(state,action) => action.lang )


)
