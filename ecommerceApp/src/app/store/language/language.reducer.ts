import { createReducer, on } from "@ngrx/store";
import { languageAction } from "./language.action";
import { Action } from "rxjs/internal/scheduler/Action";
const inialstat='en'
export const languageReducer=createReducer(inialstat,
  on(languageAction,(state,action)=>action.lang)
)
