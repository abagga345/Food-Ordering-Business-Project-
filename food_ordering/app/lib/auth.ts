
import CredentialsProvider from "next-auth/providers/credentials";
export NEXTAUTH_CONFIG={
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                username:{label:"username",type:"text",placeholder:"Username"},
                password:{label:"password",type:"password",placeholder:"Password"}
            },
            async authorize(credentials:any){
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                //make a backend request to verify

                //if matched return object
                //else return null
                
                
            }

        })
    ],
    secret:process.env.JWT_SECRET,
    callbacks:{
        jwt:({token,user}:any)=>{

        },
        session:({session,token,user}:any)=>{
            
        }
    }
}