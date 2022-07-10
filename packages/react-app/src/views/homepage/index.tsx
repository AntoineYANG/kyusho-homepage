/*
 * @Author: Kanata You 
 * @Date: 2022-03-22 14:57:54 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 00:55:46
 */

import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import ParticleLayer from '@components/particle-layer';
import PageHeader from '@components/page-header';
import {
  // Article,
  // ArticleHeader,
  Anchor,
  // List,
  // ListItem,
  HR
} from '@components/common';
import PaperInfo from '@components/paper-info';
import ProjectInfo from '@components/project-info';

import getAllPapers from '@api/get-all-papers';
import getAllProjects from '@api/get-all-projects';
import useTitle from '@hooks/use-title';
import Card from '@components/hibou/card';
import colors from '@components/hibou/colors';


const Homepage: React.FC = () => {
  const papers = getAllPapers();
  const projects = getAllProjects();

  const { t } = useTranslation();

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTitle('Homepage - kyusho');
  }, []);

  return (
    <>
      {/* 引言 */}

      <Card>
        {t('homepage.intro')}
      </Card>

      {/* 工作经历 */}

      <Section>
        <SectionTitle>
          {t('experience')}
        </SectionTitle>
        <List>
          <ListItem>
            <RangeBox>
              <span>04/2021</span>
              <span>-</span>
              <span>09/2021</span>
            </RangeBox>
            <ItemContent>
              <ItemHeader>
                {t('exp.0.name')}
                <ItemHeaderSuffix>
                  {t('exp.0.com')}
                </ItemHeaderSuffix>
              </ItemHeader>
              <ItemDesc>
                {t('shanghai,china')}
              </ItemDesc>
              <ItemBlock>
								<header>Key Qualifications &amp; Responsibilities</header>
								<ul>
                  {
                    t('exp.0.kqr').split('\n').map((d, i) => (
                      <li key={i}>
                        {d}
                      </li>
                    ))
                  }
								</ul>
							</ItemBlock>
							<ItemBlock>
								<header>Key Achievements</header>
								<ul>
                  {
                    t('exp.0.ka').split('\n').map((d, i) => (
                      <li key={i}>
                        {d}
                      </li>
                    ))
                  }
								</ul>
							</ItemBlock>
            </ItemContent>
          </ListItem>
        </List>
      </Section>

      {/* 学习经历 */}

      <Section>
        <SectionTitle>
          {t('education')}
        </SectionTitle>
        <List>
          <ListItem>
            <RangeBox>
              <span>09/2018</span>
              <span>-</span>
              <span>06/2022</span>
            </RangeBox>
            <ItemContent>
              <ItemHeader>
                {t('edu.0.name')}
                <ItemHeaderSuffix>
                  {t('edu.0.com')}
                </ItemHeaderSuffix>
              </ItemHeader>
              <ItemBlock>
								<header>Key Actions</header>
								<ul>
                  {
                    t('edu.0.ka').split('\n').map((d, i) => (
                      <li key={i}>
                        {d}
                      </li>
                    ))
                  }
								</ul>
							</ItemBlock>
            </ItemContent>
          </ListItem>
        </List>
        <Article>
          <ArticleHeader>
            {t('publication')}
          </ArticleHeader>
          <ArticleContent>
            <p>
              Z. Zhou (supervisor), X. Zhang, <strong>Z. Yang</strong>, Et al.
              <i>Visual Abstraction of Geographical Point Data with Spatial Autocorrelations</i>.
              IEEE Conference on Visual Analytics Science and Technology, 2020.
              <br />
              <span>
                DOI:&nbsp;
                <a href="https://www.researchgate.net/publication/348226923_Visual_Abstraction_of_Geographical_Point_Data_with_Spatial_Autocorrelations" target="_blank" rel="noreferrer">
                  10.1109/VAST50239.2020.00011
                </a>
              </span>
            </p>
          </ArticleContent>
        </Article>
      </Section>
      {/* <ParticleLayer /> */}
      {/* <Article>
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
      </Article> */}
      {/* <HR />
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
      </Article> */}
      {/* <HR />
      <Article>
        <ArticleHeader>
          {t('header.articles')}
        </ArticleHeader>
        <List>
          <ListItem>
            <p style={{ margin: 0 }}>
              <Anchor internal href="/article/1000">
                espoir: 用 monorepo 讲一个前端的故事
              </Anchor>
            </p>
          </ListItem>
          <ListItem>
            <p style={{ margin: 0 }}>
              <Anchor internal href="/article/1001">
                Electron 应用实践报告
              </Anchor>
            </p>
          </ListItem>
        </List>
      </Article> */}
      {/* <HR />
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
      </Article> */}
    </>
  );
};

const Section = styled.section({
  marginBlockStart: '1.6rem',
  marginBlockEnd: '0.6rem',
  marginInline: 0,
  display: 'flex',
  flexDirection: 'column',
});

const SectionTitle = styled.h2({
  fontSize: '1.2rem',
  lineHeight: '1.6em',
  fontWeight: 600,
  marginBlockEnd: '0.4em',
  borderStyle: 'solid',
  borderWidth: 0,
  borderBlockWidth: '1.5px',
  color: colors.primary,
});

const List = styled.ol({
  listStyleType: 'none',
  marginBlockStart: '0.4em',
  marginBlockEnd: '0.4em',
  paddingInlineStart: 0,
});

const ListItem = styled.li({
  marginBlockStart: '0.6em',
  marginBlockEnd: '0.6em',
  paddingInlineStart: '0.4em',
  letterSpacing: '0.03em',
  display: 'flex',
  alignItems: 'baseline',
});

const Article = styled.article({

});

const ArticleHeader = styled.header({
  marginBlockStart: 0,
  marginBlockEnd: '0.3em',
  fontSize: '1.1rem',
  fontWeight: 550,
  lineHeight: '1.6em',
  color: `${colors.primary}`,
});

const ArticleContent = styled.div({
  display: 'flex',
  lineHeight: '1.5em',
  counterReset: 'papers',
  opacity: 0.8,

  '::before': {
    counterIncrement: 'papers',
    content: '"[" counter(papers) "]"',
    display: 'block',
    flexGrow: 0,
    flexShrink: 0,
    width: '1.6em',
    textAlign: 'end',
    padding: '0 0.8em',
  },

  '> p': {
    margin: 0,
  },

  '& a': {
    outline: 'none',
    position: 'relative',
    zIndex: 0,
    textDecoration: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
    letterSpacing: '0.03em',

    '::before': {
      content: '""',
      position: 'absolute',
      zIndex: -1,
      top: '78%',
      left: '-0.1em',
      right: '-0.2em',
      bottom: '0.08em',
      backgroundColor: `${colors.primary}`,
      borderRadius: '0.5em 100% 130% 0.5em',
    },
  },
});

const RangeBox = styled.div({
  flexGrow: 0,
  flexShrink: 0,
  width: '58px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '0.95rem',
  color: '#444',
  lineHeight: '1.25em',
  paddingInlineStart: 0,
  paddingInlineEnd: '0.7em',
});

const ItemContent = styled.div({
  flexGrow: 1,
  flexShrink: 1,

  '> *': {
    paddingInlineStart: 'calc(0.4em + 3px)',
  },
});

const ItemHeader = styled.header({
  marginBlockStart: '0.1em',
  marginBlockEnd: '0.1em',
  paddingInlineStart: '0.4em',
  paddingBlockStart: '0.2em',
  paddingBlockEnd: '0.2em',
  borderInlineStart: `3px solid ${colors.primary}88`,
  fontSize: '1.05rem',
  fontWeight: 600,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: `${colors.primary}`,
});

const ItemHeaderSuffix = styled.span({
  flexGrow: 1,
  color: colors.primary,
  textAlign: 'end',

  '::before': {
    content: '" at "',
    marginInlineStart: '1em',
    marginInlineEnd: '1em',
    color: '#888d',
    fontWeight: 400,
  },
});

const ItemDesc = styled.p({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontSize: '0.95rem',
  lineHeight: '1.6em',
  margin: 0,
  opacity: 0.8,
});

const ItemBlock = styled.div({
  marginBlockStart: '0.7em',
  marginBlockEnd: '0.25em',

  '> header': {
    marginBlock: '0.4em',
    fontSize: '1.02rem',
    lineHeight: '1.6em',
    fontWeight: 550,
    opacity: 0.85,
  },

  '> ul': {
    listStyleType: 'none',
    marginBlockStart: '0.5em',
    marginBlockEnd: '0.8em',
    paddingInlineStart: 0,

    '> li': {
      marginBlock: '0.32em',
      paddingInlineStart: 0,
      letterSpacing: '0.03em',
      lineHeight: '1.5em',
      display: 'flex',
      alignItems: 'baseline',
      opacity: 0.7,

      '::before': {
        flexGrow: 0,
        flexShrink: 0,
        content: '"o"',
        display: 'block',
        textAlign: 'center',
        width: '1.82em',
      },
    }
  },
});


export default Homepage;
