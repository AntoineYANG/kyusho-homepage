/*
 * @Author: Kanata You 
 * @Date: 2022-03-22 14:57:54 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-25 02:26:52
 */

import React from 'react';

import { Main, Page } from '@views';
import ParticleLayer from '@components/particle-layer';
import PageHeader from '@components/page-header';
import { Article, ArticleHeader, Anchor, Strong, List, ListItem, HR } from '@components/common';


const Homepage: React.FC = () => {
  return (
    <Page>
      <ParticleLayer />
      <PageHeader />
      <Main>
        <Article>
          {`你可以在 `}
          <Anchor href="https://github.com/AntoineYANG">
            GitHub
          </Anchor>
          {` 找到我的开源作品，
或者联系我的`}
          <Anchor
            href={
              'mailto:antoineyang99@gmail.com'
              + '?subject=connect_from_kyusho_homepage'
              + '&body=Connect from Kyusho homepage.'
            }
          >
            邮箱
          </Anchor>
          {`。

下滑以查看我的论文发表、技术文章、项目介绍等更多内容。`}
        </Article>
        <HR />
        <Article>
          <ArticleHeader>
            论文发表
          </ArticleHeader>
          Zhiguang Zhou, Xinlong Zhang, <Strong>Zhendong Yang</Strong>, Et al. Visual Abstraction of Geographical Point Data
with Spatial Autocorrelations. IEEE Conference on Visual Analytics Science and Technology, 2020.
          <Anchor
            href="https://www.researchgate.net/publication/348226923_Visual_Abstraction_of_Geographical_Point_Data_with_Spatial_Autocorrelations"
          >
            [ResearchGate]
          </Anchor>
        </Article>
        <HR />
        <Article>
          <ArticleHeader>
            技术文章
          </ArticleHeader>
          <Anchor href="https://juejin.cn/post/7058248877593329695">
            espoir: 用 monorepo 讲一个前端的故事
          </Anchor>
        </Article>
        <HR />
        <Article>
          <ArticleHeader>
            近期项目
          </ArticleHeader>
          <List>
            <ListItem>
              <header style={{ display: 'flex', flexDirection: 'column' }}>
                <span>
                  <Strong>Espoir CLI</Strong>
                  <small
                    style={{
                      marginLeft: '1rem'
                    }}
                  >
                    [<Anchor href="https://github.com/AntoineYANG/espoir">GitHub</Anchor>]
                    [<Anchor href="https://www.npmjs.com/package/espoir-cli">npm</Anchor>]
                  </small>
                </span>
                <small style={{ alignSelf: 'flex-end' }}>（设计开发，2021/11 -   ）</small>
              </header>
              <span><b>项目描述</b>：个人开源项目：提出了一套工具，完全基于 JS（Node 运行时）实现了 monorepo workspace 的创建、npm 模块的安装、简单 Git 操作封装、创建改动日志等实用功能.</span>
              <span><b>主要技术</b>：Node.JS, monorepo.</span>
            </ListItem>

            <ListItem>
              <header style={{ display: 'flex', flexDirection: 'column' }}>
                <span>
                  <Strong>XXXX微前端重构升级技术需求</Strong>
                </span>
                <small style={{ alignSelf: 'flex-end' }}>（技术方案设计、前端开发，2021/8 -  2021/9）</small>
              </header>
              <span><b>项目描述</b>：为了统一在不同页面中存在差异的XXXX组件，使以后的维护同步，同时兼顾未来全链路技术升级改造的趋势，配合客户端高版本起新增的技术能力（由所在团队和架构团队共同讨论设计后，架构团队实现上线），将小组业务中最常见的XXXX组件提升为独立生态（微前端思想），随着各页面的升级完成代码层面和产品、用户视角的统一，消除由于历史包袱留下的功能差异，加强团队未来对该生态的维护能力.</span>
              <span><b>主要技术</b>：React.</span>
            </ListItem>

            <ListItem>
              <header style={{ display: 'flex', flexDirection: 'column' }}>
                <span>
                  <Strong>全链路支持XXX需求</Strong>
                </span>
                <small style={{ alignSelf: 'flex-end' }}>（前端开发，2021/7 -  2021/7）</small>
                <span><b>项目描述</b>：设计在全链路多个页面新增一套功能，另含一个新页面.</span>
                <span><b>主要技术</b>：React.</span>
              </header>
            </ListItem>

            <ListItem>
              <header style={{ display: 'flex', flexDirection: 'column' }}>
                <span>
                  <Strong>抖音商城主页XXX需求</Strong>
                </span>
                <small style={{ alignSelf: 'flex-end' }}>（前端开发，2021/5 -  2021/5）</small>
              </header>
              <span><b>项目描述</b>{
                `：以业务链主页为主要场景增加一套 UI & 交互逻辑.`
              }</span>
              <span><b>主要技术</b>：React.</span>
            </ListItem>

            <ListItem>
              <header style={{ display: 'flex', flexDirection: 'column' }}>
                <span>
                  <Strong>XXXX无障碍改造（第一期）</Strong>
                </span>
                <small style={{ alignSelf: 'flex-end' }}>（前端开发，2021/4 -  2021/6）</small>
              </header>
              <span><b>项目描述</b>：响应政策要求和现代前端的开发准则，对团队维护的多个页面进行支持无障碍的升级改造，因工作量大、测试回归内容多，期间同步追赶了多个新增的需求的无障碍改造；需求最终上线后，对本期改造进行了总结，为团队贡献了开发经验，并和团队 leader 讨论了未来开发中的协助方案，就本期技术上未能覆盖的案例与客户端团队交流了后续版本中必需的技术支持.</span>
              <span><b>主要技术</b>：无障碍（a11y=accessibility）.</span>
            </ListItem>
          </List>
        </Article>
      </Main>
    </Page>
  );
};


export default Homepage;
