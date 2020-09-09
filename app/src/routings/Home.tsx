/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 21:07:40 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2020-09-09 22:20:28
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


/**
 * 这个页面级组件渲染对应地址 / .
 * 
 * @export
 * @class Home
 * @extends {PageBody<{}>}
 */
export class Home extends PageBody<{}> {

    protected productList: React.RefObject<ProductView>;
    protected paperList: React.RefObject<ListView<PaperInfo>>;
    protected bookmarkList: React.RefObject<ListView<Bookmark>>;

    public constructor(props: {}) {
        super(props);
        this.state = {};

        this.productList = React.createRef<ProductView>();
        this.paperList = React.createRef<ListView<PaperInfo>>();
        this.bookmarkList = React.createRef<ListView<Bookmark>>();
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
                <InterestView />
                <ProductView ref={ this.productList }
                title="Products" />
                <ListView<PaperInfo> ref={ this.paperList }
                title="Paper Publications" maxPerPage={ 8 }
                display={ displayPaperInfo } />
                <ListView<Bookmark> ref={ this.bookmarkList }
                title="Bookmarks (external links)" maxPerPage={ 8 }
                display={ displayBookmark } />
            </>
        );
    }

    public componentDidMount(): void {
        Shared.cursorState = "normal";

        this.paperList.current?.setState({
            items: InfoSet.papers
        });

        this.bookmarkList.current?.setState({
            items: InfoSet.bookmarks
        });

        this.productList.current?.setState({
            items: InfoSet.products.map(d => d.id)
        });
    }

};
