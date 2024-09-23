import axios from "axios"
import CredentialsProvider from "next-auth/providers/credentials";
export const NEXTAUTH_CONFIG={
    session : {
        strategy : 'jwt' as const,
    },
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                username:{label:"username",type:"text",placeholder:"Username"},
                password:{label:"password",type:"password",placeholder:"Password"}
            },
            async authorize(credentials:any){
                console.log(credentials);
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                try{
                    let exists=await axios.post("http://localhost:3000/api/signIn",{
                        username:credentials.username,
                        password:credentials.password
                    });
                    console.log(exists);
                    if (exists.status!=200){
                        return null;
                    }
                    return {
                        id:exists.data.username,
                        role:exists.data.role
                    }
                }catch(err){
                    console.log(err);
                    return null;
                }
            }

        })
    ],
    secret:process.env.JWT_SECRET,
    callbacks: {
        jwt: ({ token, user }:any) => {
            if (user) {
                token.username = user.id;
                token.role = user.role;
            }
            return token;
        },
        session: ({ session, token }:any) => {
            session.user.role = token.role;
            session.user.username = token.username;
            return session;
        }
    }
}