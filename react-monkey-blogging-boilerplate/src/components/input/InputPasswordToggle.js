import React, { useState } from "react";
import { Field } from "../field";
import { Label } from "../label";
import Input from "./Input";
import { IconEyeClose, IconEyeOpen } from "../icon";

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);

  if (!control) return;

  return (
    <Field>
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type={togglePassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        control={control}
      >
        {!togglePassword && (
          <IconEyeClose
            className="input-icon"
            onClick={() => setTogglePassword(true)}
          ></IconEyeClose>
        )}

        {togglePassword && (
          <IconEyeOpen
            className="input-icon"
            onClick={() => setTogglePassword(false)}
          ></IconEyeOpen>
        )}
      </Input>
    </Field>
  );
};

export default InputPasswordToggle;
