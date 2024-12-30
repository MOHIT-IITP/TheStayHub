import { useParams } from "react-router-dom";

export default function BookingPage(){
    const {id} = useParams();
    return (
        <div>
            This is single Booking Page: {id}
        </div>
    );
}