/*
 * @Author: Kanata You 
 * @Date: 2020-12-06 15:10:22 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-16 20:13:28
 */

import React from "react";
import { Card, TextNodeV3 } from "./Card";
import { TextV3 } from "../TypesV3";
import { createStyle, useStyleWrapper } from "reacss";


const WelcomeCardStyle = createStyle({
    "div:first-child": {
        marginTop: "-10px"
    },
    "div:first-child > img": {
        width: "140px",
        height: "140px",
        borderRadius: "70px"
    },
    "label:nth-child(2)": {
        display: "block",
        margin: "0.5em auto",
        fontSize: "130%"
    },
    "label:nth-child(3)": {
        display: "block",
        margin: "0 auto",
        color: "rgba(114,123,132,0.8)"
    },
    "label:nth-child(5)": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "3em",
        fontSize: "90%",
        padding: "0.3em -4vw",
        color: "rgba(114,123,132,0.8)"
    },
    "label:nth-child(7)": {
        display: "block",
        padding: "1.2em 0.6em 0.2em",
        margin: "0.2em auto 0",
        fontSize: "calc(12px + 0.4vmax)"
    },
    "div:nth-child(8)": {
        margin: "2vh auto",
        width: "70%",
        minWidth: "250px",
        padding: "0.6vh 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    },
    "div:nth-child(8) > div": {
        margin: "0 calc(1vw - 4px)",
        padding: "0 2px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1
    },
    "label:nth-child(9)": {
        display: "block",
        padding: "0.2em 0.6em",
        margin: "0.2em auto 0",
        fontSize: "calc(12px + 0.4vmax)"
    },
    "div:nth-child(10)": {
        margin: "1vh auto",
        width: "70%",
        minWidth: "250px",
        padding: "0.6vh 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    },
    "div:nth-child(10) > div": {
        margin: "0 calc(1vw - 4px)",
        padding: "0 2px",
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between"
    },
    "div:nth-child(10) > div > svg": {
        transform: "translateY(1.2px)",
        marginRight: "8px"
    },
    "div:nth-child(10) > div > svg > line": {
        stroke: "rgb(255,127,127)",
        strokeWidth: 6,
        pointerEvents: "none"
    },
    "div:nth-child(10) > div > svg > path": {
        fill: "none",
        stroke: "rgb(233,60,46)",
        strokeWidth: 6,
        pointerEvents: "none"
    },
    "div:nth-child(10) > div > code": {
        fontSize: "80%",
        borderBottom: "1px solid #8888",
        padding: "3px 8px",
        flex: 1,
        textAlign: "left",
        letterSpacing: "0.2px"
    }
});

export const WelcomeCard: React.FC<{}> = _props => {
    const StyleWrapper = useStyleWrapper(WelcomeCardStyle);

    return (
        <Card key="content" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "6vh",
            paddingBottom: "8vh"
        }} >
            <StyleWrapper>
                <div>
                    <img src="/images/avatar.png" alt="avatar" />
                </div>
                <label key="1" >
                    <TextNodeV3>
                        {
                            new TextV3(
                                "杨振东",
                                "楊かなた",
                                "Antoine Yang"
                            )
                        }
                    </TextNodeV3>
                </label>
                <label key="prof" >
                    <TextNodeV3>
                        {
                            new TextV3(
                                "学生，中国",
                                "大学生　中国",
                                "Student, China"
                            )
                        }
                    </TextNodeV3>
                </label>
                <br />
                <label key="belong" >
                    <TextNodeV3>
                        {
                            new TextV3(
                                "浙江财经大学-信息管理与人工智能学院",
                                "浙江財政経済大学　情報科学学部",
                                "School of Information Management and Artifitial Intelligence, \n"
                                    + "Zhejiang University of Finance and Economics"
                            )
                        }
                    </TextNodeV3>
                </label>
                <br />
                <label key="communities" >
                    <TextNodeV3>
                        {
                            new TextV3(
                                "我的社区",
                                "プラットフォーム",
                                "COMMUNITIES"
                            )
                        }
                    </TextNodeV3>
                </label>
                <div key="links" >
                    <div key="github" title="GitHub: @Kanata You" >
                        <a href="https://github.com/AntoineYANG" target="new" >
                            <svg height="32" width="32" viewBox="0 0 16 16" version="1.1"
                            aria-hidden="true"
                            style={{
                                transform: "translateY(1.2px)",
                                background: "white"
                            }} >
                                <path fillRule="evenodd"
                                d={
                                    "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-"
                                    + ".17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-"
                                    + ".94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-"
                                    + ".01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.8"
                                    + "7.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2."
                                    + "15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.3"
                                    + "2-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82"
                                    + ".44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.8"
                                    + "7 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01"
                                    + " 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                                }
                                style={{
                                    fill: "rgb(36,41,46)",
                                    pointerEvents: "none"
                                }} />
                            </svg>
                        </a>
                    </div>
                    <div key="npm" title="npm: @kanatayou" >
                        <a href="https://www.npmjs.com/~kanatayou" target="new" >
                            <svg height="32" width="32" viewBox="0 0 780 250">
                                <path d={
                                    "M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z "
                                    + "M480,0v200h100V50h50v150h50V50h50v150h50V0H480z "
                                    + "M0,200h100V50h50v150h50V0H0V200z"
                                }
                                style={{
                                    fill: "rgb(202,0,0)"
                                }} />
                            </svg>
                        </a>
                    </div>
                    <div key="zhihu" title="知乎: @不愿" >
                        <a href="https://www.zhihu.com/people/bu-yuan-86-22" target="new" >
                            <img src="./images/zhihu.jpeg" alt="知乎" width="32" height="32"
                            onDragStart={ e => e.preventDefault() }
                            style={{
                                transform: "translateY(1.6px)"
                            }} />
                        </a>
                    </div>
                </div>
                <label key="contact" >
                    <TextNodeV3>
                        {
                            new TextV3(
                                "联系我",
                                "MAIL",
                                "CONCACT"
                            )
                        }
                    </TextNodeV3>
                </label>
                <div key="mail" >
                    <div key="mail" >
                        <svg height="20" width="20" version="1.1"
                        aria-hidden="true" viewBox="0 0 28 28" >
                            <line key="left" x1="3" x2="3" y1="23" y2="8.5" />
                            <line key="right" x1="25" x2="25" y1="23" y2="8.5" />
                            <path key="center" d="M2,6 L14,14 L26,6" />
                        </svg>
                        <code>
                            antoineyang99@gmail.com
                        </code>
                    </div>
                </div>
            </StyleWrapper>
        </Card>
    );
};
