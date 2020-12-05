/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-02 14:18:31 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-02 15:45:27
 */

import React from "react";
import { Shared } from "../methods/globals";
import Color from "../preference/Color";


export interface InterestViewProps {
    style?: React.CSSProperties;
};

export const InterestView = (props: InterestViewProps): JSX.Element => {
    const techs: Array<string> = [
        "C", "C++", "CSS", "Express", "HTML", "JavaScript", "Node.js", "React", "typescript",
        "python"
    ];

    const fields: Array<string> = [
        "Data Visualization", "Deep Learning", "Front-end", "Machine Learning", "NLP"
    ];

    return (
        <div style={{
            color: Shared.theme.colortab.color,
            margin: "calc(10px + 4vh) 0 calc(10px + 2vh)",
            padding: "1vh 5vw",
            textAlign: "left",
            ...props.style
        }} >
            <div key="techs-head" >
                <h3>
                    { `Technologies of Interest` }
                </h3>
            </div>
            <div key="techs-items" style={{
                display: "flex",
                flexWrap: "wrap",
                marginBottom: "3.2em"
            }} >
            {
                techs.map((item, i) => {
                    return (
                        <label key={ i } style={{
                            cursor: "none",
                            margin: "0.4em 0.8em",
                            color: Color.setLightness(
                                Shared.theme.colortab.border, 0.9
                            ),
                            padding: "0 0.4em",
                            borderRight: `1px solid ${ Shared.theme.colortab.border }`,
                            borderLeft: `1px solid ${ Shared.theme.colortab.border }`,
                            borderRadius: "6px 2px"
                        }} >
                            { item }
                        </label>
                    );
                })
            }
            </div>

            <div key="fields-head" >
                <h3>
                    { `Fields of Interest` }
                </h3>
            </div>
            <div key="fields-items" style={{
                display: "flex",
                flexWrap: "wrap"
            }} >
            {
                fields.map((item, i) => {
                    return (
                        <label key={ i } style={{
                            cursor: "none",
                            margin: "0.4em 0.8em",
                            color: Color.setLightness(
                                Shared.theme.colortab.frontground, 0.9
                            ),
                            padding: "0 0.6em",
                            borderRight: `1px solid ${ Shared.theme.colortab.frontground }`,
                            borderLeft: `1px solid ${ Shared.theme.colortab.frontground }`,
                            borderRadius: "6px 2px"
                        }} >
                            { item }
                        </label>
                    );
                })
            }
            </div>
        </div>
    );
};
