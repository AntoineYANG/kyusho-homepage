/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-01 20:31:35 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-01 23:24:13
 */

import React from "react";
import { PaperInfo, Bookmark } from "./typedict";
import { Shared } from "./globals";


/**
 * 将论文信息转化为渲染实体.
 *
 * @param {PaperInfo} item
 * @param {number} index
 * @returns {JSX.Element}
 */
export const displayPaperInfo = (item: PaperInfo, index: number): JSX.Element => {
    return (
        <div style={{
            display: "flex",
            padding: "2px 0.5em 0.5em"
        }} >
            <div key="id" style={{
                width: "4em",
                paddingRight: "0.8em",
                textAlign: "end"
            }} >
                <label style={{
                    cursor: "none"
                }} >
                    { `[${ index }]` }
                </label>
            </div>
            <div key="info" style={{
                textAlign: "start"
            }} >
                <label style={{
                    cursor: "none"
                }} >
                    <span key="authors" >
                    {
                        item.authors.map((author, i) => {
                            if (author === "Zhendong Yang") {
                                return i === item.authors.length - 1 ? (
                                    `and ${ author }`
                                ) : (
                                    `${ author }`
                                );
                            }
                            return i === item.authors.length - 1 ? (
                                `and ${ author }`
                            ) : (
                                `${ author }`
                            );
                        }).join(", ") + ". "
                    }
                    </span>
                    <span key="title" >
                        { item.title + ". " }
                    </span>
                    <span key="publishingSpace" style={{
                        fontStyle: "italic"
                    }} >
                    {
                        item.publishingPlace + (
                            item.pageRange ? (
                                <span key="pageRange"
                                style={{
                                    fontStyle: "normal"
                                }} >
                                    { ", " + item.pageRange }
                                </span>
                            ) : ""
                        )
                    }
                    </span>
                    <span key="year" >
                        { ", " + item.year + ". " }
                    </span>
                </label>
            </div>
        </div>
    );
};

/**
 * 将书签信息转化为渲染实体.
 *
 * @param {Bookmark} item
 * @returns {JSX.Element}
 */
export const displayBookmark = (item: Bookmark): JSX.Element => {
    return (
        <div style={{
            display: "flex",
            padding: "2px 0.5em 0.5em"
        }} >
            <div key="id" style={{
                width: "4em",
                paddingRight: "0.8em",
                textAlign: "center"
            }} >
                <label style={{
                    cursor: "none",
                    color: Shared.theme.colortab[
                        item.type === "tech" ? "frontground"
                            : item.type === "design" ? "frontground2"
                                : "frontground3"
                    ]
                }} >
                    { `${ item.type }` }
                </label>
            </div>
            <div key="info" style={{
                textAlign: "start",
                marginLeft: "1em"
            }} >
                <a href={ item.url } target="new"
                style={{
                    cursor: "none",
                    textDecoration: "none"
                }}
                onMouseOver={
                    () => {
                        Shared.cursorState = "pointer";
                    }
                }
                onMouseOut={
                    () => {
                        Shared.cursorState = "normal";
                    }
                } >
                    <label style={{
                        cursor: "none",
                        color: Shared.theme.colortab.color
                    }} >
                        { item.title }
                    </label>
                </a>
            </div>
        </div>
    );
};
