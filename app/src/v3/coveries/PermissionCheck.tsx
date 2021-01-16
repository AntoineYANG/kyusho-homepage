/*
 * @Author: Kanata You 
 * @Date: 2021-01-03 17:48:38 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-03 19:12:59
 */

import React, { useRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { Card, TextNodeV3 } from "../cards/Card";
import { TextV3 } from "../TypesV3";
import { InputYou } from "../interactive/InputYou";
import { ButtonGroup } from "../interactive/ButtonGroup";
import SHA256 from "../tools/SHA256";


export interface PermissionCheckProps {
    hashCode: string;
    onExit: (permitted: boolean) => void;
};

export const PermissionCheck: React.FC<PermissionCheckProps> = props => {
    const ref = useRef() as React.RefObject<HTMLDivElement>;

    useLayoutEffect(() => {
        const input = ref.current!.getElementsByTagName(
            "input"
        )[0] as HTMLInputElement;
        input.focus();
    });

    return (
        <div style={{
            zIndex: 99999,
            cursor: "not-allowed",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            overflow: "hidden"
        }} >
            <Card key="main"
            style={{
                padding: "3vh 6vw"
            }} >
                <div key="bg0" ref={ ref }
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "space-between",
                    cursor: "auto"
                }} >
                    <label>Security Check</label>
                    <InputYou
                    style={{
                        marginTop: "10px",
                        color: "rgba(35,89,127,0)",
                        caretColor: "rgb(0,0,0)"
                    }} />
                    <ButtonGroup style={{
                        marginTop: "20px"
                    }} >
                        <div key="apply"
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
                                const input = ref.current!.getElementsByTagName(
                                    "input"
                                )[0] as HTMLInputElement;

                                if (SHA256(input.value) === props.hashCode) {
                                    props.onExit(true);
                                }

                                input.value = "";
                                input.focus();
                            }
                        } >
                            <TextNodeV3>
                                {
                                    new TextV3(
                                        "apply",
                                        "apply",
                                        "apply"
                                    )
                                }
                            </TextNodeV3>
                        </div>
                        <div key="cancel"
                        style={{
                            display: "inline-block",
                            textAlign: "center",
                            cursor: "pointer",
                            minWidth: "2.8em",
                            padding: "0.1em 0.6em 0.12em",
                            color: "rgb(24,31,40)",
                            border: "1px solid rgb(24,31,40)"
                        }}
                        onClick={
                            () => {
                                const input = ref.current!.getElementsByTagName(
                                    "input"
                                )[0] as HTMLInputElement;
                                input.value = "";

                                props.onExit(false);
                            }
                        } >
                            <TextNodeV3>
                                {
                                    new TextV3(
                                        "cancel",
                                        "cancel",
                                        "cancel"
                                    )
                                }
                            </TextNodeV3>
                        </div>
                    </ButtonGroup>
                </div>
            </Card>
        </div>
    );
};

export const createPermissionCheck = (props: PermissionCheckProps) => {
    const portal = ReactDOM.createPortal((
        <PermissionCheck { ...props } />
    ), document.getElementById("root")!);
    
    return portal;
};
