// admin role token = admin routes 
// user role token = user routes
//admin , user routes are to be secured

// LEFT 

export default function middleware(){

}

export const config={
    matcher:["/api/admin","/api/user"]
}