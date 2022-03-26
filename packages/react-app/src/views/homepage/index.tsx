/*
 * @Author: Kanata You 
 * @Date: 2022-03-22 14:57:54 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-27 00:36:37
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

import { Main, Page } from '@views';
import ParticleLayer from '@components/particle-layer';
import PageHeader from '@components/page-header';
import {
  Article,
  ArticleHeader,
  Anchor,
  List,
  ListItem,
  HR
} from '@components/common';
import PaperInfo from '@components/paper-info';
import ProjectInfo from '@components/project-info';

import getAllPapers from '@data/get-all-papers';
import getAllProjects from '@data/get-all-projects';


const Homepage: React.FC = () => {
  const papers = getAllPapers();
  const projects = getAllProjects();

  const { t } = useTranslation();

  return (
    <Page>
      <ParticleLayer />
      <PageHeader />
      <Main>
        <Article>
          {t('intro.github.prefix')}
          <Anchor href="https://github.com/AntoineYANG">
            GitHub
          </Anchor>
          {t('intro.github.suffix')}
          <Anchor
            href={
              'mailto:antoineyang99@gmail.com'
              + '?subject=connect_from_kyusho_homepage'
              + '&body=Connect from Kyusho homepage.'
            }
          >
            {t('intro.mail')}
          </Anchor>
          {t('intro.suffix')}
        </Article>
        <HR />
        <Article>
          <ArticleHeader>
            {t('header.papers')}
          </ArticleHeader>
          <List>
            {
              papers.map((info, i) => (
                <ListItem key={i} mode="ref">
                  <PaperInfo {...info} />
                </ListItem>
              ))
            }
          </List>
        </Article>
        <HR />
        <Article>
          <ArticleHeader>
            {t('header.articles')}
          </ArticleHeader>
          <List>
            <ListItem>
              <Anchor internal href="/article/1">
                espoir: 用 monorepo 讲一个前端的故事
              </Anchor>
            </ListItem>
          </List>
        </Article>
        <HR />
        <Article>
          <ArticleHeader>
            {t('header.projects')}
          </ArticleHeader>
          <List>
            {
              projects.map((info, i) => (
                <ListItem key={i}>
                  <ProjectInfo {...info} />
                </ListItem>
              ))
            }
          </List>
        </Article>
      </Main>
    </Page>
  );
};


export default Homepage;
