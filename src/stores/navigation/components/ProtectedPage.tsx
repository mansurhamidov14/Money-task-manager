import { user } from "@app/stores";
import { useNavigate } from "@solidjs/router";
import { ParentProps, onMount } from "solid-js";

export function ProtectedPage(props: ParentProps) {
  const navigate = useNavigate();
  onMount(() => {
    if (!user.currentUser().isAuthorized) {
      navigate("/auth")
    }
  });

  return (
    <>{props.children}</>
  );
}
