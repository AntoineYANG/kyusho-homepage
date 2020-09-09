/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-01 19:34:27 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-01 23:10:18
 */

import React, { Component } from "react";
import { Shared } from "../methods/globals";
import { Article } from "../methods/typedict";
import Color from "../preference/Color";


export interface ListViewProps<ItemType> {
    title: string;
    maxPerPage: number;
    display: (item: ItemType, index: number) => JSX.Element;
    style?: React.CSSProperties;
};

export interface ListViewState<ItemType> {
    items: Array<ItemType>;
    pageId: number;
};

/**
 *
 *
 * @export
 * @class ListView
 * @extends {Component<ListViewProps<ItemType>, ListViewState<ItemType>>}
 * @template ItemType
 */
export class ListView<ItemType=Article> extends Component<
    ListViewProps<ItemType>, ListViewState<ItemType>
> {

    protected pageInput: React.RefObject<HTMLInputElement>;

    protected pageCount: number;

    public constructor(props: ListViewProps<ItemType>) {
        super(props);
        this.state = {
            items: [],
            pageId: 0
        };
        
        this.pageInput = React.createRef<HTMLInputElement>();
        this.pageCount = 0;
    }

    public render(): JSX.Element {
        this.pageCount = Math.ceil(this.state.items.length / this.props.maxPerPage);

        const data: Array<ItemType> = this.state.items.slice(
            this.state.pageId * this.props.maxPerPage,
            (this.state.pageId + 1) * this.props.maxPerPage
        );

        return (
            <div style={{
                color: Shared.theme.colortab.color,
                margin: "calc(10px + 4vh) 0 calc(10px + 2vh)",
                padding: "1vh 5vw",
                textAlign: "left",
                ...this.props.style
            }} >
                <div key="head" style={{
                    display: "inline-block",
                    minWidth: "40%"
                }} >
                    <h3>
                        { this.props.title }
                    </h3>
                </div>
                <div key="tools" style={{
                    display: "inline-flex",
                    minWidth: "60%",
                    alignItems: "stretch",
                    overflow: "hidden",
                    justifyContent: "end"
                }} >
                {
                    this.state.items.length ? (
                        <>
                            <button type="button" key="btn_first"
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
                                margin: "0 4px 0 auto",
                                padding: "2px 6px",
                                color: Color.setLightness(
                                    Shared.theme.colortab.background, 0.1
                                ),
                                cursor: "none",
                                border: `1px solid ${ Shared.theme.colortab.frontground2 }`,
                                backgroundColor: Shared.theme.colortab.frontground2
                            }}
                            onClick={
                                () => {
                                    const val: number = 0;
                                    if (val !== this.state.pageId) {
                                        this.setState({
                                            pageId: val
                                        });
                                    }
                                }
                            } >
                                «
                            </button>
                            <button type="button" key="btn_prev"
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
                                margin: "0 8px 0 2px",
                                padding: "2px 8px",
                                color: Color.setLightness(
                                    Shared.theme.colortab.background, 0.1
                                ),
                                cursor: "none",
                                border: `1px solid ${ Shared.theme.colortab.frontground2 }`,
                                backgroundColor: Shared.theme.colortab.frontground2
                            }}
                            onClick={
                                () => {
                                    const val: number = Math.max(
                                        1, this.state.pageId
                                    ) - 1;
                                    if (val !== this.state.pageId) {
                                        this.setState({
                                            pageId: val
                                        });
                                    }
                                }
                            } >
                                ‹
                            </button>
                            <input ref={ this.pageInput } type="number"
                            min={ 1 } max={ this.pageCount }
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
                            onKeyPress={
                                e => {
                                    if (e.which === 13) {
                                        // Enter
                                        const val: number = Math.max(
                                            1, Math.min(
                                                this.pageCount, parseInt(
                                                    this.pageInput.current?.value || (
                                                        this.state.pageId + 1
                                                    ).toString()
                                                )
                                            )
                                        ) - 1;
                                        if (val === this.state.pageId && this.pageInput.current) {
                                            this.pageInput.current.value = (val + 1).toString();
                                        } else {
                                            this.setState({
                                                pageId: val
                                            });
                                        }
                                    }
                                }
                            }
                            style={{
                                cursor: "none",
                                width: "3em",
                                textAlign: "center",
                                letterSpacing: "1px",
                                color: Shared.theme.colortab.frontground,
                                padding: "2px",
                                border: `1px solid ${ Shared.theme.colortab.frontground }`,
                                backgroundColor: Shared.theme.colortab.color.replace(
                                    "(", "a("
                                ).replace(
                                    ")", ",0.1)"
                                )
                            }} />
                            <button type="button" key="btn"
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
                                margin: "0 0.4em 0 0",
                                padding: "1px 3px",
                                color: Color.setLightness(
                                    Shared.theme.colortab.background, 0.1
                                ),
                                cursor: "none",
                                border: `1px solid ${ Shared.theme.colortab.frontground }`,
                                backgroundColor: Shared.theme.colortab.frontground
                            }}
                            onClick={
                                () => {
                                    const val: number = Math.max(
                                        1, Math.min(
                                            this.pageCount, parseInt(
                                                this.pageInput.current?.value || (
                                                    this.state.pageId + 1
                                                ).toString()
                                            )
                                        )
                                    ) - 1;
                                    if (val === this.state.pageId && this.pageInput.current) {
                                        this.pageInput.current.value = (val + 1).toString();
                                    } else {
                                        this.setState({
                                            pageId: val
                                        });
                                    }
                                }
                            } >
                                ➔
                            </button>
                            <label key="aft" style={{
                                cursor: "none",
                                marginRight: "6px",
                                whiteSpace: "nowrap"
                            }} >
                                { ` / ${ this.pageCount }` }
                            </label>
                            <button type="button" key="btn_next"
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
                                margin: "0 2px 0 8px",
                                padding: "2px 8px",
                                color: Color.setLightness(
                                    Shared.theme.colortab.background, 0.1
                                ),
                                cursor: "none",
                                border: `1px solid ${ Shared.theme.colortab.frontground2 }`,
                                backgroundColor: Shared.theme.colortab.frontground2
                            }}
                            onClick={
                                () => {
                                    const val: number = Math.min(
                                        this.pageCount, this.state.pageId + 2
                                    ) - 1;
                                    if (val !== this.state.pageId) {
                                        this.setState({
                                            pageId: val
                                        });
                                    }
                                }
                            } >
                                ›
                            </button>
                            <button type="button" key="btn_last"
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
                                margin: "0 4px",
                                padding: "2px 6px",
                                color: Color.setLightness(
                                    Shared.theme.colortab.background, 0.1
                                ),
                                cursor: "none",
                                border: `1px solid ${ Shared.theme.colortab.frontground2 }`,
                                backgroundColor: Shared.theme.colortab.frontground2
                            }}
                            onClick={
                                () => {
                                    const val: number = this.pageCount - 1;
                                    if (val !== this.state.pageId) {
                                        this.setState({
                                            pageId: val
                                        });
                                    }
                                }
                            } >
                                »
                            </button>
                        </>
                    ) : (
                        <></>
                    )
                }
                </div>
                <hr style={{
                    padding: "1px 0",
                    border: `1px solid ${ Shared.theme.colortab.border }`
                }} />
                <div style={{
                    margin: "20px 0",
                    minHeight: this.props.style?.minHeight || "10vh",
                    fontSize: "calc(8px + 1vmin)"
                }} >
                {
                    data.length === 0 && (
                        <p>
                            { "No results to display." }
                        </p>
                    )
                }
                {
                    data.map((article, idx) => {
                        return (
                            <div key={ `${ this.state.pageId },${ idx }` }
                            style={{
                                margin: "20px 0 14px",
                                borderLeft: `1px solid ${ Shared.theme.colortab.frontground }`,
                                borderBottom: `1px solid ${ Shared.theme.colortab.frontground3 }`
                            }} >
                                { this.props.display(
                                    article,
                                    this.state.pageId * this.props.maxPerPage + idx + 1
                                ) }
                            </div>
                        );
                    })
                }
                </div>
            </div>
        );
    }

    public componentDidMount(): void {
        if (this.pageInput.current) {
            this.pageInput.current.value = (this.state.pageId + 1).toString();
        }
    }

    public componentDidUpdate(): void {
        if (this.pageInput.current) {
            this.pageInput.current.value = (this.state.pageId + 1).toString();
        }
    }

}
