
import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>JE Home moi êtree</h1>
            <h1 class="text-sm font-bold underline">
                Hello world!
            </h1>
            <button onClick={() => navigate("/Login")}> test vers poudlard</button>
        </div>
    );
}