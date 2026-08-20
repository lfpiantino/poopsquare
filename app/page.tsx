import { getChatGPTUser } from "./chatgpt-auth";
import PoopSquareApp from "./PoopSquareApp";
export const dynamic="force-dynamic";
export default async function Page(){const user=await getChatGPTUser();return <PoopSquareApp user={user?{name:user.displayName,email:user.email}:null}/>}
