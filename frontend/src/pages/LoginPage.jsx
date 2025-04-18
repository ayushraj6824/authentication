import { cn } from "@/lib/utils";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";

import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "../stores/useAuthStore";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const {login, loginLoading} = useAuthStore();
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateCredential = ()=>{
    // check all fiels are provided or not and set error
    setError({
      fullName: formData.fullName ? '' : 'Full name is required',
      password: formData.password ? '' : 'Password is required',
    });

    // return if any of the field is missing
    if(error.email || error.password){
      return false;
    }
    return true;
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();

    // trime the white space from start and end of each form data
    console.log(formData);
    setFormData(formData)

    if(!validateCredential()) return;
    await login({
      email: formData.email,
      password: formData.password
    });
  }
  

  return (
    <div className="max-w-screen-lg min-h-svh flex items-center justify-center">
      <Card>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-balance text-sm text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="example.com"
                />
                {error.email && 
                  <p className="text-red-500 -mt-2 text-sm">{error.email}</p>
                }
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                />
                {error.password && 
                  <p className="text-red-500 -mt-2 text-sm">{error.password}</p>
                }
              </div>
              <Button 
                disabled={loginLoading}
                type="submit" className="w-full">
                {
                (loginLoading)? (
                  <>
                    loading
                    <Loader2 className="animate-spin"/>
                  </>
                ) : ("Log in")
              }
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
