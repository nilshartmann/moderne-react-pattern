import { Input } from "../Input.tsx";
import { Button } from "../Button.tsx";
import React, { useState } from "react";
import { useSubscribeToNewsletterMutation } from "../use-queries.ts";

export function NewsletterRegistration() {
  const [email, setEmail] = useState("");
  const mutation = useSubscribeToNewsletterMutation();

  const inputDisabled = mutation.isPending;
  const saveDisabled = mutation.isPending || email.trim().length === 0;

  const handleEmailChange = (e: string) => {
    mutation.reset();
    setEmail(e);
  };

  const handleSubmit = () => {
    mutation.mutate(email);
  };

  return (
    <div
      className={"max-w-1/4 flex items-center space-x-4 pe-2 ps-2 font-barlow"}
    >
      <div>Don't miss new recipes. Subscribe to newsletter</div>
      <div className={"max-w-64"}>
        <Input
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          disabled={inputDisabled}
          placeholder={"E-Mail"}
        />
      </div>
      <div>
        <Button disabled={saveDisabled} checked={mutation.isSuccess}>
          {mutation.isSuccess ? (
            "Subscribed!"
          ) : (
            <button onClick={handleSubmit}>Subscribe</button>
          )}
        </Button>
      </div>
    </div>
  );
}
