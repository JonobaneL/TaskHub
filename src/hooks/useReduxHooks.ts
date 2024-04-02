import { AppDispatch, RootStore } from "@/store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useTypeDispatch = () => useDispatch<AppDispatch>();
export const useTypeSelector: TypedUseSelectorHook<RootStore> = useSelector;
