/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-05 15:50:49 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-09 22:34:59
 */

import React from "react";
import $ from "jquery";
import { PageBody, Product, Role } from "../methods/typedict";
import { Shared } from "../methods/globals";
import { HomeButton } from "../compo/HomeButton";
import { find } from "../methods/arrayhelper";
import { InfoSet } from "../constant/InfoSet";
import Color from "../preference/Color";
import { InlineHTML } from "../compo/InlineHTML";
import { BilibiliFlv } from "../compo/BilibiliFlv";
import { Navigator } from "../compo/Navigator";
import { ScrollTop } from "../compo/ScrollTop";
import { ContactMe } from "../compo/ContactMe";


/**
 * 这个页面级组件渲染单个作品的展示信息.
 * 
 * @export
 * @class ProductDetail
 * @extends {PageBody<{}>}
 */
export class ProductDetail extends PageBody<{}> {

    protected url: string;
    protected data: Product;

    public constructor(props: {}) {
        super(props);
        this.state = {};

        const params: RegExpExecArray | null = /(?<=(\/#\/product\/))[0-9]+(?!.)/.exec(
            window.location.href
        );
        this.url = params ? params[0] : "undefined";
        this.data = find(InfoSet.products, e => e.id === this.url)!;
    }
    
    public render(): JSX.Element {
        const colorf = (role: Role): string => {
            return role === "individual" ? "rgb(255,176,255)"
                : role === "leader" ? "rgb(254,241,135)"
                    : role === "engineer" ? "rgb(235,81,82)"
                        : role === "contributor" ? "rgb(148,243,237)"
                            : "rgb(176,217,246)"
        };
        
        return (
            <>
                <Navigator>
                    <HomeButton active={ true } />
                    <ScrollTop />
                    <ContactMe />
                </Navigator>
                <div style={{
                    color: Shared.theme.colortab.color,
                    margin: "calc(10px + 4vh) 0 calc(10px + 2vh)",
                    padding: "1vh 5vw"
                }} >
                    <div
                    style={{
                        display: "block",
                        border: "1px solid " + Shared.theme.colortab.border.replace(
                            "(", "a("
                        ).replace(
                            ")", ",0.2)"
                        ),
                        margin: "4vh 3vw",
                        padding: "1em 0 6vh",
                        fontSize: "calc(6px + 1.6vmin)"
                    }} >
                        <div key="name"
                        style={{
                            display: "block",
                            backgroundColor: Shared.theme.colortab.border,
                            color: Shared.theme.colortab.base
                        }} >
                            <h2
                            style={{
                                padding: "0.2em 2em",
                                textAlign: "left",
                                marginBottom: "2.4em"
                            }} >
                                { this.data.name }
                            </h2>
                        </div>
                        <div key="head-all" style={{
                            display: "block",
                            margin: "0 4%",
                            color: Shared.theme.colortab.border
                        }} >
                            <h3
                            style={{
                                textAlign: "left"
                            }} >
                                Information
                            </h3>
                        </div>
                        <div key="intro"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            margin: "0 4%",
                            justifyContent: "center"
                        }} >
                            <div key="left"
                            style={{
                                minWidth: "30%",
                                display: "inline-flex",
                                padding: "3%",
                                border: "1px solid " + Shared.theme.colortab.border,
                                justifyContent: "center",
                                flex: 1
                            }} >
                                <img src={ `./images/product_${ this.data.id }.png` }
                                alt={ `product_${ this.data.id }` }
                                onDragStart={ e => e.preventDefault() }
                                style={{
                                    display: "block",
                                    maxWidth: "100%",
                                    objectFit: "contain",
                                    backgroundColor: "#000000"
                                }} />
                            </div>
                            <div key="right"
                            style={{
                                minWidth: "61%",
                                textAlign: "left",
                                display: "inline-flex",
                                wordBreak: "break-all",
                                flexDirection: "column"
                            }} >
                                <div key="name"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flex: 1
                                }} >
                                    <label key="<"
                                    style={{
                                        cursor: "none",
                                        maxWidth: "20vw",
                                        minWidth: "18%",
                                        textAlign: "center",
                                        padding: "0.5em",
                                        border: "1px solid " + Shared.theme.colortab.border
                                    }} >
                                        Name
                                    </label>
                                    <label key=">"
                                    style={{
                                        cursor: "none",
                                        border: "1px solid " + Shared.theme.colortab.border,
                                        padding: "0.5em",
                                        flex: "auto",
                                        fontWeight: "bold"
                                    }} >
                                        { this.data.name }
                                    </label>
                                </div>
                                <div key="avatar"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flex: 1
                                }} >
                                    <label key="<"
                                    style={{
                                        cursor: "none",
                                        maxWidth: "20vw",
                                        minWidth: "18%",
                                        textAlign: "center",
                                        padding: "0.5em",
                                        border: "1px solid " + Shared.theme.colortab.border,
                                        borderBottom: "none"
                                    }} />
                                    <label key=">"
                                    style={{
                                        cursor: "none",
                                        border: "1px solid " + Shared.theme.colortab.border,
                                        padding: "0.5em",
                                        flex: "auto",
                                        fontWeight: "bold",
                                        borderBottom: "none"
                                    }} >
                                        <img src={ this.data.avatarURL }
                                        width="48px" height="48px"
                                        alt="avatar"
                                        onDragStart={ e => e.preventDefault() }
                                        style={{
                                            display: "block",
                                            objectFit: "contain",
                                            backgroundColor: "#000000"
                                        }} />
                                    </label>
                                </div>
                                <div key="role"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flex: 1
                                }} >
                                    <label key="<"
                                    style={{
                                        cursor: "none",
                                        maxWidth: "20vw",
                                        minWidth: "18%",
                                        textAlign: "center",
                                        padding: "0.5em",
                                        border: "1px solid " + Shared.theme.colortab.border,
                                        borderTop: "none"
                                    }} >
                                        Role
                                    </label>
                                    <label key=">"
                                    style={{
                                        cursor: "none",
                                        border: "1px solid " + Shared.theme.colortab.border,
                                        padding: "0.5em",
                                        flex: "auto",
                                        color: colorf(this.data.role)
                                    }} >
                                        { this.data.role }
                                    </label>
                                </div>
                                <div key="period"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flex: 1
                                }} >
                                    <label key="<"
                                    style={{
                                        cursor: "none",
                                        maxWidth: "20vw",
                                        minWidth: "18%",
                                        textAlign: "center",
                                        padding: "0.5em",
                                        border: "1px solid " + Shared.theme.colortab.border
                                    }} >
                                        Period
                                    </label>
                                    <label key=">"
                                    style={{
                                        cursor: "none",
                                        border: "1px solid " + Shared.theme.colortab.border,
                                        padding: "0.5em",
                                        flex: "auto"
                                    }} >
                                    {
                                        `${ this.data.beginTime[0] }/${ this.data.beginTime[1] }`
                                        + " ~ "
                                        + (
                                            this.data.closeTime === "-" ? "" : (
                                                `${
                                                    this.data.closeTime[0]
                                                }/${
                                                    this.data.closeTime[1]
                                                }`
                                            )
                                        )
                                    }
                                    </label>
                                </div>
                                <div key="GitHub"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flex: 1
                                }} >
                                    <label key="<"
                                    style={{
                                        cursor: "none",
                                        maxWidth: "20vw",
                                        minWidth: "18%",
                                        textAlign: "center",
                                        padding: "0.5em",
                                        border: "1px solid " + Shared.theme.colortab.border
                                    }} >
                                        GitHub
                                    </label>
                                    <label key=">"
                                    style={{
                                        cursor: "none",
                                        border: "1px solid " + Shared.theme.colortab.border,
                                        padding: "0.5em",
                                        flex: "auto"
                                    }} >
                                    {
                                        this.data.githubURL ? (
                                            <a href={ this.data.githubURL } target="new"
                                            onMouseOver={
                                                () => {
                                                    Shared.cursorState = "pointer";
                                                }
                                            }
                                            onMouseOut={
                                                () => {
                                                    Shared.cursorState = "normal";
                                                }
                                            }
                                            style={{
                                                cursor: "none",
                                                color: Color.interpolate(
                                                    Shared.theme.colortab.color,
                                                    Shared.theme.colortab.frontground
                                                )
                                            }} >
                                                { this.data.githubURL }
                                            </a>
                                        ) : (
                                            <span style={{
                                                fontStyle: "italic"
                                            }} >
                                                Not released
                                            </span>
                                        )
                                    }
                                    </label>
                                </div>
                                <div key="techs"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flex: 1
                                }} >
                                    <label key="<"
                                    style={{
                                        cursor: "none",
                                        maxWidth: "20vw",
                                        minWidth: "18%",
                                        textAlign: "center",
                                        padding: "0.5em",
                                        border: "1px solid " + Shared.theme.colortab.border
                                    }} >
                                        Techs
                                    </label>
                                    <label key=">"
                                    style={{
                                        cursor: "none",
                                        border: "1px solid " + Shared.theme.colortab.border,
                                        padding: "0.5em",
                                        flex: "auto"
                                    }} >
                                    {
                                        this.data.techs.map((tech, i) => {
                                            return (
                                                <label key={ i }
                                                style={{
                                                    display: "inline-block",
                                                    cursor: "none",
                                                    margin: "0 0.5em 0.1em",
                                                    color: Color.setLightness(
                                                        Shared.theme.colortab.frontground,
                                                        0.9
                                                    ),
                                                    padding: "0 0.4em",
                                                    borderRight: `1px solid ${
                                                        Shared.theme.colortab.frontground
                                                    }`,
                                                    borderLeft: `1px solid ${
                                                        Shared.theme.colortab.frontground
                                                    }`,
                                                    borderRadius: "6px 2px"
                                                }} >
                                                    { tech }
                                                </label>
                                            );
                                        })
                                    }
                                    </label>
                                </div>
                            </div>
                        </div>
                        {
                            this.data.videoURL ? (
                                <div key="video"
                                style={{
                                    margin: "2em 4%",
                                    padding: "1em 1vmin",
                                    cursor: "default"
                                }}
                                onMouseOver={
                                    () => {
                                        Shared.cursorState = "origin";
                                    }
                                }
                                onMouseOut={
                                    () => {
                                        Shared.cursorState = "normal";
                                    }
                                } >
                                    <div key="head" style={{
                                        display: "block",
                                        color: Shared.theme.colortab.border
                                    }} >
                                        <h3
                                        style={{
                                            textAlign: "left"
                                        }} >
                                            Video
                                        </h3>
                                    </div>
                                    <BilibiliFlv url={ this.data.videoURL } type="mp4" />
                                </div>
                            ) : null
                        }
                        <div key="description"
                        style={{
                            display: "block",
                            margin: "2em 4% 1em",
                            textAlign: "left",
                            padding: "1em 1vmin",
                            lineHeight: "2em"
                        }} >
                            <div key="head" style={{
                                display: "block",
                                color: Shared.theme.colortab.border
                            }} >
                                <h3
                                style={{
                                    textAlign: "left"
                                }} >
                                    Description
                                </h3>
                            </div>
                            <InlineHTML html={ this.data.description } />
                        </div>
                        <div key="langs"
                        style={{
                            display: "block",
                            margin: "1em 4% 2em",
                            textAlign: "left",
                            padding: "1em 1vmin",
                            lineHeight: "2em"
                        }} >
                            <div key="head" style={{
                                display: "block",
                                color: Shared.theme.colortab.border
                            }} >
                                <h3
                                style={{
                                    textAlign: "left"
                                }} >
                                    Languages
                                </h3>
                            </div>
                            {
                                this.data.languages.map((d, i) => {
                                    return (
                                        <label key={ i }
                                        style={{
                                            display: "inline-block",
                                            cursor: "none",
                                            margin: "0.5em 0.5em",
                                            color: Color.setLightness(
                                                Shared.theme.colortab.frontground2,
                                                0.9
                                            ),
                                            padding: "0 0.8em",
                                            borderTop: `1px solid ${
                                                Shared.theme.colortab.frontground2
                                            }`,
                                            borderBottom: `1px solid ${
                                                Shared.theme.colortab.frontground2
                                            }`,
                                            borderRadius: "10px 4px"
                                        }} >
                                            <span key="name"
                                            style={{
                                                fontWeight: "bold"
                                            }} >
                                                { d.name }
                                            </span>
                                            <span key="rate"
                                            style={{
                                                color: Shared.theme.colortab.color,
                                                marginLeft: "1em"
                                            }} >
                                                { `${ (
                                                    d.rate * 100
                                                ).toFixed(2) }%` }
                                            </span>
                                        </label>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }

    public componentDidMount(): void {
        Shared.cursorState = "normal";
        $(window).scrollTop(0);
    }

    public componentDidCatch(): void {
        const root: string = /.*\/#\//.exec(window.location.href)![0];
        window.location.href = root + "not_found/" + (this.url || "undefined");
    }

};
