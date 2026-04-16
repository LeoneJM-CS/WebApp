import HTML from "./assets/HTML.png";
const course1="HTML";
function Course(props){
    return(
    <div className="card">
        <img src={HTML} alt={course1} />
        <p>Course: {props.name}</p>
        <p>Duration: {props.duration}</p>
        <p>Price: {props.price}</p>
    </div>
    );
}
export default Course;