"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DEV_LOGIN_CALLBACK = "/panel/practice";

function DevLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("dev@local.com");
  const [name, setName] = useState("Dev User");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    const res = await signIn("dev-login", {
      email,
      name,
      redirect: false,
      callbackUrl: DEV_LOGIN_CALLBACK,
    });
    setIsLoading(false);
    if (res?.ok) {
      router.push(res.url ?? DEV_LOGIN_CALLBACK);
      return;
    }
    if (res?.error === "CredentialsSignin") {
      setErrorMsg("Dev login is disabled — set APP_DEBUG=True on the backend.");
    } else {
      setErrorMsg("Something went wrong, please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="dev-email" className="text-sm text-muted-foreground">
          Email
        </label>
        <Input
          id="dev-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="dev-name" className="text-sm text-muted-foreground">
          Name
        </label>
        <Input
          id="dev-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      {errorMsg && (
        <p className="text-sm text-destructive" role="alert">
          {errorMsg}
        </p>
      )}
      <Button type="submit" className="w-full" isLoading={isLoading}>
        Dev Login
      </Button>
    </form>
  );
}

export default function SignInPage() {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google", { callbackUrl: DEV_LOGIN_CALLBACK })}
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Continue with Google
          </Button>
          {isDev && <DevLoginForm />}
        </CardContent>
      </Card>
    </div>
  );
}
