import { requireUser } from "../utils/hooks";
export default async function Dashboard() {
    const session = await requireUser();
    return (
        <div >
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard</p>
        </div>
    )
}