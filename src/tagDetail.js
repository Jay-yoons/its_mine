import React, {useState} from "react";
import tagData from "./tagData";
import { useParams } from "react-router-dom";

function TagDetail({TagId}) {
    const {id} = useParams();

    const TagTitle = tagData.map(tag => tag.id);
    
    
    return(
        <div className="tagmain">
            <h1 className="tagId">
                {TagTitle[id]}
                언더그라운드
            </h1>
        </div>
    )
}
export default TagDetail;