import { cn } from "@/lib/utils"

import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router"

import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "../stores/useAuthStore";
import { Loader2 } from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState({});
  const {signup, signupLoading} = useAuthStore();

  const validateCredential = ()=>{
    // check all fiels are provided or not and set error
    setError({
      fullName: formData.fullName ? '' : 'Full name is required',
      email: formData.email ? '' : 'Email is required',
      password: formData.password ? '' : 'Password is required',
      confirmPassword: formData.confirmPassword ? '' : 'Confirm password is required'
    });

    // return if any of the field is missing
    if(error.fullName || error.email || error.password || error.confirmPassword){
      return false;
    }

    // validate the password 
    if(formData.password.length < 8){
      setError({
        ...error,
        password: 'Password must be at least 8 characters long'
      })
      return false;
    }
    if(formData.password !== formData.confirmPassword){
      setError({
        ...error,
        confirmPassword: 'Password and confirm password do not match'
      })
      return false;
    }

    return true;
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();

    // trime the white space from start and end of each form data
    setFormData({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim()
    })

    if(!validateCredential()) return;
    await signup({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password
    });
//12345678
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  


  return (
    <div className="max-w-screen-lg min-h-svh flex items-center justify-center">
      <Card>
        <CardContent className="pt-4 w-[400px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Create Account </h1>
              <p className="text-balance text-sm text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Full Name</Label>
                <Input
                  value={formData.fullName}
                  onChange={handleChange}
                  name="fullName"
                  type="text"
                  placeholder="Enter your name"
                />
                {error.fullName && 
                  <p className="text-red-500 -mt-2 text-sm">{error.fullName}</p>
                }
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="example@email.com"
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
              <div className="grid gap-2">
                <Label htmlFor="password">Confirm Password</Label>
                <Input 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  type="password" 
                />
                {error.confirmPassword && 
                  <p className="text-red-500 -mt-2 text-sm">{error.confirmPassword}</p>
                }
              </div>
              <Button 
                disabled={signupLoading}
                type="submit" className="w-full">
                
                {
                (signupLoading)? (
                  <>
                    loading
                    <Loader2 className="animate-spin"/>
                  </>
                ) : ("Sign up")
              }
              </Button>
            </div>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
