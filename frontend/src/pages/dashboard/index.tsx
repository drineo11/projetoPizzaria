import { canSSRAuthenticated } from "../../utils/canSSRAuthenticated";

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export const getServerSideProps = canSSRAuthenticated(async (ctx) => {
    return {
        props: {},
    };
})
