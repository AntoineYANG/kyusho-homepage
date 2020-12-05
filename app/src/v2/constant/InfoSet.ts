/*
 * @Author: Antoine YANG 
 * @Date: 2020-09-05 15:33:17 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-09-06 00:59:09
 */

import { PaperInfo, Bookmark, Product } from "../methods/typedict";


export const InfoSet = {
    /**
     * 论文信息列表.
     * 
     * @type {Array<PaperInfo>}
     */
    papers: [{
        authors: [
            "Zhiguang Zhou", "Xinlong Zhang", "Zhendong Yang", "Yuanyuan Chen",
            "Yuhua Liu", "Jin Wen", "Binjie Chen", "Ying Zhao", "Wei Chen*"
        ],
        title: "Visual Abstraction of Geographical Point Data with Spatial Autocorrelations",
        publishingPlace: "IEEE Conference on Visual Analytics Science and Technology",
        year: 2020
    }] as Array<PaperInfo>,

    /**
     * 外链信息列表.
     * 
     * @type {Array<Bookmark>}
     */
    bookmarks: [{
        type: "tech",
        title: "[翻译] 神经网络的直观解释 - HackCV",
        url: "https://hackcv.com/posts/%E7%BF%BB%E8%AF%91-%E7%A5%9E%E7%BB%8F%E7%BD%"
            + "91%E7%BB%9C%E7%9A%84%E7%9B%B4%E8%A7%82%E8%A7%A3%E9%87%8A/"
    }, {
        type: "tech",
        title: ".md格式的markdown文件常用语法介绍 - 简书",
        url: "https://www.jianshu.com/p/61e02a55f2a6"
    }, {
        type: "design",
        title: "NIPPON COLORS - 日本の伝統色",
        url: "http://nipponcolors.com/"
    }, {
        type: "tech",
        title: "一文看懂25个神经网络模型_网络_不积跬步，无以至千里-CSDN博客",
        url: "https://blog.csdn.net/dujiahei/article/details/80965661"
    }, {
        type: "tech",
        title: "卷积核与特征提取 - 理想几岁 - 博客园",
        url: "https://www.cnblogs.com/zongfa/p/9130167.html"
    }, {
        type: "tech",
        title: "js实现将canvas保存成图片并下载到本地_JavaScript_u012246064的博客-CSDN博客",
        url: "https://blog.csdn.net/u012246064/article/details/78032153/"
    }, {
        type: "tech",
        title: "C++ STL 四种智能指针_C/C++_Dablelv的博客专栏-CSDN博客",
        url: "https://blog.csdn.net/k346k346/article/details/81478223"
    }, {
        type: "tech",
        title: "Nodejs+Express创建HTTPS服务器 - 阳光小白 - 博客园",
        url: "https://www.cnblogs.com/handongyu/p/6260209.html"
    }, {
        type: "tech",
        title: "npm包的发布+ts_pandoraqjk的博客-CSDN博客",
        url: "https://blog.csdn.net/pandoraqjk/article/details/106398758"
    }, {
        type: "other",
        title: "Carbon",
        url: "https://carbon.now.sh/"
    }, {
        type: "design",
        title: "算法可视化",
        url: "https://bindog.github.io/blog/2014/08/09/visualizing-algorithms/"
    }, {
        type: "design",
        title: "CNN Explainer",
        url: "https://poloclub.github.io/cnn-explainer/"
    }, {
        type: "tech",
        title: "正则表达式 - JavaScript | MDN",
        url: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/"
            + "Regular_Expressions"
    }, {
        type: "tech",
        title: "Machine Learning Mastery",
        url: "https://machinelearningmastery.com/"
    }, {
        type: "tech",
        title: "常用激活函数（激励函数）理解与总结_网络_StevenSun的博客空间-CSDN博客",
        url: "https://blog.csdn.net/tyhj_sf/article/details/79932893"
    }, {
        type: "design",
        title: "CSS-sprites，又叫精灵图 - 简书",
        url: "https://www.jianshu.com/p/9b54e9d0e31a"
    }, {
        type: "tech",
        title: "详解react、redux、react-redux之间的关系 - 简书",
        url: "https://www.jianshu.com/p/728a1afce96d"
    }, {
        type: "tech",
        title: "快速搭建你的 github pages 个人博客 —— 基于 Create-React-App 的单页面应用实践 - 简书",
        url: "https://www.jianshu.com/p/4d8011e9c805"
    }, {
        type: "tech",
        title: "Page Visibility API 教程 - 阮一峰的网络日志",
        url: "http://www.ruanyifeng.com/blog/2018/10/page_visibility_api.html"
    }, {
        type: "tech",
        title: "如何部署create-react-app项目到Github pages步骤 - 知乎",
        url: "https://zhuanlan.zhihu.com/p/88481760"
    }] as Array<Bookmark>,

    /**
     * 展示作品列表.
     * 
     * @type {Array<Product>}
     */
    products: [{
        name: "[ChinaVis2019 challenge] ZUFE-yzd-challenge2",
        id: "000000",
        role: "leader",
        languages: [{
            name: "JavaScript",
            rate: 0.583
        }, {
            name: "C++",
            rate: 0.300
        }, {
            name: "HTML",
            rate: 0.104
        }, {
            name: "CSS",
            rate: 0.013
        }],
        techs: ["Express", "JQuery", "Leaflet", "axios"],
        beginTime: ["2019", "05"],
        closeTime: ["2019", "08"],
        githubURL: "https://github.com/zufe-yzd/workspace",
        avatarURL: "https://avatars2.githubusercontent.com/u/50646985?s=60&v=4",
        description: (
            "This product is made by team ZUFE-yzd, submitted to <i>ChinaVis2019</i> and "
            + "ended up earning the team an Award of Excellence. "
        )
    }, {
        name: "Unused Product 2019.9",
        id: "000001",
        role: "engineer",
        languages: [{
            name: "TypeScript",
            rate: 0.884
        }, {
            name: "CSS",
            rate: 0.072
        }, {
            name: "Python",
            rate: 0.037
        }, {
            name: "Other",
            rate: 0.007
        }],
        techs: ["React", "MapBox", "JQuery", "axios"],
        beginTime: ["2019", "09"],
        closeTime: ["2019", "12"],
        githubURL: "",
        avatarURL: "https://avatars1.githubusercontent.com/u/55677972?s=60&v=4",
        description: (
            "<b>[NOT OPEN SOURCE]</b><br/>"
            + "This product is made by Professor Zhou's research group <i>Studio119</i>. "
        )
    }, {
        name: "BiliVis",
        id: "000002",
        role: "individual",
        languages: [{
            name: "TypeScript",
            rate: 0.912
        }, {
            name: "Python",
            rate: 0.052
        }, {
            name: "HTML",
            rate: 0.014
        }, {
            name: "JavaScript",
            rate: 0.011
        }, {
            name: "CSS",
            rate: 0.011
        }],
        techs: ["React", "JQuery", "axios"],
        beginTime: ["2019", "12"],
        closeTime: ["2020", "01"],
        githubURL: "https://github.com/AntoineYANG/BiliVis",
        avatarURL: "https://avatars3.githubusercontent.com/u/48707735?"
            + "s=88&u=6a81260924552d398cbbd4d919caf5a4bb6a7416&v=4",
        description: (
            "Uses web crawler (programmed by python3, depending on beautifulsoup) "
            + "to get Danmaku of a video on <b>Bilibili</b>. <br />"
            + "This system allow you to search for any videos by the <b>av-</b> id "
            + "<i>(Unfortunately, <b>Bilibili</b> started to use <b>bv-</b> code "
            + "instead from March 23, 2020, which did cause some inconvenience)</i>. "
            + "An SVG animation is set to give a 1-min quick play of all the Danmaku. "
            + "Moreover, each piece of Danmaku are counted, showing which part of the "
            + "video got the most amount of Danmaku, and the number of Danmaku counted "
            + "by date, to show how the popularity of the video was changing during the time. "
        )
    }, {
        name: "[IEEE_VIS_VAST] zhou2020(vast)",
        id: "000003",
        role: "engineer",
        languages: [{
            name: "TypeScript",
            rate: 0.665
        }, {
            name: "Python",
            rate: 0.162
        }, {
            name: "C++",
            rate: 0.058
        }, {
            name: "CSS",
            rate: 0.056
        }, {
            name: "JavaScript",
            rate: 0.032
        }, {
            name: "HTML",
            rate: 0.027
        }],
        techs: ["React", "MapBox", "JQuery", "axios"],
        beginTime: ["2020", "02"],
        closeTime: ["2020", "08"],
        githubURL: "https://github.com/Studio119/zhou2020-vast-",
        videoURL: "./videos/product_000003.mp4",
        avatarURL: "https://avatars1.githubusercontent.com/u/55677972?s=60&v=4",
        description: (
            "This product is made by Professor Zhou's research group <i>Studio119</i>. <br/>"
            + "The related paper <b>[Visual Abstraction of Geographical Point Data "
            + "with Spatial Autocorrelations]</b> was accepted by <i>IEEE Conference on "
            + "Visual Analytics Science and Technology (<b>VAST</b>)<i>, 2020. "
        )
    }, {
        name: "Anonymous project forked from ***",
        id: "000004",
        role: "contributor",
        languages: [{
            name: "TypeScript",
            rate: 0.640
        }, {
            name: "Python",
            rate: 0.161
        }, {
            name: "JavaScript",
            rate: 0.117
        }, {
            name: "HTML",
            rate: 0.044
        }, {
            name: "CSS",
            rate: 0.038
        }],
        techs: ["React", "JQuery"],
        beginTime: ["2019", "09"],
        closeTime: ["2019", "09"],
        githubURL: "",
        avatarURL: "./images/product_000004.png",
        description: (
            "<b>[NOT OPEN SOURCE]</b><br/>"
            + "This product is made by Professor Zhou's research group <i>Studio119</i>. <br/>"
            + "No more public description is available. "
        )
    }, {
        name: "Unused Product 2020.5",
        id: "000005",
        role: "leader",
        languages: [{
            name: "TypeScript",
            rate: 0.919
        }, {
            name: "Python",
            rate: 0.056
        }, {
            name: "JavaScript",
            rate: 0.015
        }, {
            name: "Other",
            rate: 0.010
        }],
        techs: ["React", "JQuery"],
        beginTime: ["2020", "05"],
        closeTime: ["2020", "06"],
        githubURL: "",
        avatarURL: "https://avatars1.githubusercontent.com/u/55677972?s=60&v=4",
        description: (
            "This product is made by Professor Zhou's research group <i>Studio119</i>. <br/>"
            + "No more public description is available. "
        )
    }] as Array<Product>,
};
