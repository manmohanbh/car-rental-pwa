import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  type User,
  type UserCredential
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

type UserRole = 'driver' | 'user';

type AppUser = User & {
  role?: UserRole;
};

type AuthContextType = {
  currentUser: AppUser | null;
  signup: (email: string, password: string, role: UserRole) => Promise<void>;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string, role: UserRole) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role,
        createdAt: new Date().toISOString(),
      });

      // Update current user with role
      setCurrentUser({
        ...user,
        role,
      });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  // async function login(email: string, password: string, role: UserRole) {
  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
      
  //     // Get user data from Firestore
  //     const userDoc = await getDoc(doc(db, 'users', user.uid));
  //     if (!userDoc.exists()) {
  //       await signOut(auth);
  //       throw new Error('No user data found');
  //     }

  //     const userData = userDoc.data();
  //     if (userData.role !== role) {
  //       await signOut(auth);
  //       throw new Error(`Please sign in as a ${role}`);
  //     }

  //     // Update current user with role
  //     setCurrentUser({
  //       ...user,
  //       role: userData.role,
  //     });

  //     return true;
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //     throw error;
  //   }
  // }

  // In AuthContext.tsx
  async function login(email: string, password: string, role: UserRole): Promise<boolean> {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        await signOut(auth);
        throw new Error('No user data found');
      }

      const userData = userDoc.data();
      
      // Check if the user has the correct role
      if (userData.role !== role) {
        await signOut(auth);
        throw new Error(`Please sign in as a ${role}`);
      }

      // Update current user with role
      setCurrentUser({
        ...user,
        role: userData.role,
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Re-throw to handle in the component
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    return signOut(auth);
  }

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       // Get user data from Firestore
  //       const userDoc = await getDoc(doc(db, 'users', user.uid));
  //       if (userDoc.exists()) {
  //         const userData = userDoc.data();
  //         setCurrentUser({
  //           ...user,
  //           role: userData.role,
  //         });
  //       }
  //     } else {
  //       setCurrentUser(null);
  //     }
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setCurrentUser({
              ...user,
              role: userData.role || 'user', // Default to 'user' if not specified
            });
          } else {
            // If user exists in auth but not in Firestore, sign them out
            console.log('User not found in database, signing out...');
            await signOut(auth);
            setCurrentUser(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
