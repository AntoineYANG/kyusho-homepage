/*
 * @Author: Kanata You 
 * @Date: 2020-12-02 20:44:30 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-10 22:03:49
 */

import React, { Component } from "react";
import { PageFlow } from "../containers/PageFlow";
import { WelcomeCard } from "../cards/WelcomeCard";
import { Card, TextNodeV3 } from "../cards/Card";
import { TextV3 } from "../TypesV3";
import { DisplayCard } from "../cards/DisplayCard";
import { LangOption } from "../interactive/LangOption";
import { TextEntering } from "../compos/TextEntering";


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
                <LangOption />
                <PageFlow height="92vh" showTip={ true } >
                    <WelcomeCard />
                    <DisplayCard key="0"
                    title={
                        new TextV3(
                            "前端·为兴趣的呈现",
                            "気に入るものをサイトに",
                            "PROGRAM TO ENJOY"
                        )
                    } >
                        <div key="left" style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "baseline",
                            flex: 1,
                            padding: "0 10px 10px",
                            overflowX: "hidden",
                            minWidth: "16em",
                            textAlign: "left"
                        }} >
                            {
                                [new TextV3(
                                    "从 HTML+CSS+JavaScript",
                                    "おとといはHTML・CSS・JSを<br /><span style='padding-left: 50%;' >使ったの</span>",
                                    "From HTML+CSS+JavaScript"
                                ), new TextV3(
                                    "到 React 结合 TypeScript",
                                    "昨日は React・TypeScript",
                                    "To React with TypeScript"
                                ), new TextV3(
                                    "热爱前端和开源",
                                    "今日はフロントエンド<br /><span style='text-align: end; padding-left: 10px;' >とオープンソースに夢中で</span>",
                                    "Loving front-end and open-source"
                                ), new TextV3(
                                    "探求编程的优雅",
                                    "プログラミングに優雅を",
                                    "Programming in a elegent way"
                                ), new TextV3(
                                    "用代码传达思想",
                                    "コードで思いを伝う",
                                    "Using code to express"
                                ), new TextV3(
                                    "我，准程序员",
                                    "キーボードを構わている僕",
                                    "Me, associate programmer"
                                )].map((d, i) => (
                                    <TextEntering key={ i } x={ `${ 4 + i * 2 + (i % 2) * 4 }%` }
                                    delay={ 200 + 400 * i } duration={ 600 }
                                    direction={ i % 2 ? "right" : "left" }
                                    style={{
                                        marginTop: "0.4em",
                                        marginBottom: "0.4em"
                                    }} >
                                        { d }
                                    </TextEntering>
                                ))
                            }
                        </div>
                        <div key="right" style={{
                            display: "flex",
                            alignItems: "baseline",
                            flex: 2,
                            minWidth: "200px",
                            opacity: 0.8
                        }} >
                            <img alt="" src="/images/page0.png" width="205px" height="210px"
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%"
                            }} />
                        </div>
                    </DisplayCard>
                    <DisplayCard key="1"
                    title={
                        new TextV3(
                            "音乐·为自我的探寻",
                            "音楽とは人生",
                            "LIVE WITH MUSIC"
                        )
                    }
                    style={{
                        justifyContent: "space-between"
                    }} >
                        <div key="left" style={{
                            display: "flex",
                            alignItems: "baseline",
                            flex: 2,
                            minWidth: "200px",
                            maxWidth: "300px",
                            opacity: 0.8
                        }} >
                            <img alt="" src="/images/page1.png" width="200px" height="267.6px"
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%"
                            }} />
                        </div>
                        <div key="right" style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "baseline",
                            padding: "0 10px 10px",
                            overflowX: "hidden",
                            minWidth: "17.5em",
                            textAlign: "left"
                        }} >
                            {
                                [new TextV3(
                                    "单块排列整齐",
                                    "エフェクターを並べておく",
                                    "Effectors put in order"
                                ), new TextV3(
                                    "过载推到满意",
                                    "オーバードライブをつける",
                                    "Overdrive set suitably"
                                ), new TextV3(
                                    "循着歌词回忆过去",
                                    "歌詞の中に思い出が保存された",
                                    "Look back through lirics"
                                ), new TextV3(
                                    "跟上鼓点计算未来",
                                    "ドラムのリズムに未来が埋まってある",
                                    "Calculate tomorrow by the drumbeats"
                                ), new TextV3(
                                    "用音乐观察自己",
                                    "音楽で自分自身を観察する",
                                    "See myself in the music"
                                ), new TextV3(
                                    "我，前吉他手",
                                    "ステージを辞めた僕",
                                    "Me, once guitarist"
                                )].map((d, i) => (
                                    <TextEntering key={ i } x={ `${ 4 + i * 4 + (i % 2) * 8 }%` }
                                    delay={ 200 + 400 * i } duration={ 600 }
                                    direction={ i % 2 ? "right" : "left" }
                                    style={{
                                        marginTop: "0.4em",
                                        marginBottom: "0.4em"
                                    }} >
                                        { d }
                                    </TextEntering>
                                ))
                            }
                        </div>
                    </DisplayCard>
                    <Card key="building" >
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
            </div>
        );
    }

    public componentDidMount(): void {}

};

