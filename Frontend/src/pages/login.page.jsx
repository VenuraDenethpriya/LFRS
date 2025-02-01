import { SignIn } from "@clerk/clerk-react";

function LoginPage() {
    return ( 
        <main className="flex  justify-center pt-20 min-h-screen">
            <SignIn/>
        </main>
     );
}

export default LoginPage;