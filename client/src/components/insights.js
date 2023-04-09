import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Insights() {

    Axios.defaults.withCredentials = true;
    let navigate = useNavigate();
    var friends = useRef(null);
    const [fetched, setFetched] = useState(false);

    var friendsfetch = async () => {
        var wait = await Axios.get("/friendsfetch").then((response) => { return response });
        if (wait.data.message) {
            alert("There seems to be a problem with our server! Please hang on while we fix this!");
            return 0;
        } else {
            friends.current = wait.data.friends;
            setFetched(true);
        }
    }

    useEffect(() => {
        friendsfetch()
    }, [fetched]);

    return (
        fetched ?
            <div className='dashboard-body'>
                <div className='dashboard-main'>
                    <div className="today-classes">
                        <div>
                            <h2>Friends you can give insights on!</h2>
                        </div>
                        <div className='class-grid'>
                            {friends.current.rowCount !== 0 ? (
                                friends.current.rows.map((val, key) => {
                                    return (
                                        <div key={key}>
                                            <h2>{val.id1}</h2>
                                        </div>
                                    )
                                })
                            ) : (
                                <div>
                                    <h3>Haha funny!</h3></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            :
            <div>Hello</div>
    )
};