import { useRouteError } from "react-router-dom";

export default function Index() {
  const error = useRouteError();
  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 m-auto">
      {error.statusText || error.message}
    </div>
  );
}
