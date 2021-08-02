import React, {FC} from "react";

const EnsureFontLoaded: FC<{
    fontFamily: string;
}> = React.memo(props => {

    return (
        <div style={{
            opacity: 0,
            position: "fixed",
            top: -9999,
            left: -9999,
            fontFamily: props.fontFamily
        }}>
            {props.fontFamily}
        </div>
    );
});

export default EnsureFontLoaded;