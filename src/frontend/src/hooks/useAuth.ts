import { useAuthStore } from "@/store/authStore";
import type { UserProfile } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useRef } from "react";

function mockProfileFromII(principal: string): UserProfile {
  const stored = sessionStorage.getItem(`profile_${principal}`);
  if (stored) {
    return JSON.parse(stored) as UserProfile;
  }
  return {
    principal,
    name: "Campus User",
    email: "user@university.edu",
    role: "student",
    createdAt: BigInt(Date.now()),
  };
}

export function useAuth() {
  const {
    identity,
    isAuthenticated: iiAuthenticated,
    loginStatus,
    login,
    clear,
    isInitializing,
  } = useInternetIdentity();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);
  const logout = useAuthStore((s) => s.logout);

  // Stable refs so the effect doesn't re-run when store functions change
  const setUserRef = useRef(setUser);
  const setLoadingRef = useRef(setLoading);
  const logoutRef = useRef(logout);
  setUserRef.current = setUser;
  setLoadingRef.current = setLoading;
  logoutRef.current = logout;

  useEffect(() => {
    if (isInitializing) {
      setLoadingRef.current(true);
      return;
    }
    if (iiAuthenticated && identity) {
      const principal = identity.getPrincipal().toText();
      const profile = mockProfileFromII(principal);
      setUserRef.current(profile);
    } else if (!iiAuthenticated) {
      setLoadingRef.current(false);
      logoutRef.current();
    }
  }, [iiAuthenticated, identity, isInitializing]);

  const loginWithII = useCallback(async () => {
    await login();
  }, [login]);

  const logoutUser = useCallback(() => {
    clear();
    logoutRef.current();
    sessionStorage.clear();
  }, [clear]);

  const updateUserProfile = useCallback(
    (profile: UserProfile) => {
      if (identity) {
        const principal = identity.getPrincipal().toText();
        sessionStorage.setItem(`profile_${principal}`, JSON.stringify(profile));
      }
      setUserRef.current(profile);
    },
    [identity],
  );

  return {
    user,
    isAuthenticated,
    isLoading,
    loginStatus,
    loginWithII,
    logoutUser,
    updateUserProfile,
    identity,
  };
}
