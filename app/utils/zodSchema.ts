import  {z} from 'zod';
export const onBoardingSchema =z.object({
    firstName:z.string().min(1,'firstname is required').max(10,'should max of 10char').nonempty(),
    lastName:z.string().nonempty().min(1,'lastname is required').max(10,'should max of 10char'),
    address:z.string().nonempty().min(1,'address is required').max(10,'should max of 30char')
})