import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

import { addEducationTimeline, getUser } from "../../../actions/User";
import InputBox from "./InputBox/InputBox";
import TimeLine from "./SubComponents/TimeLIne/TimeLine";

const EducationTimeLine = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startdate, setStartdate] = useState("");
    const [enddate, setEnddate] = useState("");
    const [buttonText, setButtonText] = useState("Add");

    const { message, error, loading } = useSelector((state) => state.update);
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText("Adding...");
        await dispatch(addEducationTimeline(title, description, startdate, enddate));
        dispatch(getUser());
        setButtonText("Added");
        setTimeout(()=>setButtonText("Add"), 2000);
    };

    // display messages and errors from backend in all components
    useEffect(() => {
        console.log(error, message);
        if (error) {
            toast.error(error);
            dispatch({ type: "CLEAR_ERROR" });
        }
        if (message) {
            console.log(message);
            toast.success(message);
            dispatch({ type: "CLEAR_MESSAGE" });
        }
    }, [error, message, dispatch]);

    return (
        <section className="contact login adminpanelcontainer" id="connect">
                <h2>Manage Education Timeline</h2>

                <div className="adminpanel-form">
                    <div className="admin-container-inputbox">
                        <InputBox
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <InputBox
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <InputBox
                            label="Start Date"
                            value={startdate}
                            onChange={(e) => setStartdate(e.target.value)}
                            isDate={true}
                        />
                        <InputBox
                            label="End Date"
                            value={enddate}
                            onChange={(e) => setEnddate(e.target.value)}
                            isDate={true}
                        />
                    </div>
                    <div className="btncontiner">
                        <button
                            type="submit"
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {buttonText}
                        </button>
                        <NavLink to='/admin'>
                            <button disabled={loading}>
                                Back
                            </button>
                        </NavLink>
                    </div>
                </div>
                          
                <div className="all-timeline-details">
                    {user?.educationTimeline?.map((item) => <TimeLine key={item._id} item={item}  i={1} />)}
                </div>
        </section>
    );
};

export default EducationTimeLine;
