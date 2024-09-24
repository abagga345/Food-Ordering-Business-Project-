import axios from "axios"
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
export const NEXTAUTH_CONFIG={
    session : {
        strategy : 'jwt' as const,
    },
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"email",type:"text",placeholder:"Email Id"},
                password:{label:"password",type:"password",placeholder:"Password"}
            },
            async authorize(credentials:any){
                console.log(credentials);
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                try{
                    let exists=await axios.post("http://localhost:3000/api/signIn",{
                        email:credentials.email,
                        password:credentials.password
                    });
                    
                    if (exists.status!=200){
                        return null;
                    }
                    return {
                        id:exists.data.email,
                        role:exists.data.role
                    }
                }catch(err){
                    return null;
                }
            }

        })
    ],
    secret:process.env.JWT_SECRET,
    callbacks: {
        jwt: ({ token, user }:any) => {
            if (user) {
                token.email = user.id;
                token.role = user.role;
            }
            return token;
        },
        session: ({ session, token }:any) => {
            session.user.role = token.role;
            session.user.email = token.email;
            return session;
        }
    },
    pages:{
        signIn:"/login"
    }
}