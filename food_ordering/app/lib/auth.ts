import axios from "axios"
import CredentialsProvider from "next-auth/providers/credentials";
export const NEXTAUTH_CONFIG={
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
    callbacks:{
        jwt:({token,user}:any)=>{
            token.username=token.sub;
            return token;
        },
        session:({session,token,user}:any)=>{
            session.role=token.role;
            session.username=token.username;
            return session;
        }
    }
}