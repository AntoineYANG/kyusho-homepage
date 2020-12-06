/*
 * @Author: Kanata You 
 * @Date: 2020-12-02 20:47:07 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-06 17:43:16
 */

import React from "react";
import { Card, TextNodeV3, HTMLNodeV3 } from "../cards/Card";
import { TextV3 } from "../TypesV3";
import { LinkButton } from "../interactive/LinkButton";
import { ButtonGroup } from "../interactive/ButtonGroup";


/**
 * 这个页面级组件在无法访问对应网址时渲染.
 */
export const BadUrl: React.FC = _props => (
    <div style={{
        height: "88vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }} >
        <Card>
            <header>
                <TextNodeV3>
                    {
                        new TextV3(
                            "404 - 找不到页面",
                            undefined,
                            "404 - Bad GateWay"
                        )
                    }
                </TextNodeV3>
            </header>
            <p>
                <HTMLNodeV3>
                    {
                        new TextV3(
                            `<u>${ window.location.href }</u> 指向了一个不存在的资源。`,
                            undefined,
                            `Could not get <u>${ window.location.href }</u>. `
                        )
                    }
                </HTMLNodeV3>
            </p>
            <ButtonGroup style={{
                padding: "20px"
            }} >
                <LinkButton to="/" >
                    {
                        new TextV3(
                            `主页`,
                            undefined,
                            `Home`
                        )
                    }
                </LinkButton>
            </ButtonGroup>
        </Card>
    </div>
);
