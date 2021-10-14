import React from "react";
import {LoadingTheme} from "./themes";

interface ILoadingProps {
    /** Visible. */
    visible: boolean;

    /** Message. */
    message?: React.ReactNode;

    /** Children. */
    children?: React.ReactNode;
}

function DefaultSpinner () {
    return (
        <div className={LoadingTheme.loader}></div>
    )
}

export function Loading({ visible, children, message = <DefaultSpinner /> }: ILoadingProps)  {

    return (
        <div>
            {visible && (
                <div className={LoadingTheme.loaderBg}>
                    {message}
                </div>
            )}
            {children}
        </div>
    )

}