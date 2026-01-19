import { useUser } from "@/app/context/UserContext";
import { useAuthGate } from "@/app/context/AuthGateContext";

export function useRequireAuth() {
  const { user } = useUser();
  const { openAuthGate } = useAuthGate();

  /**
   * Check if user is authenticated before executing an action.
   * If not authenticated, opens the auth gate modal and stores the action for later.
   * @param action - The action to execute after authentication
   * @returns true if authenticated (action can proceed), false if auth gate was opened
   */
  const requireAuth = (action: () => void): boolean => {
    if (!user) {
      openAuthGate(action);
      return false;
    }
    return true;
  };

  return { requireAuth, isAuthenticated: !!user };
}
