
// Example component using authentication
import { useAuth } from '@/hooks/useAuth';
export function ProfileSection() {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading</div>;
  }
  
  if (!isAuthenticated) {
    return <div>Please sign in to view your profile</div>;
  }
  
  return (
    <div>
      <h2>Welcome, {user?.user_metadata?.name || user?.email}</h2>
      <p>Your profile information will appear here</p>
    </div>
  );
}