import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { useForm } from "react-hook-form";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Field } from "../components/field";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  }
  .label {
    color: ${(props) => props.theme.grayDark};
    font-weight: 600;
    cursor: pointer;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater.")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const naviagte = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    console.log("handleSignUp ~ values", values);

    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    const colRef = collection(db, "users");
    await addDoc(colRef, {
      name: values.fullname,
      email: values.email,
      password: values.password,
    });
    toast.success("Register successfully!!!");
    naviagte("/");
  };

  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => {
    const arrrErrors = Object.values(errors);
    if (arrrErrors && arrrErrors.length > 0) {
      toast.error(arrrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 100,
      });
    }
  }, [errors]);

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="fullName">Fullname</Label>
          <Input
            id="fullName"
            type="text"
            name="fullname"
            placeholder="Enter your fullname"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          ></Input>
        </Field>
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
        <div className="have-account">
          You already have an account? <NavLink to="/sign-in">Login</NavLink>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          style={{
            margin: "0 auto",
            maxWidth: 300,
          }}
        >
          Sign up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
