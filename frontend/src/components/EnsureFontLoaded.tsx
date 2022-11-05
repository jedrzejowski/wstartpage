import React, {FC, useEffect, useMemo} from "react";

const EnsureFontLoaded: FC<{
    fontFamily: string;
    href: string;
}> = React.memo(props => {

    const linkTag = useMemo(() => {
        const link = document.createElement("link")
        link.rel = "stylesheet";
        document.head.append(link);
        return link;
    }, []);

    useEffect(() => {
        linkTag.href = props.href;
    }, [props.href]);

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


