import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router';
function TestPage() {
    const { isLoaded, isSignedIn, user } = useUser()

    if(isLoaded && !isSignedIn) {
        return <Navigate to='/signin' />
    }

    return (
        <>
        <h1>Test</h1>
        <p>{user.firstName}</p>
        <p>{user.emailAddresses[0].emailAddress}</p>
        </>
        
    );
}

export default TestPage;