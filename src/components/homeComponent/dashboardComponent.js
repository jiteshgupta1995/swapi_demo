import React from "react";
import PropTypes from "prop-types";

const dashboardComponent = ({ searchItem }) => {

    let list = null;
    const fontSize = 30;
    if (searchItem.length) {
        list = <div className="response">
            {searchItem.map((item,i) =>{
                let size = fontSize - i;
                let pop = item.population;
                if(item.population === "unknown"){
                    pop = "0";
                }
                return(
                    <div className="row" key={i}>
                        <div className="col-xs-3" style={{fontSize:size+'px'}}>
                            {item.name}
                        </div>
                        <div className="col-xs-3" style={{fontSize:size+'px'}}>
                            {pop}
                        </div>
                    </div>
                );
            })}
        </div>;
    } else {
        list = <div className="response">No result found.</div>;
    }

    return (
        <div className="row">
            {list}
        </div>
    );
};

dashboardComponent.propTypes = {
    searchItem: PropTypes.array.isRequired,
};

dashboardComponent.defaultProps = {
    searchItem: [],
};

export default dashboardComponent;