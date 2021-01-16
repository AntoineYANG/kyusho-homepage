/*
 * @Author: Kanata You 
 * @Date: 2021-01-03 17:11:05 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-16 16:55:39
 */

import React, { useRef } from "react";
import { Card, TextNodeV3, HTMLNodeV3 } from "../cards/Card";
import { TextV3 } from "../TypesV3";
import { ButtonGroup } from "../interactive/ButtonGroup";
import { LinkButton } from "../interactive/LinkButton";
import { InputYou } from "../interactive/InputYou";
import { createPermissionCheck } from "../coveries/PermissionCheck";


/**
 * 这个页面级组件渲染对应地址 /storage .
 */
export const StoragePage: React.FC = () => {
    const btnReturn: {
        trigger?: (() => void) | undefined;
    } = {};

    const [state, setState] = React.useState<{
        portal: React.ReactPortal | null;
        url: string | null;
    }>({
        portal: null,
        url: null
    });

    const anchor = useRef() as React.RefObject<HTMLAnchorElement>;

    React.useEffect(() => {
        if (state.url === null) {
            setState({
                portal: createPermissionCheck({
                    hashCode: "be9f3f243a7b0569f2446233339257a024dee8ca0c435b9be22562ed2b3b61b6",
                    onExit: permitted => {
                        if (permitted) {
                            setState({
                                portal: null,
                                url: ""
                            });
                        } else {
                            btnReturn.trigger!();
                        }
                    }
                }),
                url: ""
            });
        }
    }, [state, setState, btnReturn, anchor]);

    return (
        <div style={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }} >
            { state.portal }
            <Card key="main"
            style={{
                backgroundColor: "rgb(24,31,40)",
                color: "rgb(160,201,175)"
            }} >
                <header>
                    <TextNodeV3>
                        {
                            new TextV3(
                                "资源",
                                "検索",
                                "GET"
                            )
                        }
                    </TextNodeV3>
                </header>
                <div key="bg0" id="input0"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "space-between"
                }} >
                    <InputYou
                    style={{
                        color: "rgb(70,178,254)"
                    }} />
                </div>
            </Card>
            <Card key="btn"
            style={{
                backgroundColor: "rgb(24,31,40)",
                color: "rgb(160,201,175)"
            }} >
                <ButtonGroup>
                    <div
                    style={{
                        display: "inline-block",
                        textAlign: "center",
                        cursor: "pointer",
                        minWidth: "2.8em",
                        padding: "0.2em 0.8em",
                        background: "rgb(24,31,40)",
                        color: "rgb(249,225,161)",
                        border: "1px solid rgb(249,225,161)"
                    }}
                    onClick={
                        () => {
                            const input = document.getElementById(
                                "input0"
                            )!.getElementsByTagName("input")[0] as HTMLInputElement;

                            anchor.current!.href = `/result/${ input.value }`;
                            anchor.current!.click();
                        }
                    } >
                        <HTMLNodeV3>
                            {
                                new TextV3(
                                    "apply",
                                    "apply",
                                    "apply"
                                )
                            }
                        </HTMLNodeV3>
                    </div>
                    <div key="a"
                    style={{
                        width: 0,
                        overflow: "hidden"
                    }} >
                        <a href={ state.url ?? "" } ref={ anchor } >1</a>
                    </div>
                    <LinkButton to="/" handle={ btnReturn }
                    style={{
                        fontSize: "100%"
                    }} >
                        {
                            new TextV3(
                                "回到主页",
                                "戻る",
                                "Return"
                            )
                        }
                    </LinkButton>
                </ButtonGroup>
            </Card>
        </div>
    );
};
