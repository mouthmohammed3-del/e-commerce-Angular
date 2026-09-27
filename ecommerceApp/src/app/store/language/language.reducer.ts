import { createReducer, on } from "@ngrx/store";
import { languageAction } from "./language.action";
const inialstat='en'
export const languageReducer=createReducer(inialstat,
  on(languageAction,(state)=>)
)
