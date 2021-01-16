/*
 * @Author: Kanata You 
 * @Date: 2020-12-02 20:44:30 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2021-01-16 21:01:16
 */

import React, { Component } from "react";
import { PageFlow } from "../containers/PageFlow";
import { WelcomeCard } from "../cards/WelcomeCard";
import { Card, TextNodeV3 } from "../cards/Card";
import { TextV3 } from "../TypesV3";
import { LinkButton } from "../interactive/LinkButton";


/**
 * 这个页面级组件渲染对应地址 / .
 * 
 * @export
 * @class Home
 * @extends {Component<{}, {}>}
 */
export class Home extends Component {

    public constructor(props: {}) {
        super(props);
        this.state = {};
    }
    
    public render(): JSX.Element {
        return (
            <div>
                <PageFlow height="92vh" showTip={ true } >
                    <WelcomeCard />
                    <Card key="menu" >
                        <header>
                            <TextNodeV3>
                                {
                                    new TextV3(
                                        "探索",
                                        "メニュー",
                                        "EXPLORE"
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
                            <LinkButton key="paper" to="/paper"
                            style={{
                                width: "60%",
                                margin: "1em 0"
                            }} >
                                {
                                    new TextV3(
                                        "论文成果",
                                        "論文発表",
                                        "Papers"
                                    )
                                }
                            </LinkButton>
                            <LinkButton key="project" to="/project"
                            style={{
                                width: "60%",
                                margin: "1em 0"
                            }} >
                                {
                                    new TextV3(
                                        "近期作品",
                                        "プロジェクト",
                                        "Recent Work"
                                    )
                                }
                            </LinkButton>
                            <LinkButton key="article" to="/article"
                            style={{
                                width: "60%",
                                margin: "1em 0"
                            }} >
                                {
                                    new TextV3(
                                        "我的文章",
                                        "文章",
                                        "Articles"
                                    )
                                }
                            </LinkButton>
                            <LinkButton key="idea" to="/idea"
                            style={{
                                width: "60%",
                                margin: "1em 0"
                            }} >
                                {
                                    new TextV3(
                                        "创造",
                                        "アイディア",
                                        "Idea"
                                    )
                                }
                            </LinkButton>
                            <LinkButton key="storage" to="/storage" type="danger"
                            style={{
                                width: "60%",
                                margin: "1em 0"
                            }} >
                                {
                                    new TextV3(
                                        "文件仓库",
                                        "ストレージ",
                                        "Storage"
                                    )
                                }
                            </LinkButton>
                        </div>
                        <p style={{
                            marginTop: "100px"
                        }} >
                            <a href="/v2" style={{
                                color: "rgb(206,186,133)"
                            }} >
                                <TextNodeV3>
                                    {
                                        new TextV3(
                                            "点击此处返回 2.x 版本",
                                            "v2.x へジャンプ",
                                            "Click here to move back to v2.x"
                                        )
                                    }
                                </TextNodeV3>
                            </a>
                        </p>
                    </Card>
                </PageFlow>
            </div>
        );
    }

    public componentDidMount(): void {}

};

