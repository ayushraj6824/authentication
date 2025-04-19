import React, { useEffect } from "react";
import NavBar from "../components/NabBar.jsx";
import { useAuthStore } from "../stores/useAuthStore.js";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

const HomePage = () => {
  const { user, getAllUsers, allUsers } = useAuthStore();
  useEffect(() => {
    getAllUsers();
    console.log(allUsers);
  }, []);

  const data = [
    {
      _id: "6801d05b521030c8fabf33ef",
      fullName: "Ayush Raj",
      email: "ayushraj.s7870@gmail.com",
    },
    {
      _id: "6801d05b521030c8fabf33f0",
      fullName: "Riya Sharma",
      email: "riyasharma123@gmail.com",
    },
    {
      _id: "6801d05b521030c8fabf33f1",
      fullName: "Kunal Gupta",
      email: "kunalgupta42@gmail.com",
    },
    {
      _id: "6801d05b521030c8fabf33f2",
      fullName: "Priya Verma",
      email: "priyaverma567@gmail.com",
    },
    {
      _id: "6801d05b521030c8fabf33f3",
      fullName: "Rajesh Kumar",
      email: "rajeshkumar789@gmail.com",
    },
    {
      _id: "6801d05b521030c8fabf33f4",
      fullName: "Sneha Singh",
      email: "snehasingh432@gmail.com",
    },
    {
      _id: "6801d05b521030c8fabf33f5",
      fullName: "Aman Pandey",
      email: "amanpandey123@gmail.com",
    },
    {
      _id: "6801d05b521030c8fabf33f6",
      fullName: "Simran Kaur",
      email: "simrankaur321@gmail.com",
    },
    {
      _id: "6801d05b521030c8fabf33f7",
      fullName: "Mohit Sharma",
      email: "mohitsharma567@gmail.com",
    },
    {
      _id: "6801d05b521030c8fabf33f8",
      fullName: "Anjali Mehta",
      email: "anjalimehta789@gmail.com",
    },
  ];

  return (
    <div className="p-4 w-full max-w-screen-md m-auto">
      <NavBar />
      <div className="mt-16">
        <h2 className="font-bold text-2xl capitalize">
          Welcom {user.fullName.split(' ')[0]}
        </h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>

      <Card className="mt-12">
        <CardHeader>All User Information</CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of all users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>User Name</TableHead>
                <TableHead className="text-right">Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map(({ fullName, email }, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{fullName}</TableCell>
                  <TableCell className="text-right">{email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell >Total Users</TableCell>
                <TableCell className="text-right">{allUsers.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
