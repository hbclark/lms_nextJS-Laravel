import { maxHeaderSize } from 'http';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '@/lib/hash';

export const authOptions = {
    providers:[
        CredentialsProvider({
            
            async authorize(credentials) {
                try{
                     const url = `http://localhost:8000/api/users/email/${credentials.email}`;
                    const res = await fetch(url)
                    const user = await res.json();
                   
                    if(!user){
                        return null;
                    }
                    const isValid = verifyPassword(user.password,credentials.password);
                    if(!isValid){
                        return null;
                    }

              
                return ({...user,password:null,role:user.memberType})
                }catch(e){
                    console.log(e);
                    
                }
                return null;
            }
        })
    ],
    session:{
       strategy:"jwt",
        maxAge: 30*24*60*60,
       
    },
    secret: process.env.NEXTAUTH_SECRET,
   
    callbacks:{
        async jwt({token,user}){
            
            if(user){
                    token.user=user;

            }
        
            return token;
        },
        async session({token,session,user}){
            if(session?.user){
               
                session.user.role=token.user.role;
                session.user.id = token.user.id;
                session.user.name = `${token.user.firstName} ${token.user.lastName}`;
            }
          
            return session;
        }
    }
    
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}