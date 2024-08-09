import ManageEstimate from './ManageEstimate'
import { useParams } from "react-router-dom"

const EditEstimate: React.FC = () => {
    const {estimateId} = useParams();
    return (
        <ManageEstimate estimateId={estimateId}/>
    )
}

export default EditEstimate