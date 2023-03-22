import { authModalStateAtom } from "@/components/atoms/authModalAtom";
import { currentUserStateAtom } from "@/components/atoms/currentUserAtom";
import AuthenticationModal from "@/components/Modals/AuthenticationModal/AuthenticationModal";
import { auth } from "@/firebase/clientApp";
import useLoginOperations from "@/hooks/useLoginOperations";

import useAuthOperations from "@/hooks/useSignUpOperations";
import { Button, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

type AuthModalView = "logIn" | "signUp" | "resetPassword";

export default function Authentication() {
  const setAuthModalState = useSetRecoilState(authModalStateAtom);
  const currentUserState = useRecoilValue(currentUserStateAtom);

  const { onSignOut, signOutLoading } = useAuthOperations();

  const [user, loading, error] = useAuthState(auth);

  const { onLogin } = useLoginOperations();

  const handleSignInUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventSource = event.currentTarget.name;
    setAuthModalState((prev) => ({
      ...prev,
      open: true,
      view: eventSource as AuthModalView,
    }));
  };

  const router = useRouter();

  useEffect(() => {
    if (user) {
      onLogin(user);
    }
  }, [user]);

  return (
    <>
      <Stack direction="row">
        {currentUserState.isThereCurrentUser ? (
          <>
            <Button
              onClick={() => router.push(`/users/${currentUserState.username}`)}
            >
              <Text>{currentUserState.username}</Text>
            </Button>
            <Button
              name="signOut"
              onClick={() => {
                onSignOut();
              }}
              isLoading={signOutLoading}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button name="logIn" onClick={handleSignInUp}>
              Log In
            </Button>
            <Button name="signUp" onClick={handleSignInUp}>
              Sign Up
            </Button>
          </>
        )}
      </Stack>
      <AuthenticationModal />
    </>
  );
}
