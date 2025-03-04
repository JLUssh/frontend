import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

// useNavigate 不能在组件的首次调用中进行使用
export default function ProtectedRoute({ children }) {
  // const navigate = useNavigate();
  let ctx = useAuth();
  if (ctx) {
    let { user } = ctx;

    if (user === null) {
      return <Navigate to={"/login"} />;
    } else {
      return children;
    }
  }
}
