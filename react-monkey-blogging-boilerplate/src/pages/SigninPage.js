import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import { useForm } from "react-hook-form";
import { Field } from "../components/field";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import InputPasswordToggle from "../components/input/InputPasswordToggle";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater.")
    .required("Please enter your password"),
});

const SigninPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => {
    // if (!userInfo.email) {
    //   navigate("sign-up");
    // } else {
    //   navigate("/");
    // }
  }, []);

  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          ></Input>
        </Field>
        <InputPasswordToggle control={control}></InputPasswordToggle>
        {/* <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type={togglePassword ? "text" : "password"}
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
          <div className="have-account">
            You already have not had an account?{" "}
            <NavLink to="/sign-up">Sign up</NavLink>
          </div>
        </Field> */}
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          style={{
            margin: "0 auto",
            maxWidth: 300,
          }}
          className
          kind="primary"
        >
          Sign in
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SigninPage;
