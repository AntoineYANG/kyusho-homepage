/*
 * @Author: Kanata You 
 * @Date: 2020-12-11 21:06:02 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-16 16:55:22
 */

import React, { Component } from "react";
import { Card, TextNodeV3 } from "../cards/Card";
import { TextV3 } from "../TypesV3";
import { ButtonGroup } from "../interactive/ButtonGroup";
import { LinkButton } from "../interactive/LinkButton";


/**
 * 这个页面级组件渲染对应地址 /paper .
 * 
 * @export
 * @class Papers
 * @extends {Component<{}, {}>}
 */
export class Papers extends Component {

    public constructor(props: {}) {
        super(props);
        this.state = {};
    }
    
    public render(): JSX.Element {
        return (
            <div style={{
                height: "90vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }} >
                <Card key="main" >
                    <header>
                        <TextNodeV3>
                            {
                                new TextV3(
                                    "论文成果",
                                    "論文発表",
                                    "Papers"
                                )
                            }
                        </TextNodeV3>
                    </header>
                    <div key="bg0"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        justifyContent: "space-between"
                    }} >
                        <p>
                            {
                                `Visual Abstraction of Geographical Point Data with Spatial`
                                + ` Autocorrelations. Zhiguang Zhou, Xinlong Zhang, `
                            }
                            <b>{ "Zhendong Yang" }</b>
                            {
                                `, Yuhua Liu, Yuanyuan Chen, Ying Zhao, Wei Chen. IEEE VIS 2020.`
                            }
                        </p>
                        <p>
                            <a target="new"
                            href="https://virtual.ieeevis.org/paper_f-vast-1200.html" >
                                <TextNodeV3>
                                    {
                                        new TextV3(
                                            "在 VIS 2020 查看论文",
                                            "VIS 2020 で見る",
                                            "Watch on VIS 2020"
                                        )
                                    }
                                </TextNodeV3>
                            </a>
                        </p>
                    </div>
                </Card>
                <Card key="btn">
                    <ButtonGroup>
                        <LinkButton to="/" >
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
    }

    public componentDidMount(): void {}

};
