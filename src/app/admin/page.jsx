"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DragPlacas from "../../../components/DragPlacas";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      router.replace("/login");
    }
  }, []);

  return(
    <div>
    <DragPlacas />
  </div>
    );
}
   
