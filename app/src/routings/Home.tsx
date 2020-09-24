/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 21:07:40 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-24 18:16:50
 */

import React from "react";
import { PageBody, PaperInfo, Bookmark } from "../methods/typedict";
import { Shared } from "../methods/globals";
import { Navigator } from "../compo/Navigator";
import { SettingsButton } from "../compo/SettingsButton";
import { InfoView } from "../compo/InfoView";
import { HomeButton } from "../compo/HomeButton";
import { ListView } from "../compo/ListView";
import { displayPaperInfo, displayBookmark } from "../methods/display";
import { InterestView } from "../compo/InterestView";
import { ProductView } from "../compo/ProductView";
import { InfoSet } from "../constant/InfoSet";
import { ScrollTop } from "../compo/ScrollTop";
import { ContactMe } from "../compo/ContactMe";
import { PageFlow } from "../compo/PageFlow";


/**
 * 这个页面级组件渲染对应地址 / .
 * 
 * @export
 * @class Home
 * @extends {PageBody<{}>}
 */
export class Home extends PageBody<{}> {

    public constructor(props: {}) {
        super(props);
        this.state = {};
    }
    
    public render(): JSX.Element {
        return (
            <>
                <Navigator >
                    <HomeButton active={ false } />
                    <ScrollTop />
                    <SettingsButton />
                    <ContactMe />
                </Navigator>
                <InfoView />
                <PageFlow height="calc(90vh - 20px)"
                style={{
                    margin: "calc(10px + 5vh) 0"
                }} >
                    <InterestView />
                    <ProductView title="Products" init={
                        { items: InfoSet.products.map(d => d.id) }
                    } />
                    <ListView<PaperInfo> title="Paper Publications"
                    maxPerPage={ 8 } display={ displayPaperInfo } init={
                        { items: InfoSet.papers }
                    } />
                    <ListView<Bookmark> title="Bookmarks (external links)"
                    maxPerPage={ 8 } display={ displayBookmark } init={
                        { items: InfoSet.bookmarks }
                    } />
                </PageFlow>
            </>
        );
    }

    public componentDidMount(): void {
        Shared.cursorState = "normal";
    }

};
