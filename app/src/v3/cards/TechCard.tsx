/*
 * @Author: Kanata You 
 * @Date: 2020-12-08 00:10:48 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-08 00:29:53
 */

import React from "react";
import { Card, TextNodeV3 } from "./Card";
import { TextV3 } from "../TypesV3";


export const TechCard: React.FC<{}> = _props => (
    <Card>
        <header>
            <TextNodeV3>
                {
                    new TextV3(
                        "技术栈",
                        "テクスタック (Tech Stack)",
                        "Tech Stack"
                    )
                }
            </TextNodeV3>
        </header>
        <div style={{
            marginBottom: "3.2em",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
        }} >
            {
                ["React", "typescript", "JavaScript", "HTML", "python3", "Node.js", "CSS", "C", "C++", "Express"].map(d => (
                    <label style={{
                        display: "block",
                        margin: "0.4em 0.8em",
                        padding: "0px 0.4em",
                        borderRight: "1px solid rgb(20,20,20)",
                        borderLeft: "1px solid rgb(20,20,20)",
                        borderRadius: "6px 2px"
                    }}>
                        { d }
                    </label>
                ))
            }
        </div>
    </Card>
);
