/*
 * @Author: Antoine YANG 
 * @Date: 2020-08-28 21:07:40 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-01 23:28:28
 */

import React from "react";
import { PageBody, PaperInfo, Bookmark } from "../methods/typedict";
import { Shared } from "../methods/globals";
import { SettingsButton } from "../compo/SettingsButton";
import { InfoView } from "../compo/InfoView";
import { HomeButton } from "../compo/HomeButton";
import { ListView } from "../compo/ListView";
import { displayPaperInfo, displayBookmark } from "../methods/display";


/**
 * 这个页面级组件渲染对应地址 / .
 * 
 * @export
 * @class Home
 * @extends {PageBody<{}>}
 */
export class Home extends PageBody<{}> {

    protected paperList: React.RefObject<ListView<PaperInfo>>;
    protected bookmarkList: React.RefObject<ListView<Bookmark>>;

    public constructor(props: {}) {
        super(props);
        this.state = {};

        this.paperList = React.createRef<ListView<PaperInfo>>();
        this.bookmarkList = React.createRef<ListView<Bookmark>>();
    }
    
    public render(): JSX.Element {
        return (
            <>
                <InfoView />
                {/* <div style={{
                    color: Shared.theme.colortab.color,
                    margin: "calc(10px + 6vh) calc(20px + 8vw) calc(10px + 3vh)",
                    padding: "calc(12px + 5vh)",
                    border: `1px solid ${ Shared.theme.colortab.border }`,
                    boxShadow: `6px 5px 0 1px ${
                        Shared.theme.colortab.border.replace(
                            "(", "a("
                        ).replace(
                            ")", ",0.1)"
                        )
                    }`
                }} >
                    网站升级中...
                    <br />
                    <br />
                    <span style={{ color: Shared.theme.colortab.frontground }} >
                        Sorry,&nbsp;
                    </span>
                    <span style={{ color: Shared.theme.colortab.frontground2 }} >
                        this website&nbsp;
                    </span>
                    <span style={{ color: Shared.theme.colortab.frontground3 }} >
                        is under&nbsp;
                    </span>
                    <span style={{ color: "rgb(63,119,134)" }} >rebuilding...</span>
                </div> */}
                <ListView<PaperInfo> ref={ this.paperList }
                title="Paper Publications" maxPerPage={ 8 }
                display={ displayPaperInfo } />
                <ListView<Bookmark> ref={ this.bookmarkList }
                title="Bookmarks" maxPerPage={ 8 }
                display={ displayBookmark } />
                <HomeButton active={ false } />
                <SettingsButton />
            </>
        );
    }

    public componentDidMount(): void {
        Shared.cursorState = "normal";

        const papers: Array<PaperInfo> = [{
            authors: [
                "Zhiguang Zhou", "Xinlong Zhang", "Zhendong Yang", "Yuanyuan Chen",
                "Yuhua Liu", "Jin Wen", "Binjie Chen", "Ying Zhao", "Wei Chen*"
            ],
            title: "Visual Abstraction of Geographical Point Data with Spatial Autocorrelations",
            publishingPlace: "IEEE Conference on Visual Analytics Science and Technology",
            year: 2020
        }];

        this.paperList.current?.setState({
            items: papers
        });

        const bookmarks: Array<Bookmark> = [{
            "type": "tech",
            "title": "[翻译] 神经网络的直观解释 - HackCV",
            "url": "https://hackcv.com/2016/10/%E7%BF%BB%E8%AF%91-%E7%A5%9E%E7%BB%8F"
                + "%E7%BD%91%E7%BB%9C%E7%9A%84%E7%9B%B4%E8%A7%82%E8%A7%A3%E9%87%8A/"
        }, {
            "type": "tech",
            "title": ".md格式的markdown文件常用语法介绍 - 简书",
            "url": "https://www.jianshu.com/p/61e02a55f2a6"
        }, {
            "type": "design",
            "title": "NIPPON COLORS - 日本の伝統色",
            "url": "http://nipponcolors.com/"
        }, {
            "type": "tech",
            "title": "一文看懂25个神经网络模型_网络_不积跬步，无以至千里-CSDN博客",
            "url": "https://blog.csdn.net/dujiahei/article/details/80965661"
        }, {
            "type": "tech",
            "title": "卷积核与特征提取 - 理想几岁 - 博客园",
            "url": "https://www.cnblogs.com/zongfa/p/9130167.html"
        }, {
            "type": "tech",
            "title": "js实现将canvas保存成图片并下载到本地_JavaScript_u012246064的博客-CSDN博客",
            "url": "https://blog.csdn.net/u012246064/article/details/78032153/"
        }, {
            "type": "tech",
            "title": "C++ STL 四种智能指针_C/C++_Dablelv的博客专栏-CSDN博客",
            "url": "https://blog.csdn.net/k346k346/article/details/81478223"
        }, {
            "type": "tech",
            "title": "Nodejs+Express创建HTTPS服务器 - 阳光小白 - 博客园",
            "url": "https://www.cnblogs.com/handongyu/p/6260209.html"
        }, {
            "type": "other",
            "title": "Carbon",
            "url": "https://carbon.now.sh/"
        }, {
            "type": "design",
            "title": "算法可视化",
            "url": "https://bindog.github.io/blog/2014/08/09/visualizing-algorithms/"
        }, {
            "type": "design",
            "title": "CNN Explainer",
            "url": "https://poloclub.github.io/cnn-explainer/"
        }, {
            "type": "tech",
            "title": "正则表达式 - JavaScript | MDN",
            "url": "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/"
                + "Regular_Expressions"
        }, {
            "type": "tech",
            "title": "Machine Learning Mastery",
            "url": "https://machinelearningmastery.com/"
        }, {
            "type": "tech",
            "title": "常用激活函数（激励函数）理解与总结_网络_StevenSun的博客空间-CSDN博客",
            "url": "https://blog.csdn.net/tyhj_sf/article/details/79932893"
        }, {
            "type": "design",
            "title": "CSS-sprites，又叫精灵图 - 简书",
            "url": "https://www.jianshu.com/p/9b54e9d0e31a"
        }, {
            "type": "tech",
            "title": "详解react、redux、react-redux之间的关系 - 简书",
            "url": "https://www.jianshu.com/p/728a1afce96d"
        }, {
            "type": "tech",
            "title": "快速搭建你的 github pages 个人博客 —— 基于 Create-React-App 的单页面应用实践 - 简书",
            "url": "https://www.jianshu.com/p/4d8011e9c805"
        }, {
            "type": "tech",
            "title": "Page Visibility API 教程 - 阮一峰的网络日志",
            "url": "http://www.ruanyifeng.com/blog/2018/10/page_visibility_api.html"
        }, {
            "type": "tech",
            "title": "如何部署create-react-app项目到Github pages步骤 - 知乎",
            "url": "https://zhuanlan.zhihu.com/p/88481760"
        }];

        this.bookmarkList.current?.setState({
            items: bookmarks
        });
    }

};
