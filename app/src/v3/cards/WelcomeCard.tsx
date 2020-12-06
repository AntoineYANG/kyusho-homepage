/*
 * @Author: Kanata You 
 * @Date: 2020-12-06 15:10:22 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-12-06 18:29:15
 */

import React from "react";
import { Card, HTMLNodeV3 } from "./Card";
import { TextV3 } from "../TypesV3";


export const WelcomeCard: React.FC<{}> = _props => {
    return (
        <Card style={{
            background: 'rgba(0,0,0,0) url("/images/photowall.jpg") no-repeat scroll 22% 0% / cover'
        }} >
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
        </Card>
    );
};
