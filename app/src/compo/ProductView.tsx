/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-05 15:10:09 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-05 23:12:15
 */

import React, { Component } from "react";
import { Shared } from "../methods/globals";
import { ProductId, Role } from "../methods/typedict";
import { find } from "../methods/arrayhelper";
import { InfoSet } from "../constant/InfoSet";
import Color from "../preference/Color";
import { InlineHTML } from "./InlineHTML";
import { LanguageChart } from "./LanguageChart";
import { SettingRadio } from "./SettingItem";


export interface ProductViewProps {
    title: string;
    style?: React.CSSProperties;
};

export interface ProductViewState {
    items: Array<ProductId>;
    detail: boolean;
};

/**
 * 这个组件由于渲染作品集合.
 *
 * @export
 * @class ProductView
 * @extends {Component<ProductViewProps, ProductViewState>}
 */
export class ProductView extends Component<ProductViewProps, ProductViewState> {

    public constructor(props: ProductViewProps) {
        super(props);
        this.state = {
            items: [],
            detail: true
        };
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
            <div style={{
                color: Shared.theme.colortab.color,
                margin: "calc(10px + 3vh) calc(20px + 8vw)",
                padding: "calc(4px + 2vh) calc(-60px + 6vmax)",
                ...this.props.style
            }} >
                <div key="header" style={{
                    display: "flex"
                }} >
                    <div key="head" style={{
                        display: "inline-block",
                        minWidth: "40%"
                    }} >
                        <h3 style={{
                            textAlign: "left"
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
                            { this.props.title }
                        </h3>
                    </div>
                    <div key="tools" style={{
                        display: "inline-flex",
                        minWidth: "60%",
                        alignItems: "center",
                        overflow: "hidden",
                        justifyContent: "end"
                    }} >
                        <label style={{
                            cursor: "none"
                        }} >
                            Detail
                        </label>
                        <SettingRadio name="" default={ this.state.detail }
                        formatter={ () => "" }
                        valueChanged={
                            b => {
                                this.setState({
                                    detail: b
                                });
                            }
                        } />
                    </div>
                </div>
                <hr style={{
                    padding: "1px 0",
                    border: `1px solid ${ Shared.theme.colortab.border }`,
                    marginTop: 0
                }} />
                <div style={{
                    margin: "20px 0",
                    minHeight: this.props.style?.minHeight || "300px",
                    fontSize: "calc(8px + 1vmin)",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around" // 分散对齐
                }} >
                {
                    this.state.items.map(id => {
                        const item = find(InfoSet.products, e => e.id === id);
                        if (!item) {
                            return (
                                <></>
                            );
                        }
                        return (
                            <div key={ id } style={{
                                display: "inline-block",
                                width: "calc(150px + 16vmin)",
                                margin: "1.2vmax 1.6vmin",
                                padding: "3vmin 4vmin"
                            }} >
                                <img src={ `./images/product_${ id }.png` }
                                alt={ `product_${ id }` }
                                onDragStart={ e => e.preventDefault() }
                                style={{
                                    display: "block",
                                    width: "calc(150px + 16vmin)",
                                    height: "calc(81.82px + 8.72vmin)",
                                    marginBottom: "calc(4px + 0.5em)",
                                    objectFit: "contain",
                                    backgroundColor: "#000000"
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
                                }
                                onClick={
                                    () => {
                                        this.jumpTo(item.id);
                                    }
                                } />
                                <div key="head" style={{
                                    display: "flex"
                                }} >
                                    <div key="avatar"
                                    style={{
                                        display: "inline-block",
                                        width: "28px"
                                    }} >
                                        <img src={ item.avatarURL }
                                        alt={ `avatar` }
                                        onDragStart={ e => e.preventDefault() }
                                        style={{
                                            display: "block",
                                            width: "28px",
                                            height: "28px",
                                            objectFit: "contain",
                                            backgroundColor: "#000000",
                                            borderRadius: "14px"
                                        }} />
                                    </div>
                                    <div key="info"
                                    style={{
                                        display: "inline-block",
                                        width: "calc(112px + 16vmin)",
                                        marginLeft: "8px"
                                    }} >
                                        <label key="name" style={{
                                            cursor: "none",
                                            fontWeight: "bold",
                                            height: "2.5em",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 2,
                                            overflow: "hidden",
                                            textAlign: "left"
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
                                        }
                                        onClick={
                                            () => {
                                                this.jumpTo(item.id);
                                            }
                                        } >
                                            { item.name }
                                        </label>
                                    </div>
                                </div>
                            {
                                this.state.detail ? (
                                    <div key="more" >
                                        <div key="base" style={{
                                            display: "flex",
                                            margin: "0.1em 0 0.4em",
                                            justifyContent: "space-between" // 两端对齐
                                        }} >
                                            <label key="role" style={{
                                                cursor: "none",
                                                fontSize: "80%",
                                                display: "inline-block",
                                                color: colorf(item.role),
                                                border: "1px solid " + colorf(item.role),
                                                borderRadius: "6px",
                                                overflow: "hidden",
                                                padding: "0 0.3em",
                                                margin: "0 0.4em"
                                            }} >
                                                { item.role }
                                            </label>
                                            <label key="time" style={{
                                                cursor: "none",
                                                fontSize: "80%",
                                                display: "inline-block",
                                                color: Color.setLightness(
                                                    Shared.theme.colortab.color,
                                                    0.5
                                                ),
                                                overflow: "hidden",
                                                opacity: 0.8
                                            }} >
                                            {
                                                `${ item.beginTime[0] }/${ item.beginTime[1] }`
                                                + " ~ "
                                                + (
                                                    item.closeTime === "-" ? "" : (
                                                        `${ item.closeTime[0] }/${ item.closeTime[1] }`
                                                    )
                                                )
                                            }
                                            </label>
                                        </div>
                                        <div key="techs" style={{
                                            fontSize: "80%",
                                            color: Color.setLightness(
                                                Shared.theme.colortab.color,
                                                0.5
                                            ),
                                            height: "1.3em",
                                            margin: "0.1em 0",
                                            textAlign: "left",
                                            overflow: "hidden"
                                        }} >
                                        {
                                            item.techs.map((tech, i) => {
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
                                        </div>
                                        <LanguageChart data={ item.languages } />
                                        <label key="description" style={{
                                            cursor: "none",
                                            fontSize: "90%",
                                            color: Color.setLightness(
                                                Shared.theme.colortab.color,
                                                0.5
                                            ),
                                            height: "3.5em",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 3,
                                            overflow: "hidden",
                                            textAlign: "left"
                                        }} >
                                            <InlineHTML
                                            html={ item.description.split(
                                                /<br *\/?>/
                                            ).join("&nbsp;&nbsp;") } />
                                        </label>
                                    </div>
                                ) : null
                            }
                            </div>
                        );
                    })
                }
                </div>
            </div>
        );
    }

    /**
     * 跳转页面查看详情.
     *
     * @protected
     * @param {string} id
     * @memberof ProductView
     */
    protected jumpTo(id: string): void {
        const root: string = /.*\/#\//.exec(window.location.href)![0];
        window.location.href = root + "product/" + id;
    }

};
