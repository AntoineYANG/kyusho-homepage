/*
 * @Author: Kanata You 
 * @Date: 2022-03-25 17:02:49 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-25 21:51:20
 */

import { ProjectInfoProps } from '@components/project-info';


const getAllProjects = (): ProjectInfoProps[] => [{
  title: 'Espoir CLI',
  links: [{
    href: 'https://github.com/AntoineYANG/espoir',
    text: 'GitHub'
  }, {
    href: 'https://www.npmjs.com/package/espoir-cli',
    text: 'npm'
  }],
  info: '（设计开发，2021/11 -   ）',
  desc: '个人开源项目。提出了一套工具，完全基于 JS（Node 运行时）实现了 monorepo workspace 的创建、npm 模块的安装、简单 Git 操作封装、创建改动日志等实用功能.',
  keywords: ['Node.JS', 'monorepo']
}, {
  title: 'XXXX微前端重构升级技术需求',
  info: '（技术方案设计、前端开发，2021/8 -  2021/9）',
  desc: '为了统一在不同页面中存在差异的XXXX组件，使将来的维护同步，同时兼顾未来全链路技术栈升级改造的趋势，配合客户端高版本起新增的技术能力（由所在团队和架构团队共同讨论设计后，架构团队实现上线），将小组业务中最常见的XXXX组件提升为独立生态（微前端思想），随着各页面的升级完成代码层面和产品、用户视角的统一，消除由于历史包袱留下的功能差异，加强团队未来对该生态的维护能力.',
  keywords: ['React']
}, {
  title: '全链路支持XXX需求',
  info: '（前端开发，2021/7 -  2021/7）',
  desc: '设计在全链路多个页面新增一套功能，另含一个新页面.',
  keywords: ['React']
}, {
  title: 'XXXX主页XXX需求',
  info: '（前端开发，2021/5 -  2021/5）',
  desc: '以业务链主页为主要场景增加一套 UI & 交互逻辑.',
  keywords: ['React']
}, {
  title: 'XXXX无障碍改造（第一期）',
  info: '（前端开发，2021/4 -  2021/6）',
  desc: '响应政策要求和现代前端的开发准则，对团队维护的多个页面进行支持无障碍的升级改造；需求最终上线后，对本期改造进行了总结，为团队贡献了开发经验，并和团队 leader 讨论了未来开发中的协助方案，就本期技术上未能覆盖的案例与客户端团队交流了后续版本中必需的技术支持.',
  keywords: ['A11y']
}];


export default getAllProjects;
