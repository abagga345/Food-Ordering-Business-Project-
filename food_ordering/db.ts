//SINGLETON PRISMA CLIENT , A NEW INSTANCE OF CLIENT DOES NOT GETS 
//GENERATED ON EVERY HOT RELOAD / SAVE / RECOMPILE 

//USEFUL ONLY FOR DEV MODE 
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    console.log("a new prisma client instance generated")
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma