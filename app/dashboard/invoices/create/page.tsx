import { CreateInvoice } from "@/app/components/createInvoice";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";


async function  getUserData( userId :string ){
  const data =await prisma .user.findMany({
      where :{
        id: userId,
      },
      select:{
        firstName:true,
        lastName:true,
        address:true,
        email:true,
      }
  });
  return data[0];
   
}

export default async function createInvoices() {
  const session =await requireUser();
  const data =await getUserData(session.user?.id as string );
    return (
      <CreateInvoice 
      lastName={data?.lastName ?? ""}
      firstName={data?.firstName as string}
      address={data?.address as string}
      email={data?.email as string}
      />

    )
}