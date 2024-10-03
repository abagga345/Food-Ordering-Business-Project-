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
                    throw new Error("Missing email or password");
                }
                try{
                    let exists=await axios.post("http://localhost:3000/api/signIn",{
                        email:credentials.email,
                        password:credentials.password
                    });
                    return {
                        id:exists.data.email,
                        role:exists.data.role,
                        firstName : exists.data.firstName,
                        lastName: exists.data.lastName
                    }
                }catch(err){
                    throw new Error("Invalid email or password");
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
                token.firstName=user.firstName;
                token.lastName=user.lastName;
            }
            return token;
        },
        session: ({ session, token }:any) => {
            session.user.role = token.role;
            session.user.email = token.email;
            session.user.firstName = token.firstName;
            session.user.lastName= token.lastName;
            return session;
        }
    },
    pages:{
        signIn:"/login"
    }
}