/*
 * @Author: Kanata You 
 * @Date: 2020-12-02 20:44:30 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-08 00:11:10
 */

import React, { Component } from "react";
import { PageFlow } from "../containers/PageFlow";
import { WelcomeCard } from "../cards/WelcomeCard";
import { Card, TextNodeV3 } from "../cards/Card";
import { TextV3 } from "../TypesV3";
import { InterestCard } from "../cards/InterestCard";
import { TechCard } from "../cards/TechCard";


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
            <>
                <PageFlow height="92vh" >
                    <WelcomeCard />
                    <TechCard />
                    <InterestCard />
                    <Card>
                        <p>
                            <label>
                                <TextNodeV3>
                                    {
                                        new TextV3(
                                            "网站的建设工作还在进行中，",
                                            "申し訳ありませんが、このヴァージョンはまだ完成されません。",
                                            "This page is not released yet, "
                                        )
                                    }
                                </TextNodeV3>
                            </label>
                        </p>
                        <p>
                            <a href="/v2" style={{
                                color: "rgb(206,186,133)"
                            }} >
                                <TextNodeV3>
                                    {
                                        new TextV3(
                                            "点击此处返回 2.x 版本",
                                            "v2.x へ",
                                            "click here to move back to v2.x"
                                        )
                                    }
                                </TextNodeV3>
                            </a>
                        </p>
                    </Card>
                </PageFlow>
            </>
        );
    }

    public componentDidMount(): void {}

};

