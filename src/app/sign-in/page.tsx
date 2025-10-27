import SignIn from "@/components/SignIn";
import Image from "next/image";

const SignInPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 items-center">
      <div className="hidden lg:block relative h-64 lg:h-full">
        <Image
          src="sign-in-logo.svg"
          alt="gym personalize"
          fill
          className="object-contain"
        />
      </div>
      <div className="col-span-2 w-full max-w-xs mx-auto lg:max-w-xl">
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
