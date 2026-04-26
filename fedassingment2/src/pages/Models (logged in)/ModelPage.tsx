import { useState } from "react";
import { getMyJobs} from "../../services/Jobservice";
export function ModelPage()
{
const [jobs, setJobs] = useState("");
const [error, setError] = useState("");

async function loadJobs() {
        try {
            const data = await getMyJobs();
            setJobs(data);
        } catch {
            setError("Kunne ikke hente jobs");
        }
    }
    return (
         <div>
            <h1>My Jobs</h1>
      </div>
    );
}










