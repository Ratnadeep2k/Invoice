import { DashboardBlock } from "../components/DashboardBlocks";
import { requireUser } from "../utils/hooks";
export default async function Dashboard() {
    const session = await requireUser();
    return (
       <>
            <DashboardBlock />
       </>
    )
}