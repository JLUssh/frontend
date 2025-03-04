import { useContext } from "react";
import { Context } from "@/store";

export default function useAuth() {
  return useContext(Context);
}
