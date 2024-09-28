import {z} from 'zod'

export const signup=z.object({
    email:z.string().email(),
    firstName:z.string({message:"FirstName should be a string"}),
    lastName:z.string({message:"LastName should be a string"}),
    contactNo:z.string().length(10,{"message":"ContactNo not of 10 digits"}),
    password:z.string({message:"Password should be a string"}).min(5,{"message":"Password length is very short"}).max(30,{"message":"Password length is very large"}),
}).required()

export const signin=z.object({
    email:z.string().email(),
    password:z.string({message:"Password should be a string"}).min(5,{"message":"Password length is very short"}).max(30,{"message":"Password length is very large"})
}).required()


export const review=z.object({
    rating:z.literal(0).or(z.literal(1)).or(z.literal(2)).or(z.literal(3)).or(z.literal(4)).or(z.literal(5)),
    description:z.string().min(1).max(70)
}).required()

export const addItem=z.object({
    imageUrl:z.string(),
    amount:z.number().int().min(0),
    description:z.string().max(50),
    title:z.string().max(40)
}).required()

export const status=z.object({
    orderId:z.number().int(),
    status:z.literal("Unconfirmed").or(z.literal("Rejected")).or(z.literal("Processing")).or(z.literal("Delivered")).or(z.literal("Dispatched"))
})

export const visibility=z.object({
    id:z.number().int(),
    visibility:z.boolean()
})

export const paymentId=z.object({
    id:z.number().int(),
    paymentId:z.string().max(30)
})

export const checkout=z.object({
    description:z.string().max(75),
    houseStreet:z.string().max(70),
    landmark:z.string().max(70),
    city:z.string().max(50),
    pincode:z.string().min(6).max(7),
    items:z.array(z.object({
        itemId:z.number().int(),
        quantity:z.number().int()
    })),
    amount:z.number()
})

export const editUser=z.object({
    firstName:z.string().min(1),
    lastName:z.string().min(1),
    contactNo:z.string().length(10),
    password:z.string().min(5).max(30).optional()
})
