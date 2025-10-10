"use client";
import toast from "react-hot-toast";

export default function TestToast() {
  return <button onClick={() => toast.success("Hello!")}>Toast Me</button>;
}
