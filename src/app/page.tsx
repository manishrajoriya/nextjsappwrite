import RegisterPage from "@/(auth)/register/page";
import Image from "next/image";

import Login from "@/(auth)/login/page";

export default function Home() {
  return (
    <div className="bg-black">
      <RegisterPage/>
      <Login/>
    </div>
   
  );
}
